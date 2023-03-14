/**
 * * CORRIGIR AS MUTAÇÕES USANDO MÉTODOS NÃO MUTATIVOS
 * 
 * Neste exemplo, todos os manipuladores de eventos em App.js uso mutação. Como resultado, editar e excluir todos não funciona. Reescreva handleAddTodo, handleChangeTodo, e handleDeleteTodo para usar os métodos não mutativos:
*/

import { useState } from "react";
import AddTodo from "./AddTodo.js";
import TaskList from "./TaskList.js";

const nextId = 3;

export type DataTask = {
    id: number;
    title: string;
    done: boolean;
};

const initialTodos = [
  { id: 0, title: "Buy milk", done: true },
  { id: 1, title: "Eat tacos", done: false },
  { id: 2, title: "Brew tea", done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title: string) {
    setTodos([
      ...todos,
      {id: nextId + 1, title: title, done: false}
    ]);
    /*todos.push({
      id: nextId++,
      title: title,
      done: false,
    });
    */
  }

  function handleChangeTodo(nextTodo: DataTask) {
    setTodos(todos.map((t) => {
      if(t.id === nextTodo.id) {
        return {
          id: t.id,
          title: nextTodo.title,
          done: nextTodo.done
        }
      }
      return t;
    }));
    /*const todo = todos.find((t) => t.id === nextTodo.id);
    if(todo) {
        todo.title = nextTodo.title;
        todo.done = nextTodo.done;
    }*/
  }

  function handleDeleteTodo(todoId: number) {
    /*const index = todos.findIndex((t) => t.id === todoId);
    todos.splice(index, 1);*/
    setTodos(todos.filter((t) => {
      return t.id !== todoId
    }));
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
