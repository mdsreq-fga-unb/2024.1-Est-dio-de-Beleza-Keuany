// Parâmetros da URL para o Fastify
export interface URLParams {
    id: string,
    procedureID?: string, // opcional
}

// Interface para procedimento
export interface Procedure {
    name: string,
    duration: number,
    price: number,
    description?: string, // opcional
    status?: number, // opcional
}

// Interface para grade horária
type dayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface WorkSchedule {
    dayOfWeek: dayOfWeek,
    startTime: string,
    endTime: string,
    activeDay: number,
}

// Interface para exceção da grade
export interface ExceptionSchedule {
    exceptionDate: string,
    startTime: string,
    endTime: string,
    isAvailable: number,
}

// Interface para agendamento
export interface Appointment {
    schedule: string,
    status: number,
    idProcedure: number,
}

// Interface para fila
export interface Queue {
    customerPhone: string,
    customerName: string,
    position: number,
    idAppointment: number,
}