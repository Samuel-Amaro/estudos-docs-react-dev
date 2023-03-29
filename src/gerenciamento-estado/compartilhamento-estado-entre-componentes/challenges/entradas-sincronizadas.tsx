/**
 * * ENTRADAS SINCRONIZADAS
 *
 *  Estas duas entradas são independentes. Faça com que fiquem sincronizados: editar uma entrada deve atualizar a outra entrada com o mesmo texto e vice-versa.
 */

import React, { useState } from "react";

export default function SyncedInputs() {
  const [text, setText] = useState("");

  function handleChangeInput(text: string) {
    setText(text);
  }

  return (
    <>
      <Input label="First input" text={text} onChange={handleChangeInput} />
      <Input label="Second input" text={text} onChange={handleChangeInput} />
    </>
  );
}

type PropsInput = {
    label: string;
    text: string;
    onChange: (text: string) => void;
};

function Input({ label, text, onChange } : PropsInput) {

  return (
    <label>
      {label} <input value={text} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
