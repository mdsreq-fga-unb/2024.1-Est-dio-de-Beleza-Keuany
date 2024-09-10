import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { Appointment, Queue, CustomerAppointment, AppointmentWithQueue, TimeSlot } from "../types/types";
import { convertToSQLDate, formatPhoneNumber } from "../utils/utils";
import { sendMessage } from "../../bot-wp/sendMessage";

const createAppointmentAndQueueService = async (appointmentBody: Appointment, queueBody: Partial<Queue>): Promise<number | undefined> => {
    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        const [appointmentResult] = await connection.query("INSERT INTO APPOINTMENT SET ?", [appointmentBody]);
        const appointmentId = (appointmentResult as mysql.OkPacketParams).insertId;

        queueBody.idAppointment = appointmentId;

        await connection.query("INSERT INTO `QUEUE` SET ?", [queueBody]);

        await connection.commit();

        return appointmentId;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

const enterQueueService = async (body: Partial<Queue>): Promise<number> => {
    try {
        const [oldPos] = await dbPool.query("SELECT COUNT(idAppointment) FROM `QUEUE` WHERE idAppointment = ?", [body.idAppointment]);

        const count = (oldPos as any)[0]['COUNT(idAppointment)'];

        body.position = count + 1;

        if ((count + 1) >= 4) return 0;

        const [result] = await dbPool.query("INSERT INTO `QUEUE` SET ?", [body]);

        const okPacket = result as mysql.OkPacketParams;

        return okPacket.affectedRows && okPacket.affectedRows > 0 ? 1 : 2;
    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
            throw new Error('Este número já foi cadastrado neste atendimento!');
        }

        throw err;
    }
}

const listCustomerAppointmentsService = async (customerPhone: string) => {
    const [result] = await dbPool.query("SELECT P.name AS procedureName, P.duration AS procedureDuration, P.price AS procedurePrice, A.idAppointment AS appointmentId, A.status AS appointmentStatus, A.schedule AS appointmentSchedule, Q.position AS queuePosition FROM `QUEUE` Q JOIN APPOINTMENT A ON Q.idAppointment = A.idAppointment JOIN `PROCEDURE` P ON A.idProcedure = P.idProcedure WHERE Q.customerPhone = ? ORDER BY A.schedule DESC;", [customerPhone]);

    return result as CustomerAppointment[];
}

const findByIdService = async (id: number) => {
    const query = `
        SELECT *
            FROM APPOINTMENT A
                JOIN \`QUEUE\` Q ON A.idAppointment = Q.idAppointment
                JOIN \`PROCEDURE\` P ON A.idProcedure = P.idProcedure
            WHERE A.idAppointment = ? AND Q.position = 1
    `;

    const [result] = await dbPool.query(query, [id]);

    const rows = result as Appointment[];

    if (rows.length > 0)
        return rows[0];

    return null;
}

const listAllAppointmentsService = async (): Promise<AppointmentWithQueue[]> => {
    const allAppointmentsQuery = `SELECT P.name AS procedureName, P.duration AS procedureDuration,
                                         P.price AS procedurePrice, A.idAppointment, 
                                         A.status AS appointmentStatus,
                                         A.schedule AS appointmentSchedule 
                                    FROM APPOINTMENT A 
                                        JOIN \`PROCEDURE\` P ON A.idProcedure = P.idProcedure 
                                    ORDER BY DATE(A.schedule) DESC, TIME(A.schedule) ASC`;

    const [appointments] = await dbPool.query(allAppointmentsQuery);

    const appointmentList = appointments as AppointmentWithQueue[];

    const queueQuery = `SELECT * FROM \`QUEUE\` WHERE idAppointment = ? ORDER BY position`;

    for (const appointment of appointmentList) {
        const [queue] = await dbPool.query(queueQuery, [appointment.idAppointment]);

        appointment.queue = queue as Queue[];
    }

    return appointmentList;
}

