import Image from "./renderizacao-inicial";

/**
 * * ETAPA 2: O REACT RENDERIZA SEUS COMPONENTES
 * 
 *  Depois de acionar uma renderização, o React chama seus componentes para descobrir o que exibir na tela. “Renderização” é o React chamando seus componentes.
 * 
    *  Na renderização inicial, o React chamará o componente raiz.
    * 
    * Para renderizações subsequentes, o React chamará o componente de função cuja atualização de estado acionou a renderização.
    * 
 * Esse processo é recursivo: se o componente atualizado retornar algum outro componente, o React renderizará esse componente em seguida, e se esse componente também retornar algo, ele renderizará esse componente em seguida e assim por diante. O processo continuará até que não haja mais componentes aninhados e o React saiba exatamente o que deve ser exibido na tela.
 * 
 * No exemplo a seguir, o React chamará Gallery()e   Image() várias vezes:
*/

export default function Gallery() {
    return (
      <section>
        <h1>Inspiring Sculptures</h1>
        <Image />
        <Image />
        <Image />
      </section>
    );
}

/**
 * Durante a renderização inicial, o React criará os nós DOM para <section>, <h1> e três <img> tags.
 * 
 * Durante uma nova renderização, o React calculará quais de suas propriedades, se houver, foram alteradas desde a renderização anterior. Ele não fará nada com essa informação até a próxima etapa, a fase de confirmação.
*/