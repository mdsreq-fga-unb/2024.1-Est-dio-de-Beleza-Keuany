import { FastifyInstance } from "fastify";
import appointmentController from "../controllers/appointment.controller";

async function appointmentRoutes(fastify: FastifyInstance) {
    fastify.post('/:procedureID', appointmentController.createAppointment);
    fastify.post('/fila', appointmentController.enterQueue);
    fastify.get('/', appointmentController.listAllAppointments);
    fastify.get('/cliente/:customerPhone', appointmentController.listCustomerAppointments);
    fastify.get('/:procedureID', appointmentController.listAvailableSchedules);
    fastify.patch('/confirmar/:id', appointmentController.confirmAppointment);
    fastify.patch('/cancelar/:id', appointmentController.adminCancelAppointment);
    fastify.patch('/finalizar/:id', appointmentController.finishingAppointment);
    fastify.delete('/:id', appointmentController.deleteAppointment);
}

export default appointmentRoutes;