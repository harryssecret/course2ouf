import * as SecureStore from "expo-secure-store";
import {API_URL} from "@env";

async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function getSavedToken() {
  return await SecureStore.getItemAsync("token");
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getSavedToken();
  if (!token) {
    throw new Error("Could not get saved token");
  }
  const headers = {
    "Authorization": `Bearer ${token}`,
    ...options.headers
  };
  const response = await fetch(url, {...options, headers})
  return await response.json()
}

export async function logUserIn(username: string, password: string) {

  const res = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify({username: username, password: password})
  })

  if (res.status === 200) {
    const body = await res.json()
    await saveToken(body.token)
  }
}
