// Interface para procedimento
export interface Procedure {
    name: string,
    duration: number,
    price: number,
    description?: string, // opcional
}