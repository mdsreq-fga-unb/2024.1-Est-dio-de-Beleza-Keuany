import { FastifyInstance } from "fastify";
import workScheduleController from "../controllers/workSchedule.controller";

async function workScheduleRoutes(fastify: FastifyInstance) {
    fastify.post('/', workScheduleController.createWorkSchedule);
    fastify.get('/', workScheduleController.findAllWorkSchedule);
    fastify.get('/indisponiveis', workScheduleController.findUnavailableDays);
    fastify.patch('/:id', workScheduleController.updateWorkSchedule);
    fastify.delete('/:id', workScheduleController.deleteWorkSchedule);
}

export default workScheduleRoutes;