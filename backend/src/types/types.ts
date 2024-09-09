// Parâmetros da URL para o Fastify
export interface URLParams {
    id: string,
    procedureID?: string, // opcional
    customerPhone?: string, // opcional
    appointmentID?: string, // opcional
}

// Interface para procedimento
export interface Procedure {
    name: string,
    duration: number,
    price: number,
    description?: string, // opcional
    procedureStatus?: number, // opcional
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
    idAppointment?: number,
}

// Interface para Avaliação
export interface Review {
    rating: number,
    idAppointment: number,
    comment?: string,
    anonymous: number,
    customerName?: string,
}

// Interface para fila
export interface Queue {
    customerPhone: string,
    customerName: string,
    position: number,
    idAppointment: number,
}

// Interface para dados de um agendamento que é exibido para o cliente
export interface CustomerAppointment {
    procedureName: string,
    procedureDuration: number,
    procedurePrice: number,
    appointmentId: number,
    appointmentStatus: number,
    appointmentSchedule: string,
    queuePosition: number,
}

// Interface para os dados de agendamento e sua respectiva fila de clientes
export interface AppointmentWithQueue extends Appointment, Procedure {
    queue: Queue[];
    procedureDuration: number;
}

// Interface que representa o slot de horário que é retornado
// pela função que lista horários disponíveis para agendamentos
export interface TimeSlot {
    time: string;
    queueCount: number;
    idAppointment: number;
}  