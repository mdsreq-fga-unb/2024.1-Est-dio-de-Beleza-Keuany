import api from "../../../services/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const token = Cookies.get('token');

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export function getAllExceptions() {
    const response = api.get(`/excecao`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export async function postException(data) {
    try {
      const response = await api.post(`/excecao`, data);
      await Swal.fire("Sucesso!", "Exceção cadastrada com sucesso!", "success");
      return response; // Retorna a resposta para ser usada pela função que chamou
    } catch (err) {
      if (err.response) {
        await Swal.fire("Erro!", err.response.data.message, "error");
      }
      throw err; // Lança o erro para que a função que chamou possa tratá-lo
    }
}

export async function patchException(id, data) {
    try {
        const response = await api.patch(`/excecao/${id}`, data);
        await Swal.fire("Sucesso!", "Exceção atualizada com sucesso!", "success");
        return response; // Retorna a resposta para ser usada pela função que chamou
      } catch (err) {
        if (err.response) {
          await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err; // Lança o erro para que a função que chamou possa tratá-lo
      }
}

export async function deleteException(id) {
    try {
        const response = await api.delete(`/excecao/${id}`);
        await Swal.fire("Sucesso!", "Exceção removida com sucesso!", "success");
        return response; // Retorna a resposta para ser usada pela função que chamou
      } catch (err) {
        if (err.response) {
          await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err; // Lança o erro para que a função que chamou possa tratá-lo
      }
}