// Parâmetros da URL para o Fastify
export interface URLParams {
    id: string;
}

// Interface para procedimento
export interface Procedure {
    name: string,
    duration: number,
    price: number,
    description?: string, // opcional
    status?: number, // opcional
}