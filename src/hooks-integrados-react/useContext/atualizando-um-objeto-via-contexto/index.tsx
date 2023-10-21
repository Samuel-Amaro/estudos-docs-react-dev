/**
 * * ATUALIZANDO UM OBJETO VIA CONTEXTO
 *
 * Neste exemplo, existe uma currentUser variável de estado que contém um objeto. Você combina { currentUser, setCurrentUser } em um único objeto e o transmite através do contexto dentro do arquivo value={}. Isso permite que qualquer componente abaixo, como LoginButton, leia ambos currentUser e setCurrentUser e chame setCurrentUser quando necessário.
 *
 */

import { createContext, memo, useCallback, useContext, useState } from "react";

//cria contexto usando createContext
const CurrentUserContext = createContext<{
  currentUser: { name: string } | null;
  setCurrentUser: (user: { name: string }) => void;
} | null>(null);

export default function MyApp3() {
  //cria um state que sera usado no contexto como value
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);
  //Para determinar o valor do contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //definido o provedor de contexto na arvore de componentes
  //para atualizar o contexto combine-o com o state
  //declarar uma variavel de estado no componente pai e passar o estado atual como o valor de contexto para o provedor
  //aqui vamos transmitir um object como value dentro do context
  //isso permite os componentes abaixo ler o valor e atualizar o valor atraves do metodo setCurrentUser por meio do contexto
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
      }}
    >
      <Form />
    </CurrentUserContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {
  //useContext é um React Hook que permite ler e assinar o contexto do seu componente.
  //aceita como paramentro o contexto que eu criei anteriormente com o createContext
  //useContext retorna o valor de contexto do componente de chamada
  //useContext retorna o valor do contexto para o contexto que eu passei
  const contextUser = useContext(CurrentUserContext);

  //aqui atualiza o state que reflete no valor do contexto
  // Se você chamar setCurrentUser para atualizar o user valor passado ao provedor para o contexto
  const handleOnClick = useCallback(() => {
    if (contextUser !== null) contextUser.setCurrentUser({ name: "Advika" });
  }, [contextUser]);

  if (contextUser !== null && contextUser.currentUser !== null) {
    return <p>You logged in as {contextUser.currentUser.name}.</p>;
  }

  return <Button onClick={handleOnClick}>Log in as Advika</Button>;
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      {children}
    </section>
  );
}

const Button = memo(function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
});

/*function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}*/
