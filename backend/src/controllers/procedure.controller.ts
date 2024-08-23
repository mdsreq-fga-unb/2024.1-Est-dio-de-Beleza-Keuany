import procedureService from "../services/procedure.service";
import { Procedure } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";

const createProcedure = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const body = req.body as Procedure;

        const { name, duration, price, description } = body;

        if (!name)
            return res.code(400).send({ message: 'Informe o nome do procedimento!' });
        
        if (!duration)
            return res.code(400).send({ message: 'Informe a duração do procedimento (em minutos)!' });

        if (!price)
            return res.code(400).send({ message: 'Informe o valor do procedimento em R$!' });

        const procedure = await procedureService.createProcedureService(body);

        if (!procedure)
            return res.code(400).send({ message: 'Erro no cadastro do procedimento!' });

        res.code(201).send({
            procedure: {
                id: procedure,
                name,
                duration,
                price,
                description,
            },
            message: 'Procedimento cadastrado com sucesso!'
        });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ procedureController: err.message });    
        else
            res.code(500).send({ procedureController: 'Erro desconhecido!' });
    }
}

export default {
    createProcedure,
}