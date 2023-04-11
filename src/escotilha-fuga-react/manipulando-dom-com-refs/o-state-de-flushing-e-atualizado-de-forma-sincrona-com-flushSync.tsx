/**
 * * O ESTADO DE DESCARGA(FLUSHING) É ATUALIZADO DE FORMA SINCRONA COM FLUSHSync
 *
 *  Considere um código como este, que adiciona uma nova tarefa e rola a tela até o último filho da lista. Observe como, por algum motivo, sempre rola para o todo que estava logo antes do último adicionado:
 */

//acessando um no dom gerenciado pelo react, para aplicar scroll

//importando o hook useRef
import { useState, useRef } from "react";
import { flushSync } from "react-dom";

type DataTodo = {
  id: number;
  text: string;
};

export default function TodoList() {
  //usando o hook useRef para declarar uma ref dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  const listRef = useRef<HTMLUListElement | null>(null);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function getRef() {
    //lendo o no DOM de <ul> por meio da inputRef.current, logo depois chamando o metodo para aplicar scroll
    //inicialmente ref.current sera null
    if (!listRef.current) {
      throw new Error("Error in ref input");
    }
    return listRef.current;
  }

  function handleAdd() {
    //aqui ha um problema sempre scroll para o penultimo todo antes do ultimo não scroll diretamente para o ultimo todo
    const newTodo = { id: nextId++, text: text };
    setText("");
    //aqui causa um problema porque
    //setTodos não atualiza imediatamente o DOM
    //portanto sempre que eu rolar a lista até o úlitmo elemento a tarefa ainda não foi adicionada
    setTodos([...todos, newTodo]);
    const lc = getRef().querySelector(":last-child") as Element;
    lc.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    //passamos a ref declarada para o no DOM por meio do atributo ref
    //quando o react cria um no dom para o <ul>, o react colocara uma referencia a esse no em ref.current
    //isso diz ao react para colocar o ul no dom em ref.current
    <>
      <button onClick={handleAdd}>Add</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ul ref={listRef}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
const initialTodos: DataTodo[] = [];

for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: "Todo #" + (i + 1),
  });
}

/**
 * No React, as atualizações de estado são enfileiradas. Normalmente, é isso que você deseja. No entanto, aqui causa um problema porque setTodosnão atualiza imediatamente o DOM. Portanto, sempre que você rolar a lista até o último elemento, a tarefa ainda não foi adicionada. É por isso que a rolagem sempre “atrasa” um item.
 *
 * Para corrigir esse problema, você pode forçar o React a atualizar (“flush”) o DOM de forma síncrona. Para fazer isso, importe flushSynce react-domenvolva a atualização de estado em uma flushSync chamada:
 *
 * Isso instruirá o React a atualizar o DOM de forma síncrona logo após a execução do código agrupado em flushSync. Como resultado, o último todo já estará no DOM quando você tentar rolar até ele:
 */

export function TodoList2() {
  //usando o hook useRef para declarar uma ref dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  const listRef = useRef<HTMLUListElement | null>(null);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function getRef() {
    //lendo o no DOM de <ul> por meio da inputRef.current, logo depois chamando o metodo para aplicar scroll
    //inicialmente ref.current sera null
    if (!listRef.current) {
      throw new Error("Error in ref input");
    }
    return listRef.current;
  }

  function handleAdd() {
    //aqui ha um problema sempre scroll para o penultimo todo antes do ultimo não scroll diretamente para o ultimo todo
    const newTodo = { id: nextId++, text: text };
    //para corrigir o problema podemos forcar o react a atualiza "flush" o DOM de forma sincrona
    //envolvemos a atualização de estado em uma flushSync chamada
    //Isso instruirá o React a atualizar o DOM de forma síncrona logo após a execução do código agrupado em flushSync. Como resultado, o último todo já estará no DOM quando você tentar rolar até ele:
    flushSync(() => {
      setText("");
      setTodos([...todos, newTodo]);
    });
    const lc = getRef().querySelector(":last-child") as Element;
    lc.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    //passamos a ref declarada para o no DOM por meio do atributo ref
    //quando o react cria um no dom para o <ul>, o react colocara uma referencia a esse no em ref.current
    //isso diz ao react para colocar o ul no dom em ref.current
    <>
      <button onClick={handleAdd}>Add</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ul ref={listRef}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
