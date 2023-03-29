/**
 * * LEVANTANDO O ESTADO POR EXEMPLO
 * 
 *  Neste exemplo, um Accordion componente pai renderiza dois Panels separados:
 * 
  Accordion
    Panel
    Panel

 * 
 * Cada Panel componente possui um estado booleano isActive que determina se seu conteúdo é visível.
 * 
 * Pressione o botão Mostrar para ambos os painéis:
*/

import { useState } from "react";

type PropsPanel = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PropsPanel) {
  //cada panel possui seu estado local que determina se o seu conteudo e visivel ou não
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>Show</button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstans largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
        &quot;apple&ldquo; and is often translated as &quot;full of
        apples&ldquo;. In fact, the region surrounding Almaty is thought to be
        the ancestral home of the apple, and the wild{" "}
        <i lang="la">Malus sieversii</i> is considered a likely candidate for
        the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

/**
 * Mas agora digamos que você queira alterá-lo para que apenas um painel seja expandido por vez. Com esse design, expandir o segundo painel deve recolher o primeiro. Como você faria isso?
 * 
 * Para coordenar esses dois painéis, você precisa “elevar seu estado” para um componente pai em três etapas:
 * 
    *  Remova o estado dos componentes filhos.
    * 
    * Passe dados codificados permanentemente do pai comum.
    * 
    * Adicione o estado ao pai comum e passe-o junto com os manipuladores de eventos.
    * 
 * Isso permitirá que o Accordion componente coordene os dois Panel e expanda apenas um de cada vez. 
*/