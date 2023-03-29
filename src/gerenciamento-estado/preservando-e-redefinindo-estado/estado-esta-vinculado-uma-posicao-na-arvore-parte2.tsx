/**
 * O React manterá o estado enquanto você renderizar o mesmo componente na mesma posição. Para ver isso, incremente ambos os contadores, remova o segundo componente desmarcando a caixa de seleção "Renderizar o segundo contador" e adicione-o novamente marcando-o novamente:
*/

import { useState } from "react";
import Counter from "./estado-esta-vinculado-uma-posicao-na-arvore";

export default function WrapperCounter() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />}
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={(e) => {
            setShowB(e.target.checked);
          }}
        />
        Render the second counter
      </label>
    </div>
  );
}