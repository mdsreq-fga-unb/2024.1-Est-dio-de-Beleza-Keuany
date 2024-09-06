import { FastifyInstance } from "fastify";
import reviewController from "../controllers/review.controller";

async function reviewRoutes(fastify: FastifyInstance) {
    // Cadastra uma avaliação de um agendamento finalizado
    fastify.post('/:appointmentID', reviewController.createReview);
    // Lista todas as avaliações
    fastify.get('/', reviewController.findAllReviews);
    // Lista todas as avaliações de um cliente
    fastify.get('/cliente', reviewController.findAllReviewsFromCustomer)
    // Atualiza uma avaliação
    fastify.patch('/:id', reviewController.updateReview);
    // Exclui uma avaliação
    fastify.delete('/:id', reviewController.deleteReview);
}

export default reviewRoutes;