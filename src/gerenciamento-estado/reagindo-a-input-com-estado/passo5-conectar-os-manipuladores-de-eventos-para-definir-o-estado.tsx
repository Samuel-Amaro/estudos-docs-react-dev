/**
 * * ETAPA 5: CONECTAR OS MANIPULADORES DE EVENTOS PARA DEFINIR O ESTADO
 * 
 *  Por fim, crie manipuladores de eventos para definir as variáveis ​​de estado. Abaixo está o formulário final, com todos os manipuladores de eventos conectados:
*/

import React, { useState } from "react";

export default function Form4() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>That&apos;s right!</h1>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err: any) {
      setStatus("typing");
      if(err instanceof Error) {
        setError(err);
      }
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}

function submitForm(answer: string) {
  // Pretend it's hitting the network.
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}

/**
 * Embora esse código seja mais longo que o exemplo imperativo original, ele é muito menos frágil. Expressar todas as interações como mudanças de estado permite introduzir novos estados visuais posteriormente sem quebrar os existentes. Também permite alterar o que deve ser exibido em cada estado sem alterar a lógica da própria interação.
*/