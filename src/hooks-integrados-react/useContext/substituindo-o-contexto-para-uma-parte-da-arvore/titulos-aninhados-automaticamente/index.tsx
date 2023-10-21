import Heading from "./Heading";
import Section from "./Section";
import "./styles.css";

/**
 * * SUBSTITUINDO O CONTEXTO PARA UM PARTE DA ARVORE
 *
 * Você pode substituir o contexto de uma parte da árvore agrupando essa parte em um provedor com um valor diferente.
 *
 * Você pode aninhar e substituir provedores quantas vezes precisar.
 *
 * * TITULOS ANINHADOS AUTOMATICAMENTE
 *
 * Você pode “acumular” informações ao aninhar provedores de contexto. Neste exemplo, o Sectioncomponente controla o LevelContextque especifica a profundidade do aninhamento da seção. Ele lê o LevelContextda seção pai e fornece o LevelContextnúmero aumentado em um para seus filhos. Como resultado, o Headingcomponente pode decidir automaticamente quais das tags <h1>, <h2>, <h3>,…, usar com base em quantos Sectioncomponentes ele está aninhado dentro.
 * @returns
 */

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
