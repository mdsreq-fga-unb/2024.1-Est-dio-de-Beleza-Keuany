import appointmentService from "../services/appointment.service";
import { Appointment, Queue, URLParams } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";
import { formatDateTime, isValidDateTimeFormat, isValidPhoneNumber } from "../utils/utils";

const createAppointment = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const procedureID = Number(req.params.procedureID);

        if (isNaN(procedureID))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });

        const { schedule, customerName, customerPhone } = req.body as Partial<Appointment & Queue>;

        if (!schedule)
            return res.code(400).send({ message: 'Insira uma data de agendamento' });

        if (!isValidDateTimeFormat(schedule))
            return res.code(400).send({ message: 'Insira uma data de agendamento no formato (DD/MM/YYYY hh:mm)' });

        let appointmentBody: Appointment = {
            schedule: formatDateTime(schedule),
            idProcedure: procedureID,
            status: 0,
        }

        if (!customerName)
            return res.code(400).send({ message: 'Insira o nome do cliente' });

        if (!customerPhone)
            return res.code(400).send({ message: 'Insira o telefone do cliente' });

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

        if (!isValidPhoneNumber(customerPhone))
            return res.code(400).send({ message: 'Insira um número válido (DDD + 9 dígitos)' });

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

export default {
    createAppointment,
    enterQueue,
}