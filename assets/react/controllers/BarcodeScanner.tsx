import React, {useEffect, useState} from "react";
import {Scanner} from "./components/Scanner";
import {Results} from "./components/Results";
import {authUser, getToken, removeToken} from "../../lib/api";

export default function () {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleBtnClick = () => setIsScannerActive(!isScannerActive);

  const isUserConnected = () => {
    return getToken() !== null;
  }

  const postResult = async (result: string) => {

  }

  const handleOnDetected = (result: string) => {
    setResults([...results, result])
  }

  const handleOnLogin = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    setIsLoggedIn(isUserConnected())
  }, [isLoggedIn, isUserConnected])

  return (
    <>
      {
        isLoggedIn ? <>
          <div>
            <h1 className={"text-xl font-bold"}>Scanner</h1>

            <section>
              <h2 className={"mb-2"}>Actions</h2>
              <div>
                <button onClick={handleBtnClick} className="btn-primary btn">
                  {isScannerActive ? "Désactiver" : "Activer"} la caméra
                </button>
              </div>
            </section>

            {
              isScannerActive && <Scanner isActive={isScannerActive} onDetected={handleOnDetected}/>
            }
            <section className={"mt-4"}>
              <h2>Résultats</h2>
              <Results results={results}/>
            </section>
            <button className={"btn"} onClick={() => {removeToken()}}>Se déconnecter</button>
          </div>
        </> : <Login onLogin={handleOnLogin}/>
      }
    </>
  );
}

const Login = ({onLogin}: { onLogin: () => void }) => {
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
