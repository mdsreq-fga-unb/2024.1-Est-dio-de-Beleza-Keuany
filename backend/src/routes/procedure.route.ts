import { FastifyInstance } from "fastify";
import procedureController from "../controllers/procedure.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

async function procedureRoutes(fastify: FastifyInstance) {
    // Cadastra um procedimento
    fastify.post('/', { preHandler: [authMiddleware] }, procedureController.createProcedure);
    // Lista todos os procedimentos
    fastify.get('/', procedureController.findAllProcedure);
    // Lista um procedimento dado seu ID
    fastify.get('/:id', procedureController.findProcedureById);
    // Atualiza um procedimento
    fastify.patch('/:id', { preHandler: [authMiddleware] }, procedureController.updateProcedure);
    // Exclui um procedimento
    fastify.delete('/:id', { preHandler: [authMiddleware] }, procedureController.deleteProcedure);
}

export default procedureRoutes;