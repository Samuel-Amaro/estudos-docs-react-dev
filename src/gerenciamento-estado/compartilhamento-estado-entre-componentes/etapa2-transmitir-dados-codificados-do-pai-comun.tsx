/**
 * * ETAPA 2: TRANSMITIR DADOS CODIFICADOS DO PAI COMUN
 * 
 *  Para elevar o estado, você deve localizar o componente pai comum mais próximo de ambos os componentes filhos que deseja coordenar:
 * 
 * Accordion (pai comum mais próximo)
    Panel
    Panel
 * 
 * 
 * Neste exemplo, é o Accordion componente. Uma vez que está acima de ambos os painéis e pode controlar seus props, ele se tornará a “fonte da verdade” para qual painel está ativo no momento. Faça o Accordion componente passar um valor codificado de isActive(por exemplo, true) para ambos os painéis:
*/

import { useState } from "react";

type PropsPanel = {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
};

function Panel({ title, children, isActive }: PropsPanel) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button /*onClick={() => setIsActive(true)}*/>Show</button>
      )}
    </section>
  );
}

export default function Accordion2() {
  //elevando o estado (state-up)
  //compartilhamento de estado entre componentes
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstans largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
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
