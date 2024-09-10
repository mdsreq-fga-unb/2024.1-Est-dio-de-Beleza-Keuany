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

export async function postReview(idAppointment, data) {
    try {
        const response = await api.post(`/avaliacao/${idAppointment}`, data);
        await Swal.fire("Sucesso!", "Avaliação cadastrada com sucesso!", "success");
        return response; // Retorna a resposta para ser usada pela função que chamou
      } catch (err) {
        if (err.response) {
          await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err; // Lança o erro para que a função que chamou possa tratá-lo
      }
}