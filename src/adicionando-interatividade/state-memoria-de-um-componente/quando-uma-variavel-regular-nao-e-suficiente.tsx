import { sculptureList } from "./data";

/**
 * * QUANDO UMA VARIÁVEL REGULAR NÃO É SUFICIENTE
 *
 *  Aqui está um componente que renderiza uma imagem de escultura. Clicar no botão “Avançar” deve mostrar a próxima escultura, alterando o indexpara 1, depois para 2, e assim por diante. No entanto, isso não funcionará (você pode tentar!):
 */

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];

  return (
    <>
      <button type="button" onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}

/**
 * O handle Click manipulador de eventos está atualizando uma variável local, index. Mas duas coisas impedem que essa mudança seja visível:
 *
 * Variáveis ​​locais não persistem(salvam) entre as renderizações. Quando o React renderiza esse componente uma segunda vez, ele o renderiza do zero - não considera nenhuma alteração nas variáveis ​​locais.
 * 
 * As alterações nas variáveis ​​locais não acionarão as renderizações. O React não percebe que precisa renderizar o componente novamente com os novos dados.
 * 
 * Para atualizar um componente com novos dados, duas coisas precisam acontecer:
 * 
    * Reter os dados entre as renderizações.
    * 
    * Acione o React para renderizar o componente com novos dados (re-renderização).
    * 
    * O useState Gancho fornece essas duas coisas:
    * 
        * Uma variável de estado para reter os dados entre as renderizações.
        * 
        * Uma função de configuração de estado para atualizar a variável e acionar o React para renderizar o componente novamente.
 */
