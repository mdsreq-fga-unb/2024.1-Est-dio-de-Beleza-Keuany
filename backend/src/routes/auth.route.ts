import { FastifyInstance } from "fastify";
import authController from "../controllers/auth.controller";

async function authRoutes(fastify: FastifyInstance) {
    // Realiza o login do admin
    fastify.post('/login', authController.login);
}

export default authRoutes;