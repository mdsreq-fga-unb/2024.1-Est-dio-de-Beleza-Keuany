import workScheduleService from "../services/workSchedule.service";
import { WorkSchedule, URLParams } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";

const createWorkSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const body = req.body as WorkSchedule;

        const { dayOfWeek, startTime, endTime, activeDay } = body;

        if (!dayOfWeek || !startTime || !endTime || !activeDay)
            return res.code(400).send({ message: 'Preencha todos os campos necessários' });

        const workSchedule = await workScheduleService.createService(body);

        if (!workSchedule)
            return res.code(400).send({ message: 'Erro no cadastro da grade horária!' });

        res.code(201).send({
            workSchedule: {
                id: workSchedule,
                dayOfWeek,
                startTime,
                endTime,
                activeDay,
            },
            message: 'Grade horária cadastrada com sucesso!'
        });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ workScheduleController: err.message });    
        else
            res.code(500).send({ workScheduleController: 'Erro desconhecido!' });
    }
}

const findAllWorkSchedule = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const workSchedules = await workScheduleService.findAllService();

        if (workSchedules.length === 0)
            return res.code(404).send({ message: 'Não há grades cadastradas!' });

        res.code(200).send(workSchedules);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ workScheduleController: err.message });    
        else
            res.code(500).send({ workScheduleController: 'Erro desconhecido!' });
    }
}

const findUnavailableDays = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const unavailableDays = await workScheduleService.findUnavailableDaysService();

        const days = unavailableDays.map(row => row.dayOfWeek);

        res.code(200).send({ unavailableDays: days });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ exceptScheduleController: err.message });    
        else
            res.code(500).send({ exceptScheduleController: 'Erro desconhecido!' });
    }
}

const updateWorkSchedule = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const id = Number(req.params.id);
        const body = req.body as Partial<WorkSchedule>;

        if (isNaN(id))
            return res.code(400).send({ message: 'ID da grade não fornecido ou inválido!' });

        const { dayOfWeek, startTime, endTime, activeDay } = body;

        if (!dayOfWeek && !startTime && !endTime && !activeDay)
            return res.code(400).send({ message: 'Preencha pelo menos um campo para atualização!' });

        const success = await workScheduleService.updateService(id, body);

        if (!success)
            return res.code(404).send({ message: 'Grade não encontrada' });

        res.code(200).send({ message: 'Grade atualizada com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ workScheduleController: err.message });    
        else
            res.code(500).send({ workScheduleController: 'Erro desconhecido!' });
    }
}

const deleteWorkSchedule = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id))
            return res.code(400).send({ message: 'ID da grade não fornecido ou inválido!' });
        
        const success = await workScheduleService.deleteService(id);

        if (!success)
            return res.code(404).send({ message: 'Grade não encontrada' });

        res.code(200).send({ message: 'Grade removida com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ workScheduleController: err.message });    
        else
            res.code(500).send({ workScheduleController: 'Erro desconhecido!' });
    }
}

export default {
    createWorkSchedule,
    findAllWorkSchedule,
    findUnavailableDays,
    updateWorkSchedule,
    deleteWorkSchedule
}