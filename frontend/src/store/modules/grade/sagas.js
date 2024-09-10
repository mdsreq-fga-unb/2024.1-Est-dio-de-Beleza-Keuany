import api from "../../../services/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const token = Cookies.get('token');

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export async function getAllWorkSchedule() {
    const response = api.get(`/grade`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export async function patchWorkSchedule(id, data) {
    try {
        const response = await api.patch(`/grade/${id}`, data);
        await Swal.fire("Sucesso!", "Grade horária atualizada com sucesso!", "success");
        return response; // Retorna a resposta para ser usada pela função que chamou
    } catch (err) {
        if (err.response) {
          await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err; // Lança o erro para que a função que chamou possa tratá-lo
    }
}