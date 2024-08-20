import Fastify from "fastify";
import dbPool from "./database/connection";

const fastify = Fastify({ logger: true });

const start = async () => {
    try {
        fastify.get('/', async (req, res) => {
            const [rows]: [any[], any] = await dbPool.query("SELECT 2 + 2 AS result");
            return { result: rows[0].result };
        });

        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`Server online at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();