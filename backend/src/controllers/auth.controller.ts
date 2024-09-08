import { FastifyRequest, FastifyReply } from "fastify";
import { generateToken } from "../services/auth.service";

const login = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { username, password } = req.body as { username: string, password: string };

        if (!username || !password)
            return res.status(400).send({ message: 'Insira os campos obrigatórios!' });
        
        if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
            const token = generateToken(username);
            
            res.code(201).send({ token: token });
        } else {
            return res.status(400).send({ message: 'Usuário e/ou senha inválidos!' });
        }
    } catch (err: unknown) {
        if (err instanceof Error) 
            res.code(500).send({ authController: err.message });    
        else
            res.code(500).send({ authController: 'Erro desconhecido!' });
    }
}

export default { login }