const deleteAppointmentService = async (id: number, customerPhone: string): Promise<boolean> => {
    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        const [queueCountResult] = await connection.query(
            "SELECT COUNT(*) AS queueCount FROM `QUEUE` WHERE idAppointment = ?",
            [id]
        );
        const queueCount = (queueCountResult as any)[0].queueCount;
        
        if (queueCount === 0)
            throw new Error("Agendamento não encontrado!");

        const [personPositionResult] = await connection.query(
            "SELECT position FROM `QUEUE` WHERE customerPhone = ? AND idAppointment = ?",
            [customerPhone, id]
        );
        const personPosition = (personPositionResult as any)[0]?.position;

        if (personPosition === undefined)
            throw new Error("Pessoa não encontrada na fila para este agendamento");

        if (queueCount === 1) { // Apenas uma pessoa na fila (exclusão do AGENDAMENTO)
            await connection.query(
                "DELETE FROM APPOINTMENT WHERE idAppointment = ?",
                [id]
            );
        } else if (personPosition === queueCount) {
            // A pessoa é a última da fila (apenas exclui seu registro em FILA)
            await connection.query(
                "DELETE FROM `QUEUE` WHERE customerPhone = ? AND idAppointment = ?",
                [customerPhone, id]
            );
        } else {
            // Caso a pessoa não seja a última (exclui seu registro em FILA e atualiza a posição dos outros)
            await connection.query(
                "DELETE FROM `QUEUE` WHERE customerPhone = ? AND idAppointment = ?",
                [customerPhone, id]
            );

            await connection.query(
                "UPDATE `QUEUE` SET position = position - 1 WHERE idAppointment = ? AND position > ?",
                [id, personPosition]
            );
        }

        await connection.commit();
        return true;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

const adminCancelAppointmentService = async (id: number): Promise<boolean> => {
    const [result] = await dbPool.query("UPDATE APPOINTMENT SET status = 3 WHERE idAppointment = ?", [id]);

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

const finishingAppointmentService = async (id: number): Promise<number> => {
    try {
        const [appointment] = await dbPool.query("SELECT status FROM APPOINTMENT WHERE idAppointment = ?", [id]);

        const rows = appointment as Partial<Appointment[]>;
        const appointmentStatus = rows[0]?.status;
    
        if (appointmentStatus === undefined)
            throw new Error("Agendamento não encontrado!");
        else if (appointmentStatus != 1)
            throw new Error("Para um agendamento ser finalizado ele deve ter sido confirmado!");

        const [result] = await dbPool.query("UPDATE APPOINTMENT SET status = 2 WHERE idAppointment = ?", [id]);

        const okPacket = result as mysql.OkPacketParams;

        return okPacket.affectedRows && okPacket.affectedRows > 0 ? 1 : 0; // true or false
    } catch (err) {
        throw err;
    }
}

const listAvailableSchedulesService = async (
    idProcedure: number,
    date: string,
    dayOfWeek: string
): Promise<TimeSlot[]> => {
    const connection = await dbPool.getConnection();
    try {
        const formattedDate = convertToSQLDate(date);

        const now = new Date();
        const currentDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

        const previousDate = new Date(`${formattedDate}T00:00:00`);
        previousDate.setDate(previousDate.getDate() - 1);
        previousDate.setHours(8, 0, 0, 0);

        const isPastConfirmationVerification = currentDate >= previousDate;

        const [workSchedule] = await connection.query(
            `SELECT startTime, endTime, activeDay FROM WORK_SCHEDULE WHERE dayOfWeek = ?`,
            [dayOfWeek]
        ) as any[];
        const [exceptionSchedule] = await connection.query(
            `SELECT startTime, endTime, isAvailable FROM EXCEPTION_SCHEDULE WHERE exceptionDate = ?`,
            [formattedDate]
        ) as any[];
        
        const availableTimes: TimeSlot[] = [];
        let startTime: any;
        let endTime: any;

        if (exceptionSchedule.length > 0) {
            // Lógica para horários em exceções
            if (!exceptionSchedule[0].isAvailable)
                return [];
            else {
                startTime = exceptionSchedule[0]?.startTime;
                endTime = exceptionSchedule[0]?.endTime.slice(0, 5);
            }
        } else {
            // Lógica para um dia normal
            if (!workSchedule[0].activeDay)
                return [];
            else {
                startTime = workSchedule[0]?.startTime;
                endTime = workSchedule[0]?.endTime.slice(0, 5);
            }
        }
        let currentTime = startTime.slice(0, 5);
        while (currentTime < endTime) {
            const endOfSlot = new Date(`${formattedDate}T${currentTime}`);
            endOfSlot.setMinutes(endOfSlot.getMinutes() + 60);

            const [appointment] = await connection.query(
                `SELECT COUNT(Q.customerPhone) AS queueCount,
                    A.idProcedure,
                    A.schedule,
                    A.status,
                    A.idAppointment
                FROM APPOINTMENT A 
                LEFT JOIN \`QUEUE\` Q ON A.idAppointment = Q.idAppointment 
                WHERE A.schedule >= ? AND A.schedule < ?
                GROUP BY A.schedule, A.idProcedure, A.status`,
                [`${formattedDate} ${currentTime}`, endOfSlot.toISOString().slice(0, 19).replace('T', ' ')]
            );

            const appointmentRow = (appointment as any)[0];
            const appointmentStatus = appointmentRow?.status;
            const queueCount = appointmentRow?.queueCount || 0;
            const idAppointment = appointmentRow?.idAppointment || 0;
            const appointmentProcedureId = appointmentRow?.idProcedure;

            let slotSpace = 1;

            if (appointmentProcedureId) {
                const [procedure] = await connection.query(
                    "SELECT duration FROM `PROCEDURE` WHERE idProcedure = ?",
                    [appointmentProcedureId]
                );

                const duration = (procedure as any)[0]?.duration || 0;
                const numberOfSlots = Math.ceil(duration / 60);
                slotSpace = numberOfSlots;
            }
            
            // Verificar se o horário possui agendamentos para outros procedimentos
            const [otherAppointments] = await connection.query(
                `SELECT COUNT(*) AS otherAppointmentsCount 
                FROM APPOINTMENT 
                WHERE schedule >= ? AND schedule < ? AND idProcedure != ?`,
                [`${formattedDate} ${currentTime}`, endOfSlot.toISOString().slice(0, 19).replace('T', ' '), idProcedure]
            );
            
            const hasAppointmentsWithOtherProcedures = (otherAppointments as any)[0].otherAppointmentsCount > 0;

            if (!hasAppointmentsWithOtherProcedures && appointmentStatus != 1) {
                if (!(isPastConfirmationVerification && queueCount > 0)) {
                    availableTimes.push({
                        time: currentTime,
                        queueCount: queueCount,
                        idAppointment,
                    });
                }
            }

            const dateObj = new Date(`1970-01-01T${currentTime}`);
            dateObj.setHours(dateObj.getHours() + slotSpace);
            currentTime = dateObj.toTimeString().slice(0, 5);
        }
        
        return availableTimes;
    } finally {
        connection.release();
    }
};

const confirmAppointmentService = async (id: number): Promise<boolean> => {
    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        const [appointment] = await connection.query("SELECT status, schedule FROM APPOINTMENT WHERE idAppointment = ?", [id]);

        const rows = appointment as Partial<Appointment[]>;
        const appointmentStatus = rows[0]?.status;
        const appointmentSchedule = rows[0]?.schedule;
        
        if (appointmentStatus === undefined)
            throw new Error("Agendamento não encontrado!");

        if (appointmentStatus === 1)
            throw new Error("Esse agendamento já foi confirmado!");

        const customerQuery = `
            SELECT customerPhone
                FROM APPOINTMENT A
                    JOIN \`QUEUE\` Q ON A.idAppointment = Q.idAppointment
                WHERE A.idAppointment = ? AND Q.position = 1
        `;

        const [customer] = await connection.query(customerQuery, [id]);
        const customerRows = customer as Partial<Queue[]>;
        const customerPhone = customerRows[0]?.customerPhone;
        let formattedPhone = null;

        await connection.query(
            "UPDATE APPOINTMENT SET status = 1 WHERE idAppointment = ?",
            [id]
        );

        await connection.query(
            "DELETE FROM `QUEUE` WHERE idAppointment = ? AND position > 1",
            [id]
        );

        if (customerPhone) {
            let dateObj: any;
            if (appointmentSchedule) dateObj = new Date(appointmentSchedule);
            const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${
                (dateObj.getMonth() + 1).toString().padStart(2, '0')
              }/${dateObj.getFullYear()} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

            formattedPhone = formatPhoneNumber(customerPhone);
            const message = `Seu agendamento, marcado para as ${formattedDate}, foi confirmado com sucesso!`;
            
            await sendMessage(formattedPhone, message);
        } else {
            throw new Error("Erro no envio de mensagem ao WhatsApp");
        }

        await connection.commit();
        return true;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

export default {
    createAppointmentAndQueueService,
    enterQueueService,
    listCustomerAppointmentsService,
    findByIdService,
    listAllAppointmentsService,
    deleteAppointmentService,
    adminCancelAppointmentService,
    finishingAppointmentService,
    listAvailableSchedulesService,
    confirmAppointmentService,
}