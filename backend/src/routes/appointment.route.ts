import { FastifyInstance } from "fastify";
import appointmentController from "../controllers/appointment.controller";

async function appointmentRoutes(fastify: FastifyInstance) {
    fastify.post('/:procedureID', appointmentController.createAppointment);
    fastify.post('/fila', appointmentController.enterQueue);
}

export default appointmentRoutes;