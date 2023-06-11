import React from "react";

export const Results = ({results}: { results: string[] }) => {
  if (results.length === 0) {
    return <p>Aucun résultat scanné pour le moment.</p>
  }

  return (<ul className={"menu bg-base-200 w-56 p-4 rounded-box"}>
    {results.map((result, i) => {
      return (
        <Result key={i}>{result}</Result>
      )
    })}
  </ul>)
}

const Result = ({children}: { children: React.ReactNode }) => (
  <li>{children}</li>
)
