/**
 * * CORRIGINDO DEBOUCING
 *
 *  Neste exemplo, todos os manipuladores de cliques de botão são “debounced”. Para ver o que isso significa, pressione um dos botões. Observe como a mensagem aparece um segundo depois. Se você pressionar o botão enquanto espera pela mensagem, o cronômetro será zerado. Portanto, se você continuar clicando no mesmo botão rapidamente várias vezes, a mensagem não aparecerá até um segundo depois de parar de clicar. Debouncing permite que você atrase alguma ação até que o usuário “pare de fazer as coisas”.
 *
 * Este exemplo funciona, mas não exatamente como pretendido. Os botões não são independentes. Para ver o problema, clique em um dos botões e imediatamente em outro botão. Você esperaria que, após um atraso, veria as mensagens de ambos os botões. Mas apenas a mensagem do último botão aparece. A mensagem do primeiro botão se perde.
 *
 * Por que os botões estão interferindo uns nos outros? Encontre e corrija o problema.
 */

import React, { useRef, useState } from "react";

let timeoutID: number;

type PropsDebouncedButton = {
  onClick: () => void;
  children: React.ReactNode;
};

function DebouncedButton({ onClick, children }: PropsDebouncedButton) {
  const refTimeoutId = useRef<number | null>(null);
  function getRef() {
    if (!refTimeoutId.current) {
      return undefined;
    }
    return refTimeoutId.current;
  }

  return (
    <button
      onClick={() => {
        clearTimeout(getRef());
        refTimeoutId.current = setTimeout(() => {
          onClick();
        }, 1000);
      }}
    >
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton onClick={() => alert("Spaceship launched!")}>
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton onClick={() => alert("Soup boiled!")}>
        Boil the soup
      </DebouncedButton>
      <DebouncedButton onClick={() => alert("Lullaby sung!")}>
        Sing a lullaby
      </DebouncedButton>
    </>
  );
}
