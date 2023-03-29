/**
 * * CONTEXTO: UMA ALTERNATIVA PARA PASSAR PROPS
 *
 * O contexto permite que um componente pai forneça dados para toda a árvore abaixo dele. Existem muitos usos para o contexto. Aqui está um exemplo. Considere este Heading componente que aceita um level para seu tamanho:
*/

import "./Style.css";

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3}>Sub-heading</Heading>
      <Heading level={4}>Sub-sub-heading</Heading>
      <Heading level={5}>Sub-sub-sub-heading</Heading>
      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
    </Section>
  );
}

type PropsSection = {
  children: React.ReactNode;
};

export function Section({ children }: PropsSection) {
  return <section className="section">{children}</section>;
}

type PropsHeading = {
  level: number;
  children: React.ReactNode;
};

export function Heading({ level, children }: PropsHeading) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error("Unknown level: " + level);
  }
}
