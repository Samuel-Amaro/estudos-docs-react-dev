import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";

export default function Section({ children }: { children: React.ReactNode }) {
  //useContext é um React Hook que permite ler e assinar o contexto do seu componente.
  //aceita como paramentro o contexto que eu criei anteriormente com o createContext
  //useContext retorna o valor de contexto do componente de chamada
  //useContext retorna o valor do contexto para o contexto que eu passei
  //le o valor atual do contexto 
  const level = useContext(LevelContext);
  return (
    <section className="section">
      {/*aqui definimos um novo valor de contexto, substituindo o provider mais proximo acima da arvore de componentes. substituindo o contexto para uma parte da arvore de componentes, agrupando parte dessa arvore de componentes em um novo provedor com um valor diferente igual aqui. aqui estamos aninhando e substituindo provedores, obtemos o valor atual do contexto vindo do provider mais proximo acima na arvore de componentes, incremento esse valor em 1, e definidos um valor provider com um novo valor, para que um pedaço da arvore de componentes tenha um valor de contexto diferente, susbtituindo o contexto anterior acima mais proximo na arvore*/}
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
