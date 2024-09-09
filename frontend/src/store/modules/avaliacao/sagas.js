import api from "../../../services/api";
import Swal from 'sweetalert2';

export function getAllReviews() {
    const response = api.get(`/avaliacao`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });
    
    return response;
}