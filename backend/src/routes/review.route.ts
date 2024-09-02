import { FastifyInstance } from "fastify";
import reviewController from "../controllers/review.controller";

async function reviewRoutes(fastify: FastifyInstance) {
    fastify.post('/:appointmentID', reviewController.createReview);
    fastify.get('/', reviewController.findAllReviews);
    fastify.get('/cliente', reviewController.findAllReviewsFromCustomer)
    fastify.patch('/:id', reviewController.updateReview);
    fastify.delete('/:id', reviewController.deleteReview);
}

export default reviewRoutes;