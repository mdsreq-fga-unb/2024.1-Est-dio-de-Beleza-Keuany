import api from "../../../services/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const token = Cookies.get('token');

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export function getAllProcedures() {
    const response = api.get(`/procedimento`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export function getProcedureById(id) {
    const response = api.get(`/procedimento/${id}`)
    .catch(async (err) => {
        if (err.response) {
            await Swal.fire("Erro!", err.response.data.message, "error");
        }
    });

    return response;
}

export async function postProcedure(data) {
    try {
      const response = await api.post(`/procedimento`, data);
      await Swal.fire("Sucesso!", "Procedimento cadastrado com sucesso!", "success");
      return response; // Retorna a resposta para ser usada pela função que chamou
    } catch (err) {
      if (err.response) {
        await Swal.fire("Erro!", err.response.data.message, "error");
      }
      throw err; // Lança o erro para que a função que chamou possa tratá-lo
    }
}

export async function patchProcedure(id, data) {
    try {
        const response = await api.patch(`/procedimento/${id}`, data);
        await Swal.fire("Sucesso!", "Procedimento atualizado com sucesso!", "success");
        return response; // Retorna a resposta para ser usada pela função que chamou
      } catch (err) {
        if (err.response) {
          await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err; // Lança o erro para que a função que chamou possa tratá-lo
      }
}

export async function deleteProcedure(id) {
    try {
        const response = await api.delete(`/procedimento/${id}`);
        await Swal.fire("Sucesso!", "Procedimento removido com sucesso!", "success");
        return response; // Retorna a resposta para ser usada pela função que chamou
      } catch (err) {
        if (err.response) {
          await Swal.fire("Erro!", err.response.data.message, "error");
        }
        throw err; // Lança o erro para que a função que chamou possa tratá-lo
      }
}