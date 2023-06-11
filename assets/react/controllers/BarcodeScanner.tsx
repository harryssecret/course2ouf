import React, {useState} from "react";
import {Scanner} from "./components/Scanner";
import {Results} from "./components/Results";

export default function () {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleBtnClick = () => setIsScannerActive(!isScannerActive);

  const handleOnDetected = (result: string) => {
    setResults([...results, result])
  }

  return (
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
    </div>
  );
}
