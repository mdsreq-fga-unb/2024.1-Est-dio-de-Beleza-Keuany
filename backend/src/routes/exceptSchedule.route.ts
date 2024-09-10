import { FastifyInstance } from "fastify";
import exceptScheduleController from "../controllers/exceptSchedule.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

async function exceptScheduleRoutes(fastify: FastifyInstance) {
    // Cadastra um dia exceção
    fastify.post('/', { preHandler: [authMiddleware] }, exceptScheduleController.createExceptionSchedule);
    // Lista todos os dias exceção
    fastify.get('/', exceptScheduleController.findAllExceptionSchedule);
    // Busca um dia exceção pela data
    fastify.get('/busca', exceptScheduleController.findByDateExceptionSchedule);
    // Lista todos os dias exceção dado um mês e ano
    fastify.get('/dias', exceptScheduleController.findUnavailableDays);
    // Atualiza um dia exceção
    fastify.patch('/:id', { preHandler: [authMiddleware] }, exceptScheduleController.updateExceptionSchedule);
    // Exclui um dia exceção
    fastify.delete('/:id', { preHandler: [authMiddleware] }, exceptScheduleController.deleteExceptionSchedule);
}

export default exceptScheduleRoutes;