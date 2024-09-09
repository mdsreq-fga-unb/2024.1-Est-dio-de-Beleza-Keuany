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

export function postAppointment(id, data) {
    const response = api.post(`/agendamento/${id}`, data)
    .then(async () => {
        await Swal.fire("Sucesso!", "Atendimento cadastrado com sucesso!", "success");
    })
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
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

