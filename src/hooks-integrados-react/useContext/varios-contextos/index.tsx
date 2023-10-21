/**
 * * VARIOS CONTEXTOS
 *
 *  Neste exemplo, existem dois contextos independentes. ThemeContext fornece o tema atual, que é uma string, enquanto CurrentUserContext mantém o objeto que representa o usuário atual.
 */

import { createContext, memo, useCallback, useContext, useState } from "react";
import "./styles.css";

//cria contextos usando createContext
//aqui temos dois contextos independentes
//aqui e um contexto para tema
const ThemeContext = createContext<string | null>(null);
//aqui e um contexto que mantém um objeto que representta o usuário atual
const CurrentUserContext = createContext<{
  currentUser: { name: string } | null;
  setCurrentUser: (user: { name: string }) => void;
} | null>(null);

export default function MyApp4() {
  //define estados para salvar informações para o contexto no componente superior da arvore de componentes
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);
  //Para determinar o valor do contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //definido o provedor de contexto na arvore de componentes
  //para atualizar o contexto combine-o com o state
  //declarar uma variavel de estado no componente pai e passar o estado atual como o valor de contexto para o provedor
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <WelcomePanel />
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => {
              //aqui atualiza o valor do contexto do tema
              setTheme(e.target.checked ? "dark" : "light");
            }}
          />
          Use dark mode
        </label>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

function WelcomePanel() {
  //useContext é um React Hook que permite ler e assinar o contexto do seu componente.
  //aceita como paramentro o contexto que eu criei anteriormente com o createContext
  //useContext retorna o valor de contexto do componente de chamada
  //useContext retorna o valor do contexto para o contexto que eu passei
  const contextUser = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {contextUser?.currentUser !== null ? <Greeting /> : <LoginForm />}
    </Panel>
  );
}

function Greeting() {
  const contextUser = useContext(CurrentUserContext);
  return <p>You logged in as {contextUser?.currentUser?.name}.</p>;
}

function LoginForm() {
  const contextUser = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName !== "" && lastName !== "";

  const handleClick = useCallback(() => {
    if (contextUser !== null)
      //aqui atualiza o valor do contexto do user
      contextUser.setCurrentUser({
        name: firstName + " " + lastName,
      });
  }, [contextUser, firstName, lastName]);

  return (
    <>
      <label>
        First name{": "}
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{": "}
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button disabled={!canLogin} onClick={handleClick}>
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

const Button = memo(function Button({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
});
