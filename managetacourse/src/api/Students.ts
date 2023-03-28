import {API_URL} from "@env";

export const getStudent = async (id: number) => {
    const res = await fetch(`${API_URL}/students/${id}`)
    return res.json();
}

export const getStudents = () => {
    // todo
}
