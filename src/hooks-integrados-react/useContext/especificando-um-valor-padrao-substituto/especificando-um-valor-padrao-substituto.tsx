/**
 * * ESPECIFICANDO UM VALOR PADRÃO SUBSTITUTO
 */

import { createContext, useContext, useState } from "react";
import "./styles.css";

//criamos um contexto usando o createContext e especificamos um valor padrão
//o valor padrão nunca muda. para poder atualizar o contexto criar tem que usar com um estado
//para que possa salvar as informações e alteralas usando state
const ThemeContext = createContext("light");

export default function MyApp6() {
  //cria um state para salvar informações e podelas alteralas por meio do contexto
  const [theme, setTheme] = useState("light");
  //Para determinar o valor do contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //definido o provedor de contexto na arvore de componentes
  //para atualizar o contexto combine-o com o state
  //declarar uma variavel de estado no componente pai e passar o estado atual como o valor de contexto para o provedor
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Form />
      </ThemeContext.Provider>
      <Button
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        Toggle theme
      </Button>
    </>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  //useContext é um React Hook que permite ler e assinar o contexto do seu componente.
  //aceita como paramentro o contexto que eu criei anteriormente com o createContext
  //useContext retorna o valor de contexto do componente de chamada
  //useContext retorna o valor do contexto para o contexto que eu passei
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
