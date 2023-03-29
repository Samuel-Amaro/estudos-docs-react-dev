/**
 * * IMPLEMENTAR SELEÇÃO MULTIPLA
 *
 * Neste exemplo, cada um Letter tem um isSelected suporte e um onToggle manipulador que o marca como selecionado. Isso funciona, mas o estado é armazenado como um selectedId( null ou um ID), portanto, apenas uma letra pode ser selecionada a qualquer momento.
 *
 * Altere a estrutura do estado para oferecer suporte à seleção múltipla. (Como você o estruturaria? Pense nisso antes de escrever o código.) Cada caixa de seleção deve se tornar independente das outras. Clicar em uma letra selecionada deve desmarcá-la. Finalmente, o rodapé deve mostrar o número correto dos itens selecionados.
 */

import { useState } from "react";
import { initialLetters, initialLetters as letters } from "./data.ts";
import { DataLetter } from "./corrigir-selecao-desaparecendo.js";

export default function MailClient2() {
  const [selectedsLetters, setSelectedLetters] = useState(initialLetters);

  const selectedCount = selectedsLetters.filter((letter) => {
    return letter.isStarred
  }).length;

  function handleToggle(idLetter: number) {
    setSelectedLetters(
      selectedsLetters.map((letter) => {
        if (letter.id === idLetter) {
          return {
            ...letter,
            isStarred: !letter.isStarred,
          };
        }
        return letter;
      })
    );
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {selectedsLetters.map((letter: DataLetter) => (
          <Letter2
            key={letter.id}
            letter={letter}
            isSelected={
              letter.isStarred
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>You selected {selectedCount} letters</b>
        </p>
      </ul>
    </>
  );
}

type PropsLetter2 = {
  letter: DataLetter;
  onToggle: (idLetter: number) => void;
  isSelected: boolean;
};

function Letter2({ letter, onToggle, isSelected }: PropsLetter2) {
  return (
    <li className={isSelected ? "selected" : ""}>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  );
}
