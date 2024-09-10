import exceptScheduleService from "../services/exceptSchedule.service";
import { ExceptionSchedule, URLParams } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";
import { convertToSQLDate, isFutureDate, isValidDate } from "../utils/utils";

const createExceptionSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const body = req.body as ExceptionSchedule;

        let { exceptionDate, startTime, endTime, isAvailable } = body;

        if (!exceptionDate || !startTime || !endTime || !isAvailable)
            return res.code(400).send({ message: 'Preencha todos os campos necessários' });

        if (startTime >= endTime)
            return res.code(400).send({ message: 'A data de início não pode ser igual ou superior a de fim' });

        if (!isValidDate(exceptionDate))
            return res.code(400).send({ message: 'Insira uma data válida no formato (DD/MM/YYYY)' });

        if (!isFutureDate(exceptionDate))
            return res.code(400).send({ message: 'A data não pode ser anterior à atual' });

        body.exceptionDate = convertToSQLDate(exceptionDate);

        const exceptionSchedule = await exceptScheduleService.createService(body);

        if (!exceptionSchedule)
            return res.code(400).send({ message: 'Erro no cadastro da exceção!' });

        res.code(201).send({
            workSchedule: {
                id: exceptionSchedule,
                exceptionDate,
                startTime,
                endTime,
                isAvailable,
            },
            message: 'Dia Exceção cadastrado com sucesso!'
        });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

const findAllExceptionSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const exceptionSchedules = await exceptScheduleService.findAllService();

        res.code(200).send(exceptionSchedules);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

const findByDateExceptionSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        let { exceptionDate } = req.query as Partial<ExceptionSchedule>;

        if (!exceptionDate)
            return res.code(400).send({ message: 'Informe uma data!' });

        exceptionDate = convertToSQLDate(exceptionDate);

        const exceptionSchedule = await exceptScheduleService.findOneByDateService(exceptionDate);

        if (!exceptionSchedule)
            return res.code(404).send({ message: 'Data não encontrada!' });

        res.code(200).send(exceptionSchedule);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

const findUnavailableDays = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { month, year } = req.query as { month: string, year: string };

        if (!month)
            return res.code(400).send({ message: 'Informe um mês' });

        if (!year)
            return res.code(400).send({ message: 'Informe um ano' });

        const unavailableDays = await exceptScheduleService.findUnavailableDaysService(month, year);

        res.code(200).send(unavailableDays);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

const updateExceptionSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const id = Number((req.params as URLParams).id);
        const body = req.body as Partial<ExceptionSchedule>;

        if (isNaN(id))
            return res.code(400).send({ message: 'ID da exceção não fornecido ou inválido!' });

        let { exceptionDate, startTime, endTime, isAvailable } = body;

        if (!exceptionDate && !startTime && !endTime && !isAvailable)
            return res.code(400).send({ message: 'Preencha pelo menos um campo para atualização!' });

        if (startTime && endTime) {
            if (startTime >= endTime)
                return res.code(400).send({ message: 'A data de início não pode ser igual ou superior a de fim' });
        }
        
        if (exceptionDate) {
            if (!isValidDate(exceptionDate))
                return res.code(400).send({ message: 'Insira uma data válida no formato (DD/MM/YYYY)' });
    
            if (!isFutureDate(exceptionDate))
                return res.code(400).send({ message: 'A data não pode ser anterior à atual' });

            body.exceptionDate = convertToSQLDate(exceptionDate);
        }

        const success = await exceptScheduleService.updateService(id, body);

        if (!success)
            return res.code(404).send({ message: 'Exceção não encontrada' });

        res.code(200).send({ message: 'Exceção atualizada com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

const deleteExceptionSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const id = Number((req.params as URLParams).id);

        if (isNaN(id))
            return res.code(400).send({ message: 'ID da exceção não fornecido ou inválido!' });
        
        const success = await exceptScheduleService.deleteService(id);

        if (!success)
            return res.code(404).send({ message: 'Exceção não encontrada' });

        res.code(200).send({ message: 'Exceção removida com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

export default {
    createExceptionSchedule,
    findAllExceptionSchedule,
    findByDateExceptionSchedule,
    findUnavailableDays,
    updateExceptionSchedule,
    deleteExceptionSchedule
}