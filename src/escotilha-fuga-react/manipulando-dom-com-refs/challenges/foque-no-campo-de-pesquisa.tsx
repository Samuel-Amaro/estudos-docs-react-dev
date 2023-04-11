/**
 * * FOQUE NO CAMPO DE PESQUISA
 *
 * Faça com que clicar no botão “Pesquisar” coloque o foco no campo.
 */

import { useRef } from "react";

export default function Page() {
  const refSearch = useRef<HTMLInputElement | null>(null);

  function getRef() {
    if (!refSearch.current) throw new Error("Error in ref search");
    return refSearch.current;
  }
  return (
    <>
      <nav>
        <button
          type="button"
          onClick={() => {
            getRef().focus();
          }}
        >
          Search
        </button>
      </nav>
      <input type="search" placeholder="Looking for something?" ref={refSearch}/>
    </>
  );
}
