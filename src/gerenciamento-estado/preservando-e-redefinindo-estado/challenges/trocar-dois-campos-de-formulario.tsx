/**
 * * TROCAR DOIS CAMPOS DE FORMULÁRIO
 *
 * Este formulário permite inserir o nome e o sobrenome. Ele também possui uma caixa de seleção que controla qual campo vai primeiro. Ao marcar a caixa de seleção, o campo “Sobrenome” aparecerá antes do campo “Nome”.
 *
 * Quase funciona, mas há um bug. Se você preencher a entrada “Nome” e marcar a caixa de seleção, o texto permanecerá na primeira entrada (que agora é “Sobrenome”). Corrija-o para que o texto de entrada também se mova quando você inverter a ordem.
 */

import { useState } from "react";

export default function Challenge2() {
  const [reverse, setReverse] = useState(false);
  const checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={(e) => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field label="Last name" key="last-name" />
        <Field label="First name" key="first-name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field label="First name" key="first-name" />
        <Field label="Last name" key="last-name" />
        {checkbox}
      </>
    );
  }
}

type PropsField = {
  label: string;
};

function Field({ label }: PropsField) {
  const [text, setText] = useState("");
  return (
    <label>
      {label}:{" "}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={(e) => setText(e.target.value)}
      />
    </label>
  );
}
