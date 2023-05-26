import {API_URL} from "@env";
import { fetchWithAuth } from "./Auth";

export const getStudent = async (id: number) => {
    const res = await fetchWithAuth(`${API_URL}/students/${id}`)
    return res.json();
}

export const getStudents = (page: number) => {
    const res = fetchWithAuth(`${API_URL}/students`)
}
