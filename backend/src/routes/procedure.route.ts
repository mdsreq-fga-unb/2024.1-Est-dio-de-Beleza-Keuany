import { FastifyInstance } from "fastify";
import procedureController from "../controllers/procedure.controller";

async function procedureRoutes(fastify: FastifyInstance) {
    fastify.post('/', procedureController.createProcedure);
    fastify.get('/', procedureController.findAllProcedure);
    fastify.patch('/:id', procedureController.updateProcedure);
    fastify.delete('/:id', procedureController.deleteProcedure);
}

export default procedureRoutes;