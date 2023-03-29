/**
 * Digamos que você queira que vários cabeçalhos dentro do mesmo Section tenham sempre o mesmo tamanho:
 */

import "./Style.css";

export default function Page2() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
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

/**
 * Atualmente, você passa o level prop para cada um <Heading> separadamente:
 
  <Section>
    <Heading level={3}>About</Heading>
    <Heading level={3}>Photos</Heading>
    <Heading level={3}>Videos</Heading>
  </Section>

 * 
 * Seria bom se você pudesse passar o level prop para o <Section> componente e removê-lo do arquivo <Heading>. Dessa forma, você pode impor que todos os títulos na mesma seção tenham o mesmo tamanho:
 
  <Section level={3}>
    <Heading>About</Heading>
    <Heading>Photos</Heading>
    <Heading>Videos</Heading>
  </Section>

 * 
 * Mas como o <Heading> componente pode saber o level prop do seu <Section> mais próximo ? Isso exigiria alguma maneira de uma criança “pedir” dados de algum lugar acima na árvore.
 *  
 * Você não pode fazer isso apenas com adereços(props). É aqui que o contexto entra em jogo. Você fará isso em três etapas:
 * 
  * Crie(create) um contexto. (Você pode chamá-lo de LevelContext, já que é para o nível do cabeçalho.) 
  * 
  * Use(use) esse contexto do componente que precisa dos dados. ( Heading vai usar LevelContext.)
  *  
  * Forneça(Provider) esse contexto do componente que especifica os dados. ( Section fornecerá LevelContext).
  * 
 * O contexto permite que um pai - mesmo distante! - forneça alguns dados para toda a árvore dentro dele.
*/