import { FastifyInstance } from "fastify";
import procedureController from "../controllers/procedure.controller";

async function procedureRoutes(fastify: FastifyInstance) {
    fastify.post('/', procedureController.createProcedure);
}

export default procedureRoutes;