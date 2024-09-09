import api from "../../../services/api";
import Swal from "sweetalert2";

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