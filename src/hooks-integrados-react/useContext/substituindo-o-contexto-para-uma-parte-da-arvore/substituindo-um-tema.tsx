/**
 * * SUBSTITUINDO O CONTEXTO PARA UMA PARTE DA ÁRVORE
 *
 *  Você pode substituir o contexto de uma parte da árvore agrupando essa parte em um provedor com um valor diferente.
 *
 * Você pode aninhar e substituir provedores quantas vezes precisar.
 *
 * * SUBSTITUINDO UM TEMA
 *
 * Aqui, o botão dentro de Footer recebe um valor de contexto diferente ( "light") dos botões fora ( "dark").
 */

import { createContext, useContext } from "react";
import "../especificando-um-valor-padrao-substituto/styles.css";

//cria um contexto usando o createContext
const ThemeContext = createContext<string | null>(null);

export default function MyApp7() {
  //Para determinar o valor do contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //definido o provedor de contexto na arvore de componentes
  //definido o valor de contexto aqui sera dark
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
      {/*aqui definimos um novo valor de contexto, substituindo o provider mais proximo acima da arvore de componentes. substituindo o contexto para uma parte da arvore de componentes*/}
      <ThemeContext.Provider value="light">
        <Footer />
      </ThemeContext.Provider>
    </Panel>
  );
}

function Footer() {
  return (
    <footer>
      <Button>Settings</Button>
    </footer>
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
      {title && <h1>{title}</h1>}
      {children}
    </section>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return <button className={className}>{children}</button>;
}
