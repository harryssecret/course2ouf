import { fetchWithAuth } from "./Auth";
import { API_URL } from "@env";

type Ranking = {
  id: number;
  endrun: string | Date;
  student: string;
}

export async function getRankings(page: number) {
  const response = await fetchWithAuth(`${API_URL}/rankings?page=${page}`)
  return await response.json()
}

export async function postRanking(ranking: Ranking) {
  const response = await fetchWithAuth(`${API_URL}/rankings`)
}
