/**
 * * CORRIGIR UM COMPONENTE FALHANDO AO RENDERIZAR NOVAMENTE
 *
 * Este botão deve alternar entre mostrar "On" e "Off". No entanto, sempre mostra "Off". O que está errado neste código? Consertá-lo.
 */

import { useRef, useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);
  //const isOnRef = useRef(false);

  return (
    <button
      onClick={() => {
        //isOnRef.current = !isOnRef.current;
        setIsOn(!isOn);
      }}
    >
      {isOn ? "On" : "Off"}
    </button>
  );
}
