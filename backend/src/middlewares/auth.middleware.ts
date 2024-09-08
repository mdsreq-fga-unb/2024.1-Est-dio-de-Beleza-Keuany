import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { authorization } = req.headers;
        const secret = process.env.SECRET_JWT;

        if (!secret)
            return res.status(400).send({ message: 'A SECRET_JWT não está definida nas variáveis de ambiente' });

        if (!authorization)
            return res.status(401).send({ message: 'Acesso não autorizado' });

        const parts = authorization.split(" ");
        if (parts.length !== 2)
            return res.status(401).send({ message: 'Acesso não autorizado' });

        const [schema, token] = parts;

        if (schema !== 'Bearer')
            return res.status(401).send({ message: 'Acesso não autorizado' });

        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                return res.status(401).send({ message: 'Token inválido' });

            (req as any).user = decoded;
            return;
        });
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ authMiddleware: err.message });    
        else
            res.code(500).send({ authMiddleware: 'Erro desconhecido!' });
    }
}