import Fastify from "fastify";

// Rotas
import procedureRoutes from "./routes/procedure.route";
import workScheduleRoutes from "./routes/workSchedule.route";
import exceptScheduleRoutes from "./routes/exceptSchedule.route";

const fastify = Fastify({ logger: true });

const start = async () => {
    try {
        fastify.register(procedureRoutes, { prefix: '/procedimento' });
        fastify.register(workScheduleRoutes, { prefix: '/grade' });
        fastify.register(exceptScheduleRoutes, { prefix: '/excecao' });

        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`Server online at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();