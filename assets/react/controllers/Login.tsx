import React, {useState} from "react";
import {authUser} from "../../lib/api";

export const Login = ({onLogin}: { onLogin: () => void }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await authUser(username, password)
    onLogin()
  }

  return <form onSubmit={handleSubmit}>
    <p>Cette page de connexion est temporaire. C'est normal si vous devez vous connecter deux fois.</p>
    <div className={"form-control "}>
      <label htmlFor={"username"}>Username</label>
      <input type="text" className="input input-bordered w-full max-w-xs" id={"username"} name={"username"}
             value={username}
             onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div className="form-control">
      <label>Password</label>
      <input type="password" className="input input-bordered w-full max-w-xs" id={"password"} name={"password"}
             value={password}
             onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <button type="submit" className={"btn btn-primary"}>Se connecter</button>
  </form>
}
