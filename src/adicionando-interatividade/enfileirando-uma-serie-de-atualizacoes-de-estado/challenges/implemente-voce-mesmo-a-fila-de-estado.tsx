/**
 * * IMPLEMENTE VOCÊ MESMO A FILA DE ESTADO
 * 
 *  Neste desafio, você irá reimplementar uma pequena parte do React do zero! Não é tão difícil quanto parece.
 * 
 * Percorra a visualização do sandbox. Observe que ele mostra quatro casos de teste. Eles correspondem aos exemplos que você viu anteriormente nesta página. Sua tarefa é implementar a getFinalStatefunção para que ela retorne o resultado correto para cada um desses casos. Se você implementá-lo corretamente, todos os quatro testes devem passar.
 * 
 * Você receberá dois argumentos: baseStateé o estado inicial (como 0) e queueé uma matriz que contém uma mistura de números (como 5) e funções de atualização (como n => n + 1) na ordem em que foram adicionados.
 * 
 * Sua tarefa é retornar o estado final, assim como mostram as tabelas desta página!
*/

export function getFinalState(baseState: number, queue: []) {
  let finalState = baseState;

  for (const value of queue) {
    if (typeof value === "function") {
      finalState = value(finalState);
    } else if (typeof value === "number") {
      finalState = value;
    }
  }

  return finalState;
}
