import procedureService from "../services/procedure.service";
import { Procedure, URLParams } from "../types/types";
import { FastifyRequest, FastifyReply } from "fastify";

const createProcedure = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const body = req.body as Procedure;

        const { name, duration, price, description } = body;

        if (!name)
            return res.code(400).send({ message: 'Informe o nome do procedimento!' });
        
        if (!duration)
            return res.code(400).send({ message: 'Informe a duração do procedimento (em minutos)!' });

        if (duration <= 0 || duration > 360)
            return res.code(400).send({ message: 'Tempo de duração inválido!' });

        if (!price)
            return res.code(400).send({ message: 'Informe o valor do procedimento em R$!' });

        if (price <= 0 || price >= 1000)
            return res.code(400).send({ message: 'Preço inválido!' });

        const procedure = await procedureService.createService(body);

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

const findAllProcedure = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const procedures = await procedureService.findAllService();

        if (procedures.length === 0)
            return res.code(404).send({ message: 'Não há procedimentos cadastrados!' });

        res.code(200).send(procedures);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ procedureController: err.message });    
        else
            res.code(500).send({ procedureController: 'Erro desconhecido!' });
    }
}

const findProcedureById = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const id = Number((req.params as URLParams).id);

        if (isNaN(id))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });

        const procedure = await procedureService.findByIdService(id);

        if (!procedure)
            return res.code(404).send({ message: 'Procedimento não encontrado' });

        res.code(200).send(procedure);
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ procedureController: err.message });    
        else
            res.code(500).send({ procedureController: 'Erro desconhecido!' });
    }
}

const updateProcedure = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const id = Number((req.params as URLParams).id);
        const body = req.body as Partial<Procedure>;

        if (isNaN(id))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });

        const { name, duration, price, description, procedureStatus } = body;

        if (!name && !duration && !price && !description && !procedureStatus)
            return res.code(400).send({ message: 'Preencha pelo menos um campo para atualização!' });

        if (duration) {
            if (duration <= 0 || duration > 360)
                return res.code(400).send({ message: 'Tempo de duração inválido!' });
        }

        if (price) {
            if (price <= 0 || price >= 1000)
                return res.code(400).send({ message: 'Preço inválido!' });
        }

        const success = await procedureService.updateService(id, body);

        if (!success)
            return res.code(404).send({ message: 'Procedimento não encontrado' });

        res.code(200).send({ message: 'Procedimento atualizado com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ procedureController: err.message });    
        else
            res.code(500).send({ procedureController: 'Erro desconhecido!' });
    }
}

const deleteProcedure = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const id = Number((req.params as URLParams).id);

        if (isNaN(id))
            return res.code(400).send({ message: 'ID do procedimento não fornecido ou inválido!' });
        
        const success = await procedureService.deleteService(id);

        if (!success)
            return res.code(404).send({ message: 'Procedimento não encontrado' });

        res.code(200).send({ message: 'Procedimento removido com sucesso!' });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ procedureController: err.message });    
        else
            res.code(500).send({ procedureController: 'Erro desconhecido!' });
    }
}

export default {
    createProcedure,
    findAllProcedure,
    findProcedureById,
    updateProcedure,
    deleteProcedure
}