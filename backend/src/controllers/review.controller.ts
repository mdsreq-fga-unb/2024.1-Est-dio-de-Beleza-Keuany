import reviewService from "../services/review.service";
import { Review, Queue, URLParams } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";

const createReview = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const appointmentID = Number(req.params.appointmentID);
        const body = req.body as Review;

        const { rating, comment, anonymous } = body;

        if (isNaN(appointmentID))
            return res.code(400).send({ message: 'ID do agendamento não fornecido ou inválido!' });

        if (!rating)
            return res.code(400).send({ message: 'Informe uma nota para o agendamento (1 a 5)!' });

        if (rating < 1 || rating > 5)
            return res.code(400).send({ message: 'A nota só pode ser de 1 a 5!' });

        if (anonymous === undefined)
            return res.code(400).send({ message: 'Informe se a avaliação será anônima ou não' });

        let reviewBody: Review = {
            rating,
            idAppointment: appointmentID,
            anonymous
        }
       
        if (comment)
            reviewBody.comment = comment;

        const review = await reviewService.createService(reviewBody);
        
        if (!review)
            return res.code(400).send({ message: 'Erro no cadastro da avaliação!' });
        
        res.code(201).send({
            review: {
                id: review,
                rating,
                comment,
                anonymous,
                idAppointment: appointmentID,
            },
            message: 'Avaliação cadastrada com sucesso!'
        });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ reviewController: err.message });    
        else
            res.code(500).send({ reviewController: 'Erro desconhecido!' });
    }
}

const findAllReviews = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const reviews = await reviewService.findAllService();

        if (reviews.length === 0)
            return res.code(404).send({ message: 'Não há avaliações cadastradas!' });
        else {
            const formattedReviews = reviews.map(review => {
                const customerName = review.anonymous ? "Anônimo" : review.customerName;
                
                const { anonymous, ...rest } = review;

                return {
                    ...rest,
                    customerName,
                }
            });

            return res.code(200).send(formattedReviews);
        }
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ reviewController: err.message });    
        else
            res.code(500).send({ reviewController: 'Erro desconhecido!' });
    }
}

const findAllReviewsFromCustomer = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { customerPhone } = req.query as Partial<Queue>;

        if (!customerPhone)
            return res.code(400).send({ message: 'Informe o telefone para listar as avaliações' });

        const reviews = await reviewService.findAllReviewsFromCustomerService(customerPhone);

        if (reviews.length === 0)
            return res.code(404).send({ message: 'Não há avaliações cadastradas!' });

        res.code(200).send(reviews);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ reviewController: err.message });    
        else
            res.code(500).send({ reviewController: 'Erro desconhecido!' });
    }
}

const updateReview = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const id = Number(req.params.id);
        const body = req.body as Partial<Review>;

        if (isNaN(id))
            return res.code(400).send({ message: 'ID da avaliação não fornecido ou inválido!' });

        const { rating, comment } = body;

        if (!rating && !comment)
            return res.code(400).send({ message: 'Preencha pelo menos um campo para atualização!' });

        if (rating) {
            if (rating < 1 || rating > 5)
                return res.code(400).send({ message: 'A nota só pode ser de 1 a 5!' });
        }

        const success = await reviewService.updateService(id, body);

        if (!success)
            return res.code(404).send({ message: 'Avaliação não encontrada' });

        res.code(200).send({ message: 'Avaliação atualizada com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ reviewController: err.message });    
        else
            res.code(500).send({ reviewController: 'Erro desconhecido!' });
    }
}

const deleteReview = async (req: FastifyRequest<{ Params: URLParams }>, res: FastifyReply) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id))
            return res.code(400).send({ message: 'ID da avaliação não fornecido ou inválido!' });
        
        const success = await reviewService.deleteService(id);

        if (!success)
            return res.code(404).send({ message: 'Avaliação não encontrada' });

        res.code(200).send({ message: 'Avaliação removida com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ reviewController: err.message });    
        else
            res.code(500).send({ reviewController: 'Erro desconhecido!' });
    }
}

export default {
    createReview,
    findAllReviews,
    findAllReviewsFromCustomer,
    updateReview,
    deleteReview,
}