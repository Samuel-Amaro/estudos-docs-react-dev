/**
 * * COMPONENTES DIFERENTES NO MESMO ESTADO DE REDEFINIÇÃO DE POSIÇÃO
 * 
 * Neste exemplo, marcar a caixa de seleção substituirá <Counter> por <p>:
*/

import { useState } from "react";
import Counter from "./estado-esta-vinculado-uma-posicao-na-arvore";
import { Counter2 } from "./mesmo-componente-na-mesma-posicao-preserva-o-estado";
Counter2

export default function WrapperCounter3() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? <p>See you later!</p> : <Counter />}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={(e) => {
            setIsPaused(e.target.checked);
          }}
        />
        Take a break
      </label>
    </div>
  );
}

/**
 * Aqui, você alterna entre diferentes tipos de componentes na mesma posição. Inicialmente, o primeiro filho do <div> continha um arquivo Counter. Mas quando você trocou um p, o React removeu o Counter da árvore da interface do usuário e destruiu seu estado.
 * 
 * Quando Counter muda para p, o Counter é excluído e o p é adicionado
 * 
 * Ao voltar, o p é excluído e o Counter é adicionado
 * 
 * Além disso, quando você renderiza um componente diferente na mesma posição, ele redefine o estado de toda a sua subárvore. Para ver como isso funciona, incremente o contador e marque a caixa de seleção:
*/

export function WrapperCounter4() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter2 isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter2 isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

/**
 * O estado do contador é redefinido quando você clica na caixa de seleção. Embora você renderize a Counter, o primeiro filho das div mudanças de a div para a section. Quando o filho div foi removido do DOM, toda a árvore abaixo dele (incluindo o Counter e seu estado) também foi destruída.
 * 
 * Quando section muda para div, o section é excluído e o novo div é adicionado
 * 
 * Ao voltar, o div é excluído e o novo section é adicionado
 * 
 * Como regra geral, se você deseja preservar o estado entre as novas renderizações, a estrutura da sua árvore precisa “combinar” de uma renderização para outra. Se a estrutura for diferente, o estado é destruído porque o React destrói o estado quando remove um componente da árvore.
*/