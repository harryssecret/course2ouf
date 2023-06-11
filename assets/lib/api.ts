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

export async function postResult(result: string, raceId: number, studentId: number, token: string) {
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
  const req = await fetch(`${apiEndpoint}/api/`, {body, headers})
  return await req.json();
}

async function getStudentByBarcode(code: string, token: string) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/ld+json'
  }
  const body = JSON.stringify({

  })
}
