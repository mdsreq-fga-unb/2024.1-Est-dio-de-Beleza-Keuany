import cron from 'node-cron';
import dbPool from './database/connection';
import { sendMessage } from '../bot-wp/sendMessage';
import { Queue } from './types/types';
import { formatPhoneNumber } from './utils/utils';
import appointmentService from './services/appointment.service';

async function getAppointmentsForNextDay() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDate = tomorrow.toISOString().split('T')[0] + ' 00:00:00';
    const endDate = tomorrow.toISOString().split('T')[0] + ' 23:59:59';

    const [appointments]: [any[], any] = await dbPool.query(
        "SELECT idAppointment FROM APPOINTMENT WHERE schedule BETWEEN ? AND ?",
        [startDate, endDate]
    );

    return appointments;
}

async function processAppointmentQueue(idAppointment: number) {
    console.log(`Iniciando o processo de verificação de confirmação para o agendamento ${idAppointment}.`);

    const [queue] = await dbPool.query(
        "SELECT customerPhone FROM `QUEUE` WHERE idAppointment = ? AND position = 1",
        [idAppointment]
    ) as any[];

    if (queue.length > 0) {
        const customerPhone = queue[0].customerPhone;
        const formattedCustomerPhone = formatPhoneNumber(customerPhone);
        await sendMessage(formattedCustomerPhone, 'Você possui um agendamento marcado para amanhã. Por favor, confirme em até 4 horas.');
        
        // Em 4 horas verificar se o cliente confirmou o atendimento
        setTimeout(async () => {
            const [appointmentStatus] = await dbPool.query(
                "SELECT status FROM APPOINTMENT WHERE idAppointment = ?",
                [idAppointment]
            ) as any[];

            if (appointmentStatus.length > 0 && appointmentStatus[0].status !== 1) {
                console.log("Atendimento não foi confirmado, cancelando cliente atual.");
                await appointmentService.deleteAppointmentService(idAppointment, customerPhone);
                await sendMessage(formattedCustomerPhone, '4 horas se passaram e seu atendimento não foi confirmado, portanto será cancelado.');

                const [nextInQueue] = await dbPool.query(
                    "SELECT COUNT(*) AS queueCount FROM `QUEUE` WHERE idAppointment = ?",
                    [idAppointment]
                ) as any[];

                if (nextInQueue[0].queueCount > 0) {
                    // Refazer o processo com o próximo da fila
                    console.log("Iniciando verificação com o próximo da fila.");
                    await processAppointmentQueue(idAppointment);
                } else {
                    console.log("Não há mais clientes na fila, agendamento foi cancelado.");
                }
            } else if (appointmentStatus.length > 0 && appointmentStatus[0].status === 1) {
                console.log("Atendimento foi confirmado!");
            }
        }, 4 * 60 * 60 * 1000); // 4 horas em milissegundos
    }
    console.log(`Verificação para agendamento ${idAppointment} encerrada.`);
}

export function startCronJobs() {
    cron.schedule('0 8 * * *', async () => {
        const currentDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        console.log(`CronJob iniciado às: ${currentDate}`);

        const appointments = await getAppointmentsForNextDay();

        // Mapeia e executa todas as funções em paralelo
        const appointmentsPromises = appointments.map(appointment => 
            processAppointmentQueue(appointment.idAppointment)
        );

        // Aguarda todas as promises serem resolvidas
        await Promise.all(appointmentsPromises);
    }, {
        timezone: "America/Sao_Paulo" // Fuso UTC-3
    });
}