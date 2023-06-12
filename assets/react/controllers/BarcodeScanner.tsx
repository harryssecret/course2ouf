import React, {useEffect, useState} from "react";
import {Scanner} from "./components/Scanner";
import {Results} from "./components/Results";
import {authUser, getRaces, getStudentById, getToken, postResult, removeToken} from "../../lib/api";
import {Login} from "./Login";
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "react-query";
import {EventPicker} from "./components/EventPicker";

export type Student = {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
}

const queryClient = new QueryClient()

export default function () {
  return <QueryClientProvider client={queryClient}>
    <BarcodeApp/>
  </QueryClientProvider>
}


function BarcodeApp() {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentRace, setCurrentRace] = useState("");

  const queryClient = useQueryClient()

  const {data, isLoading, isError, error} = useQuery({queryKey: ['races'], queryFn: getRaces})

  const handleBtnClick = () => setIsScannerActive(!isScannerActive);

  const isUserConnected = () => {
    return getToken() !== null;
  }

  const handleOnDetected = async (result: string) => {
    const student = await getStudentById(result)

    await postResult(Number(currentRace), student.id)

    setResults([...results, result])
  }

  const handleOnLogin = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    console.log(currentRace)

    setIsLoggedIn(isUserConnected())
  }, [isLoggedIn, isUserConnected, isError, error, currentRace])

  return (
    <>
      {
        isLoggedIn ? <>
          <div>
            <h1 className={"text-xl font-bold"}>Scanner</h1>
            {isError ?? <div className={"alert alert-error"}>

              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Erreur : {error} .</span>
            </div>}

            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <EventPicker events={data} onChange={(value) => setCurrentRace(value)}/>}

            <section>

              <h2>Choix de la course</h2>
            </section>
            {
              isScannerActive && <Scanner isActive={isScannerActive} onDetected={handleOnDetected}/>
            }

            <section>
              <h2 className={"mb-2"}>Actions</h2>
              <div>
                <button onClick={handleBtnClick} className="btn-primary btn">
                  {isScannerActive ? "Désactiver" : "Activer"} la caméra
                </button>
              </div>
            </section>


            <section className={"mt-4"}>
              <h2>Résultats</h2>
              <Results results={results}/>
            </section>
            <button className={"btn"} onClick={() => {
              removeToken()
            }}>Se déconnecter
            </button>
          </div>
        </> : <Login onLogin={handleOnLogin}/>
      }
    </>
  );
}
