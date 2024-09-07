import jwt from 'jsonwebtoken';

export const generateToken = (username: string) => {
    const secret = process.env.SECRET_JWT;

    if (!secret)
        throw new Error("A SECRET_JWT não está definida nas variáveis de ambiente");

    return jwt.sign({ username }, secret, { expiresIn: 86400 });
}