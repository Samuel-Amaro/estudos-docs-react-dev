/**
 * * ESTADO AO LONGO DO TEMPO
 * 
 *  Bem, isso foi divertido. Tente adivinhar o que ao clicar neste botão irá alertar:
*/

import React, { useState } from "react";

export default function Counter2() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          // Definir o estado apenas o altera para a próxima renderização.
          setNumber(number + 5);
          //alert(number); //0
          setTimeout(() => {
            alert(number);
          }, 3000);
        }}
      >
        +5
      </button>
    </>
  );
}

/**
 * Se você usar o método de substituição anterior, pode adivinhar que o alerta mostra “0”:
 * 
 * Mas e se você colocar um timer no alerta, para que ele só dispare depois que o componente for renderizado novamente? Diria “0” ou “5”? Tenha um palpite!
 * 
 * O estado armazenado no React pode ter mudado no momento em que o alerta é executado, mas foi agendado usando um instantâneo do estado no momento em que o usuário interagiu com ele!
 * 
 * O valor de uma variável de estado nunca muda em uma renderização, mesmo que o código do manipulador de eventos seja assíncrono. Dentro desse render's onClick , o valor de number continua 0 mesmo após setNumber(number + 5)ser chamado. Seu valor foi “fixo” quando o React “tirou o instantâneo” da interface do usuário chamando seu componente.
 * 
 * Aqui está um exemplo de como isso torna seus manipuladores de eventos menos propensos a erros de tempo. Abaixo está um formulário que envia uma mensagem com um atraso de cinco segundos. Imagine este cenário:
 * 
    *  Você pressiona o botão “Enviar”, enviando “Olá” para Alice.
    * 
    * Antes que o atraso de cinco segundos termine, você altera o valor do campo “To” para “Bob”.
    * 
 * O que você espera que o alertmostre? Ele exibiria "Você disse Olá para Alice"? Ou exibiria: “Você disse Olá para Bob”? Faça um palpite com base no que você sabe e tente: 
*/

export function Form() {
    const [to, setTo] = useState('Alice');
    const [message, setMessage] = useState('Hello');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTimeout(() => {
            alert(`You said ${message} to ${to}`);
        }, 5000);
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>
          To:{" "}
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </label>
        <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)}/>
        <button type="submit">Send</button>
      </form>
    );
}

/**
 * O React mantém os valores de estado “fixos” dentro dos manipuladores de eventos de um renderizador. Você não precisa se preocupar se o estado mudou enquanto o código está em execução.
 * 
 * Mas e se você quiser ler o estado mais recente antes de uma nova renderização? Você vai querer usar uma função de atualização de estado , abordada na próxima página!
*/