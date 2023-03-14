import { useState } from "react";
import { DataTask } from "./corrigir-as-mutacoes-usando-metodos-nao-mutativos";

type PropsTaskList = {
  todos: DataTask[];
  onChangeTodo: (nextTodo: DataTask) => void;
  onDeleteTodo: (todoId: number) => void;
};

export default function TaskList({ todos, onChangeTodo, onDeleteTodo } : PropsTaskList) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

type PropsTask = {
  todo: DataTask;
  onChange: (nextTodo: DataTask) => void;
  onDelete: (todoId: number) => void;
};

function Task({ todo, onChange, onDelete } : PropsTask) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChange({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onChange({
            ...todo,
            done: e.target.checked,
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}
