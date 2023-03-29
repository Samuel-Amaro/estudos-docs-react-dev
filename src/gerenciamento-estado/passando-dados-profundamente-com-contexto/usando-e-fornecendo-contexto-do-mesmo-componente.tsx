/**
 * * USANDO E FORNECENDO CONTEXTO DO MESMO COMPONENTE
 *
 *  Como o contexto permite que você leia as informações de um componente acima, cada um Section pode ler o level que está Section acima e repassar level + 1 automaticamente. Aqui está como você pode fazer isso:
 * 
 * Com essa mudança, você não precisa passar o levelprop para o <Section> ou para o <Heading>:
 */

import "./Style.css";
//importa o hook useContext do react
import { useContext } from "react";
//importa o contexto criado
import { LevelContext } from "./LevelContext";

export default function Page4() {
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

type PropsSection = {
  children: React.ReactNode;
};

export function Section({ children }: PropsSection) {
  //aqui estamos usando(use) e fornecendo(provider) contexto no mesmo componente
  //aqui lemos o level que esta na section acima(que foi provider por uma section pai) por meio de use e podemos repassar isso fornecendo o level + 1 automaticamente
  const level = useContext(LevelContext);
  //PASSO 3: FORNECER(PROVIDER), envolvendo os filhos renderizados por section em um provedor de contexto para fornececr levelcontext a eles
  /**
   * Isso diz ao React: “se algum componente dentro disso <Section> pedir LevelContext, dê a eles isso level.” O componente usará o valor do mais próximo <LevelContext.Provider> na árvore de interface do usuário acima dele.
   */
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
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
 * Agora, ambos Heading e Section leia o LevelContext para descobrir o quão “profundos” eles são. E o Section envolve seus filhos no LevelContext para especificar que qualquer coisa dentro dele está em um nível “mais profundo”.
*/