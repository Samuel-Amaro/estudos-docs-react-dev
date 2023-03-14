/**
 * * CORRIGIR ATUALIZAÇÕES DE ESTADO INCORRETAS
 * 
 *  Este formulário tem alguns bugs. Clique no botão que aumenta a pontuação algumas vezes. Observe que não aumenta. Em seguida, edite o primeiro nome e observe que a partitura de repente “alcançou” suas alterações. Por fim, edite o sobrenome e observe que a partitura desapareceu completamente.
 * 
 * Sua tarefa é corrigir todos esses bugs. Ao corrigi-los, explique por que cada um deles acontece.
*/

import { useState } from "react";

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: "Ranjani",
    lastName: "Shettar",
    score: 10,
  });

  function handlePlusClick() {
    setPlayer({
        ...player,
        score: player.score + 1
    });
    //player.score++;
  }

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayer({
      ...player,
      lastName: e.target.value,
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>{" "}
        <button type="button" onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          type="text"
          name="first-name"
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          type="text"
          name="player"
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}