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

