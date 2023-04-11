/**
 * * ARMAZENAR EM CACHE UM CÁLCULO SEM EFEITOS
 *
 *
 */

import React, { useState, useEffect, useMemo } from "react";

let nextId = 0;
let calls = 0;

export const initialTodos = [
  createTodo("Get apples", true),
  createTodo("Get oranges", true),
  createTodo("Get carrots"),
];

export default function TodoList2() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState("");
  /*const [visibleTodos, setVisibleTodos] = useState<DataTodo[]>([]);*/

  /*useEffect(() => {
    setVisibleTodos(getVisibleTodos(todos, showActive));
  }, [todos, showActive]);
  */

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, showActive),
    [todos, showActive]
  );

  function handleAddClick() {
    setText("");
    setTodos([...todos, createTodo(text)]);
  }

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
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
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

function getVisibleTodos(todos: DataTodo[], showActive: boolean) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}
