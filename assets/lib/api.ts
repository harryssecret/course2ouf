import {Race} from "../react/controllers/components/EventPicker";
import {Student} from "../react/controllers/BarcodeScanner";

const apiEndpoint = location.origin


async function getTokenOfUser(username: string, password: string) {
  const req = await fetch(`${apiEndpoint}/api/auth`, {
    method: "POST",
    body: JSON.stringify({
      username, password
    }),
    headers: {
      'Accept': 'application/ld+json',
      'Content-Type': 'application/json'
    }
  })
  const res = await req.json();
  return res.token;
}

function setToken(token: string) {
  localStorage.setItem("scanToken", token)
}

export function getToken() {
  return localStorage.getItem("scanToken")
}

export function removeToken() {
  localStorage.removeItem("scanToken")
}

export async function authUser(username: string, password: string) {
  const token = getToken()
  if (!token) {
    const newToken = await getTokenOfUser(username, password)
    console.log(newToken)
    setToken(newToken)
  }
}

export async function postResult(raceId: number, studentId: number) {
  const token = getToken()
  if (!token) {
    throw new Error("No token was set.")
  }

  const body = JSON.stringify({
    "endrun": new Date().toISOString(),
    "race": raceId.toString(),
    "student": studentId.toString()
  })
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/ld+json'
  }
  const res = await fetch(`${apiEndpoint}/api/rankings`, {body, headers})
  return await res.json();
}

export async function getStudentById(id: string): Promise<Student> {
  const token = getToken()
  if (!token) {
    throw new Error("No token was set.")
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/ld+json'
  }

  const res = await fetch(`${apiEndpoint}/api/students/${id}`)
  return await res.json()
}

export async function getRaces(): Promise<Race[]> {
  const token = getToken()
  if (!token) {
    throw new Error("No token was set.")
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  const res = await fetch(`${apiEndpoint}/api/races`, {headers})
  const races = await res.json();
  return races;
}
