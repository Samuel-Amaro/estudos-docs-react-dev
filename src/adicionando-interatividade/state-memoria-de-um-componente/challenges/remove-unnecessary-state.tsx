//import { useState } from "react";

/**
 * * Desafio 4 de 4 :Remover estado desnecessário
 * 
 * Quando o botão é clicado, este exemplo deve solicitar o nome do usuário e, em seguida, exibir um alerta cumprimentando-o. Você tentou usar state para manter o nome, mas por algum motivo ele sempre mostra “Hello, !“.
 * 
 * Para corrigir esse código, remova a variável de estado desnecessária. (Discutiremos por que isso não funcionou mais tarde.)
 * 
 * Você pode explicar por que essa variável de estado era desnecessária?
 * @returns 
 */

export default function FeedbackForm() {
  //const [name, setName] = useState("");

  function handleClick() {
    const name = prompt("What is your name?");
    alert(`Hello, ${name}!`);
  }

  return <button onClick={handleClick}>Greet</button>;
}
