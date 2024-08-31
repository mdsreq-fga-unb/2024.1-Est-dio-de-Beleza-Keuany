import { FastifyInstance } from "fastify";
import exceptScheduleController from "../controllers/exceptSchedule.controller";

async function exceptScheduleRoutes(fastify: FastifyInstance) {
    fastify.post('/', exceptScheduleController.createExceptionSchedule);
    fastify.get('/', exceptScheduleController.findAllExceptionSchedule);
    fastify.get('/busca', exceptScheduleController.findByDateExceptionSchedule);
    fastify.get('/dias', exceptScheduleController.findUnavailableDays);
    fastify.patch('/:id', exceptScheduleController.updateExceptionSchedule);
    fastify.delete('/:id', exceptScheduleController.deleteExceptionSchedule);
}

export default exceptScheduleRoutes;