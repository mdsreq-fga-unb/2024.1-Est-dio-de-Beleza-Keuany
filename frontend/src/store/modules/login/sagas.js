import api from "../../../services/api";
import Swal from 'sweetalert2';

export async function login(data) {
    const response = await api.post(`/auth/login`, data)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}