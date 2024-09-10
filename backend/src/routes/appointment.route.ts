import { FastifyInstance } from "fastify";
import appointmentController from "../controllers/appointment.controller";

async function appointmentRoutes(fastify: FastifyInstance) {
    // Cria um agendamento
    fastify.post('/:procedureID', appointmentController.createAppointment);
    // Entra na fila de um agendamento
    fastify.post('/fila', appointmentController.enterQueue); 
    // Lista todos os agendamentos
    fastify.get('/', appointmentController.listAllAppointments);
    // Busca um agendamento pelo ID
    fastify.get('/buscar/:id', appointmentController.findById);
    // Lista os agendamentos de um cliente
    fastify.get('/cliente/:customerPhone', appointmentController.listCustomerAppointments);
    // Lista os horários disponíveis de agendamento para um determinado procedimento
    fastify.get('/:procedureID', appointmentController.listAvailableSchedules);
    // Confirma um agendamento
    fastify.patch('/confirmar/:id', appointmentController.confirmAppointment); 
    // Cancelamento do agendamento por parte do Admin
    fastify.patch('/cancelar/:id', appointmentController.adminCancelAppointment); 
    // Finalização de um agendamento por parte do Admin
    fastify.patch('/finalizar/:id', appointmentController.finishingAppointment); 
    // Cancelamento de um agendamento por parte do Cliente
    fastify.delete('/:id', appointmentController.deleteAppointment);
}

export default appointmentRoutes;