import { FastifyInstance } from "fastify";
import procedureController from "../controllers/procedure.controller";

async function procedureRoutes(fastify: FastifyInstance) {
    // Cadastra um procedimento
    fastify.post('/', procedureController.createProcedure);
    // Lista todos os procedimentos
    fastify.get('/', procedureController.findAllProcedure);
    // Atualiza um procedimento
    fastify.patch('/:id', procedureController.updateProcedure);
    // Exclui um procedimento
    fastify.delete('/:id', procedureController.deleteProcedure);
}

export default procedureRoutes;