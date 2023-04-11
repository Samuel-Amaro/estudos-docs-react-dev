/**
 * * CONCENTRE O CAMPO DE PESQUISA COM COMPONENTES SEPARADOS
 *
 *  Faça com que clicar no botão “Pesquisar” coloque o foco no campo. Observe que cada componente é definido em um arquivo separado e não deve ser removido dele. Como você os conecta?
 */

import { forwardRef, useRef } from "react";

export default function Page() {
  const refSearch = useRef<HTMLInputElement | null>(null);

  function handleBtnClick() {
    refSearch.current?.focus();
  }

  return (
    <>
      <nav>
        <SearchButton onHandleClick={handleBtnClick} />
      </nav>
      <SearchInput ref={refSearch} />
    </>
  );
}

type PropsSearchButton = {
  onHandleClick: () => void;
};

export function SearchButton({ onHandleClick }: PropsSearchButton) {
  return <button onClick={onHandleClick}>Search</button>;
}

// eslint-disable-next-line react/display-name
const SearchInput = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => {
  return <input {...props} placeholder="Looking for something?" ref={ref} />;
});
