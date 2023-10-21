/**
 * * ATUALIZANDO UM VALOR VIA CONTEXTO
 *
 *  Neste exemplo, o MyApp componente contém uma variável de estado que é então passada para o ThemeContext provedor. Marcar a caixa de seleção “Modo escuro” atualiza o estado. Alterar o valor fornecido renderiza novamente todos os componentes usando esse contexto.
 *
 * Observe que isso value="dark"passa a "dark"string, mas value={theme}passa o valor da themevariável JavaScript com chaves JSX. As chaves também permitem passar valores de contexto que não são strings.
 */

import { createContext, useContext, useState } from "react";
import "../passando-dados-profundamente-na-arvore/styles.css";

//cria um contexto
const ThemeContext = createContext<string | null>(null);

export default function MyApp2() {
  //Para determinar o valor do contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //definido o provedor de contexto na arvore de componentes
  //para atualizar o contexto combine-o com o state
  //declarar uma variavel de estado no componente pai e passar o estado atual como o valor de contexto para o provedor
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => {
            //aqui atualiza o state que reflete no valor do contexto
            // Se você chamar setTheme para atualizar o theme valor passado ao provedor para o contexto
            setTheme(e.target.checked ? "dark" : "light");
          }}
        />
        Use dark mode
      </label>
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
