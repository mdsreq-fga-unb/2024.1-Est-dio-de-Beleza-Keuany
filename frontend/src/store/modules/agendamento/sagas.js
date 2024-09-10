import api from '../../../services/api';
import Swal from 'sweetalert2'; 

export function getAllAppointments() {
    const response = api.get(`/agendamento`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export function getAppointmentById(id) {
    const response = api.get(`/agendamento/buscar/${id}`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export async function postAppointment(id, data) {
    try {
      const response = await api.post(`/agendamento/${id}`, data);
      await Swal.fire("Sucesso!", "Atendimento cadastrado com sucesso!", "success");
      return response; // Retorna a resposta para ser usada pela função que chamou
    } catch (err) {
      if (err.response) {
        await Swal.fire("Erro!", err.response.data.message, "error");
      }
      throw err; // Lança o erro para que a função que chamou possa tratá-lo
    }
}

export async function enterQueue(data) {
    try {
        const response = await api.post(`/agendamento/fila`, data);
        await Swal.fire("Sucesso!", "Entrada na fila feita com sucesso!", "success");
        return response;
    } catch (err) {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err;
    }
}
  

export function getAvailableSchedules(id, schedule) {
    const response = api.get(`/agendamento/${id}`, { params: { schedule } })
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export function getAppointmentsFromCustomer(customerPhone) {
    const response = api.get(`/agendamento/cliente/`, { params: { customerPhone } })
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export async function cancelAppointmentCustomer(id, customerPhone) {
    try {
        const response = await api.delete(`/agendamento/${id}`, { params: { customerPhone } });
        await Swal.fire("Sucesso!", "Agendamento cancelado com sucesso!", "success");
        return response;
    } catch (err) {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err;
    }
}

export async function cancelAppointmentAdmin(id) {
    try {
        const response = await api.patch(`/agendamento/cancelar/${id}`);
        await Swal.fire("Sucesso!", "Agendamento cancelado com sucesso!", "success");
        return response;
    } catch (err) {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err;
    }
}

export async function finishAppointmentAdmin(id) {
    try {
        const response = await api.patch(`/agendamento/finalizar/${id}`);
        await Swal.fire("Sucesso!", "Agendamento finalizado com sucesso!", "success");
        return response;
    } catch (err) {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err;
    }
}

export async function confirmAppointment(id) {
    try {
        const response = await api.patch(`/agendamento/confirmar/${id}`);
        await Swal.fire("Sucesso!", "Agendamento confirmado com sucesso!", "success");
        return response;
    } catch (err) {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err;
    }
}