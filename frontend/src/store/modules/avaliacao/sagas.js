import api from "../../../services/api";

export function getAllReviews() {
    const response = api.get(`/avaliacao`);

    return response;
}