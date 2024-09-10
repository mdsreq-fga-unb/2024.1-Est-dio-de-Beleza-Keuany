import appointmentService from "../services/appointment.service";
import procedureService from "../services/procedure.service";
import { Appointment, Queue, URLParams } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";
import { 
    formatDateTime, 
    isValidDateTimeFormat, 
    isValidPhoneNumber, 
    convertObjDate, 
    intStatusToString, 
    hasSufficientSlots,
    convertToSQLDate
} from "../utils/utils";

const createAppointment = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const procedureID = Number(req.params.procedureID);

        if (isNaN(procedureID))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });

        const procedure = await procedureService.findByIdService(procedureID);

        if (!procedure)
            return res.code(400).send({ message: 'Procedimento não encontrado!' });

        const slotSpace = Math.ceil(procedure.duration / 60);

        const { schedule, customerName, customerPhone } = req.body as Partial<Appointment & Queue>;

        if (!schedule)
            return res.code(400).send({ message: 'Insira uma data de agendamento' });

        if (!isValidDateTimeFormat(schedule))
            return res.code(400).send({ message: 'Insira uma data de agendamento no formato (DD/MM/YYYY hh:mm)' });

        const date = schedule.slice(0, 10);
        const time = schedule.slice(11, 16);

        const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        const [day, month, year] = date.split('/');
        const dateObj = new Date(Number(year), Number(month)-1, Number(day));
        const dayOfWeek = weekday[dateObj.getDay()];

        const availableTimes = await appointmentService.listAvailableSchedulesService(procedureID, date, dayOfWeek);

        if (!hasSufficientSlots(availableTimes, time, slotSpace))
            return res.code(400).send({
                 message: `O procedimento escolhido dura ${slotSpace} horas, porém não há horários subsequentes disponíveis para realizar tal procedimento. Tente outro horário!`
            });
        
        // Logica para definir o status do agendamento
        // Caso o usuário marque um horário após a verificação
        // De confirmação daquele dia já tenha se iniciado
        // O status do atendimento já e cadastrado como confirmado
        let status: number;
        const formattedDate = convertToSQLDate(date);
        const now = new Date();
        const currentDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

        const previousDate = new Date(`${formattedDate}T00:00:00`);
        previousDate.setDate(previousDate.getDate() - 1);
        previousDate.setHours(8, 0, 0, 0);

        const isPastConfirmationVerification = currentDate >= previousDate;

        status = isPastConfirmationVerification ? 1 : 0;
        
        let appointmentBody: Appointment = {
            schedule: formatDateTime(schedule),
            idProcedure: procedureID,
            status,
        }

        if (!customerName)
            return res.code(400).send({ message: 'Insira o nome do cliente' });

        if (!customerPhone)
            return res.code(400).send({ message: 'Insira o telefone do cliente' });

        if (!isValidPhoneNumber(customerPhone) || customerPhone[2] !== '9')
            return res.code(400).send({ message: 'Insira um número válido (XX9XXXXXX)' });

        let queueBody: Partial<Queue> = {
            customerName,
            customerPhone,
            position: 1,
        }

        const appointment = await appointmentService.createAppointmentAndQueueService(appointmentBody, queueBody);

        res.code(201).send({
            appointment: {
                id: appointment,
                appointmentBody,
                queueBody,
            },
            message: 'Agendamento cadastrado com sucesso!'
        });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const enterQueue = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const body = req.body as Partial<Queue>;
        const { customerName, customerPhone, idAppointment } = body;

        if (!idAppointment)
            return res.code(400).send({ message: 'Informe o atendimento no qual deseja entrar na fila' });

        if (!customerName)
            return res.code(400).send({ message: 'Insira o nome do cliente' });

        if (!customerPhone)
            return res.code(400).send({ message: 'Insira o telefone do cliente' });

        if (!isValidPhoneNumber(customerPhone) && customerPhone[2] !== '9')
            return res.code(400).send({ message: 'Insira um número válido (XX9XXXXXX)' });

        const success = await appointmentService.enterQueueService(body);

        if (success == 0)
            return res.code(400).send({ message: 'A fila já está cheia (3 pessoas)' });
        else if (success == 2)
            return res.code(400).send({ message: 'Ocorreu um erro!' });

        res.code(201).send({ message: 'Cadastro na fila realizado com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const listCustomerAppointments = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { customerPhone } = req.query as Partial<Queue>;
        
        if (!customerPhone)
            return res.code(400).send({ message: 'Insira um número de telefone!' });

        const appointments = await appointmentService.listCustomerAppointmentsService(customerPhone);

        if (appointments.length === 0)
            return res.code(404).send({ message: 'Não há agendamentos marcados' });

        const formattedAppointments = appointments.map(appointment => {
            return {
                ...appointment,
                appointmentStatus: intStatusToString(appointment.appointmentStatus, appointment.queuePosition),
                appointmentSchedule: convertObjDate(appointment.appointmentSchedule)
            }
        });

        res.code(200).send(formattedAppointments);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const findById = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const id = Number((req.params as URLParams).id);

        if (isNaN(id))
            return res.code(400).send({ message: 'ID do agendamento não fornecido ou inválido!' });

        const appointment = await appointmentService.findByIdService(id);

        if (!appointment) 
            return res.code(404).send({ message: 'Agendamento não encontrado' });

        res.code(200).send(appointment);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const listAllAppointments = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const appointments = await appointmentService.listAllAppointmentsService();

        if (appointments.length > 0) {
            const formattedAppointments = appointments.map(appointment => {
                return {
                    ...appointment,
                    procedureDuration: Math.ceil(appointment.procedureDuration / 60) * 60
                }
            });

            return res.code(200).send(formattedAppointments);
        }

        res.code(200).send(appointments);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const deleteAppointment = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const id = Number(req.params.id);
        const { customerPhone } = req.query as Partial<Queue>;

        if (isNaN(id))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });

        if (!customerPhone)
            return res.code(400).send({ message: 'Insira um número de telefone!' });

        await appointmentService.deleteAppointmentService(id, customerPhone);

        res.code(200).send({ message: 'Atendimento cancelado com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const adminCancelAppointment = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const idAppointment = Number(req.params.id);

        if (isNaN(idAppointment))
            return res.code(400).send({ message: 'ID do agendamento não fornecido ou inválido!' });

        const result = await appointmentService.adminCancelAppointmentService(idAppointment);

        if (!result)
            return res.code(400).send({ message: 'Agendamento não encontrado!' });

        res.code(200).send({ message: 'Atendimento cancelado com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const finishingAppointment = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const idAppointment = Number(req.params.id);

        if (isNaN(idAppointment))
            return res.code(400).send({ message: 'ID do agendamento não fornecido ou inválido!' });

        const result = await appointmentService.finishingAppointmentService(idAppointment);

        if (!result)
            return res.code(400).send({ message: 'Agendamento não encontrado!' });

        res.code(200).send({ message: 'Atendimento finalizado com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const listAvailableSchedules = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const idProcedure = Number(req.params.procedureID);
        
        const { schedule } = req.query as Partial<Appointment>;

        const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        if (isNaN(idProcedure))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });

        if (!schedule)
            return res.code(400).send({ message: 'Insira uma data para listar os horários' });

        const [day, month, year] = schedule.split('/');
        const date = new Date(Number(year), Number(month)-1, Number(day));
        const dayOfWeek = weekday[date.getDay()];

        const availableTimes = await appointmentService.listAvailableSchedulesService(idProcedure, schedule, dayOfWeek);

        res.code(200).send(availableTimes);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

const confirmAppointment = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const idAppointment = Number(req.params.id);

        if (isNaN(idAppointment))
            return res.code(400).send({ message: 'ID do agendamento não fornecido ou inválido!' });

        await appointmentService.confirmAppointmentService(idAppointment);

        res.code(200).send({ message: 'Atendimento confirmado com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ appointmentController: err.message });    
        else
            res.code(500).send({ appointmentController: 'Erro desconhecido!' });
    }
}

export default {
    createAppointment,
    enterQueue,
    listCustomerAppointments,
    findById,
    listAllAppointments,
    deleteAppointment,
    adminCancelAppointment,
    finishingAppointment,
    listAvailableSchedules,
    confirmAppointment,
}