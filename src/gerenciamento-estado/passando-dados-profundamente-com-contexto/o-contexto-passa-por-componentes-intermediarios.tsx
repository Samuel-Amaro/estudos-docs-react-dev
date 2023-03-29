/**
 * * O CONTEXTO PASSA POR COMPONENTES INTERMEDIARIOS
 * 
 * Você pode inserir quantos componentes quiser entre o componente que fornece contexto e aquele que o utiliza. Isso inclui componentes integrados <div> e componentes que você mesmo pode criar.
 * 
 * Neste exemplo, o mesmo Post componente (com uma borda tracejada) é renderizado em dois níveis de aninhamento diferentes. Observe que o <Heading> interior dele obtém seu nível automaticamente do mais próximo <Section>:
*/

import React, { useContext } from "react";
import { LevelContext } from "./LevelContext";
import "./Style.css";

export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post title="Hello traveller!" body="Read about my adventures." />
      <AllPosts />
    </Section>
  );
}

type PropsHeading = {
    children: React.ReactNode;
};

function Heading({ children } : PropsHeading) {
  //use(usando o context), lendo o contexto, mais recente na arvore de UI
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error("Heading must be inside a Section!");
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

type PropsSection = {
    children: React.ReactNode;
    isFancy?: boolean;
};

function Section({ children, isFancy } : PropsSection) {
  //use(usando o context), lendo o contexto, mais recente acima deste componente na arvore de UI
  const level = useContext(LevelContext);
  //fornecendo(Provider context) para a arvore de UI
  return (
    <section className={"section " + (isFancy ? "fancy" : "")}>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>Posts</Heading>
      <RecentPosts />
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>Recent Posts</Heading>
      <Post title="Flavors of Lisbon" body="...those pastéis de nata!" />
      <Post title="Buenos Aires in the rhythm of tango" body="I loved it!" />
    </Section>
  );
}

type PropsPost = {
    title: string;
    body: string;
};

function Post({ title, body } : PropsPost) {
  return (
    <Section isFancy={true}>
      <Heading>{title}</Heading>
      <p>
        <i>{body}</i>
      </p>
    </Section>
  );
}

/**
 * Você não fez nada de especial para que isso funcionasse. A Sectionespecifica o contexto para a árvore dentro dela, então você pode inserir um <Heading>em qualquer lugar, e ela terá o tamanho correto. Experimente na caixa de areia acima!
 * 
 * Context permite que você escreva componentes que “se adaptam ao ambiente” e se exibem de forma diferente dependendo de onde (ou, em outras palavras, em qual contexto ) eles estão sendo renderizados.
*/