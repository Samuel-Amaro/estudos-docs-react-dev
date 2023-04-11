/***
 * * TRANSFORME DADOS SEM EFEITOS
 * 
 * A TodoList seguir, é exibida uma lista de todos. Quando a caixa de seleção “Mostrar apenas todos ativos” está marcada, os todos concluídos não são exibidos na lista. Independentemente de quais tarefas estejam visíveis, o rodapé exibe a contagem das tarefas que ainda não foram concluídas.
 * 
 * Simplifique este componente removendo todos os estados e efeitos desnecessários.
*/

import React, { useState, useEffect } from "react";

let nextId = 0;

export const initialTodos = [
  createTodo("Get apples", true),
  createTodo("Get oranges", true),
  createTodo("Get carrots"),
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  /*const [activeTodos, setActiveTodos] = useState<DataTodo[]>([]);*/
  /*const [visibleTodos, setVisibleTodos] = useState<DataTodo[]>([]);*/
  /*const [footer, setFooter] = useState< | null>(null);*/

  const activeTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  /*useEffect(() => {
    setActiveTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);*/

  /*useEffect(() => {
    setVisibleTodos(showActive ? activeTodos : todos);
  }, [showActive, todos, activeTodos]);
  */

  /*useEffect(
    () => setFooter(<footer>{activeTodos.length} todos left</footer>),
    [activeTodos]
  );*/

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>{activeTodos.length} todos left</footer>
    </>
  );
}

type PropsNewTodo = {
    onAdd: (newTodo: DataTodo) => void;
};

function NewTodo({ onAdd } : PropsNewTodo) {
  const [text, setText] = useState("");

  function handleAddClick() {
    setText("");
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
    </>
  );
}

type DataTodo = {
    id: number;
    text: string;
    completed: boolean;
};

function createTodo(text: string, completed = false) {
  return {
    id: nextId++,
    text,
    completed,
  };
}

