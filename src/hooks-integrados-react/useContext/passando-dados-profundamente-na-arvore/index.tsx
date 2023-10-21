import { createContext, useContext } from "react";
import "./styles.css";

/**
 * * PASSANDO DADOS PROFUNDAMENTE NA ÁRVORE
 *
 *
 */

//cria um contexto
const ThemeContext = createContext<string | null>(null);

export default function MyApp1() {
  //Para determinar o valor do contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //definido o provedor de contexto na arvore de componentes
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
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

function Button({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return <button className={className}>{children}</button>;
}
