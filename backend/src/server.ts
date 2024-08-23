import Fastify from "fastify";
import procedureRoutes from "./routes/procedure.route";

const fastify = Fastify({ logger: true });

const start = async () => {
    try {
        fastify.register(procedureRoutes, { prefix: '/procedimento' });

        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`Server online at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();