/**
 * * FOCAR UM CAMPO NA MONTAGEM
 * 
 *  Neste exemplo, o formulário renderiza um <MyInput /> componente.
 * 
 * Use o método de entrada focus() para fazer MyInput o foco automaticamente quando ele aparecer na tela. Já existe uma implementação comentada, mas não funciona muito bem. Descubra por que não funciona e corrija-o. (Se você estiver familiarizado com o autoFocus atributo, finja que ele não existe: estamos reimplementando a mesma funcionalidade do zero.)
 * 
 * Para verificar se sua solução funciona, pressione “Mostrar formulário” e verifique se a entrada recebe o foco (fica destacada e o cursor é colocado dentro). Pressione “Ocultar formulário” e “Mostrar formulário” novamente. Verifique se a entrada está destacada novamente.
 * 
 * MyInput deve se concentrar apenas na montagem , e não após cada renderização. Para verificar se o comportamento está correto, pressione “Mostrar formulário” e, em seguida, pressione repetidamente a caixa de seleção “Tornar maiúsculas”. Clicar na caixa de seleção não deve focar a entrada acima dela.
*/

import React, { useEffect, useRef, useState } from "react";
import "./style.css";



function MyInput(props: React.ComponentPropsWithoutRef<"input">) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <input {...props} ref={ref} />;
}


export default function Form1() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("Taylor");
  const [upper, setUpper] = useState(false);
  return (
    <>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"} form
      </button>
      <br />
      <hr />
      {show && (
        <>
          <label htmlFor="name">
            Enter your name:
            <MyInput value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <input
              type="checkbox"
              checked={upper}
              onChange={(e) => setUpper(e.target.checked)}
            />
            Make it uppercase
          </label>
          <p>
            Hello, <b>{upper ? name.toUpperCase() : name}</b>
          </p>
        </>
      )}
    </>
  );
}