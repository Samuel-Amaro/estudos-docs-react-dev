import "./Style.css";
//importa o hook useContext do react
import { useContext } from "react";
//importa o contexto criado
import { LevelContext } from "./LevelContext";

/**
 * * PASSO 2: use o contexto
 *
 *
 * @returns
 */

export default function Page3() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

type PropsSection = {
  level: number;
  children: React.ReactNode;
};

export function Section({ level, children }: PropsSection) {
  //PASSO 3: FORNECER(PROVIDER), envolvendo os filhos renderizados por section em um provedor de contexto para fornececr levelcontext a eles
  /**
   * Isso diz ao React: “se algum componente dentro disso <Section> pedir LevelContext, dê a eles isso level.” O componente usará o valor do mais próximo <LevelContext.Provider> na árvore de interface do usuário acima dele.
   */
  return (
    <section className="section">
      <LevelContext.Provider value={level}>{children}</LevelContext.Provider>
    </section>
  );
}

type PropsHeading = {
  children: React.ReactNode;
};

export function Heading({ children }: PropsHeading) {
  //PASSO 2: use(usando o context)
  //lendo o valor level do contexto
  /**
   * useContext é um Gancho. Assim como useState e useReducer, você só pode chamar um Hook imediatamente dentro de um componente React (não dentro de loops ou condições). useContext informa ao React que o Heading componente deseja ler o arquivo LevelContext.
   */
  const level = useContext(LevelContext);
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
 * Se você não fornecer o contexto, o React usará o valor padrão especificado na etapa anterior. Neste exemplo, você especificou 1como argumento para createContext, então useContext(LevelContext)retorna 1, definindo todos esses cabeçalhos como <h1>. Vamos corrigir esse problema fazendo com que cada um Sectionforneça seu próprio contexto.
 *
 * * PASSO 3: FORNEÇA O CONTEXTO
 *
 * É o mesmo resultado do código original, mas não precisou passar o level prop para cada Heading componente! Em vez disso, ele “descobre” seu nível de direção perguntando o mais próximo Section acima:
 * 
    * Você passa um level suporte para o arquivo <Section>. 
    * 
    * Section envolve seus filhos <LevelContext.Provider value={level}>.
    * 
    * Heading pergunta o valor mais próximo LevelContext acima com useContext(LevelContext).
 */
