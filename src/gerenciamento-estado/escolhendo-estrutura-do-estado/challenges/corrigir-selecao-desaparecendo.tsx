/**
 * * CORRIGIR SELEÇÃO DESAPARECENDO
 *
 *  Há uma lista de letters estado. Quando você passa o mouse ou focaliza uma letra específica, ela é destacada. A letra destacada atualmente é armazenada na highlightedLetter variável de estado. Você pode "marcar" e "desmarcar" letras individuais, o que atualiza a letters matriz no estado.
 *
 * Este código funciona, mas há uma pequena falha na interface do usuário. Quando você pressiona “Star” ou “Unstar”, o realce desaparece por um momento. No entanto, ele reaparece assim que você move o ponteiro ou muda para outra letra com o teclado. Por que isso está acontecendo? Corrija-o para que o realce não desapareça após o clique do botão.
 */

import { useState } from "react";
import { initialLetters } from "./data.ts";
import Letter from "./Letter.tsx";

export type DataLetter = {
  id: number;
  subject: string;
  isStarred: boolean;
};

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  /*const [highlightedLetter, setHighlightedLetter] = useState<DataLetter | null>(
    null
  );*/
  const [highlightedId, setHightlightedId] = useState<number | null>(null);

  function handleHover(letterId: number) {
    //setHighlightedLetter(letter);
    setHightlightedId(letterId);
  }

  function handleStar(starredId: number) {
    /*const mapTr = letters.map((letter) => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred,
        };
      } else {
        return letter;
      }
    });
    const l = mapTr.filter((letter) => {
      return letter.id === starred.id;
    });
    */
    /*setLetters(
      letters.map((letter) => {
        if (letter.id === starred.id) {
          return {
            ...letter,
            isStarred: !letter.isStarred,
          };
        } else {
          return letter;
        }
      })
    );*/
    //setLetters(mapTr);
    //setHighlightedLetter(l[0]);
    setLetters(letters.map((letter) => {
        if(letter.id === starredId) {
            return {
                ...letter,
                isStarred: !letter.isStarred
            };
        }else{
            return letter;
        }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={letter.id === highlightedId}
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
