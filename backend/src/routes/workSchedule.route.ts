import { FastifyInstance } from "fastify";
import workScheduleController from "../controllers/workSchedule.controller";

async function workScheduleRoutes(fastify: FastifyInstance) {
    // Cadastra uma grade horária diária
    fastify.post('/', workScheduleController.createWorkSchedule);
    // Lista todas as grades da semana
    fastify.get('/', workScheduleController.findAllWorkSchedule);
    // Lista os dias da semana que o salão não abre
    fastify.get('/indisponiveis', workScheduleController.findUnavailableDays);
    // Atualiza uma grade horária diária
    fastify.patch('/:id', workScheduleController.updateWorkSchedule);
    // Exclui uma grade horária diária
    fastify.delete('/:id', workScheduleController.deleteWorkSchedule);
}

export default workScheduleRoutes;