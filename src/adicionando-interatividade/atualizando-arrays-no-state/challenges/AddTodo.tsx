import { useState } from "react";

type PropsAddTodo = {
    onAddTodo: (title: string) => void;
};

export default function AddTodo({ onAddTodo } : PropsAddTodo) {
  const [title, setTitle] = useState("");
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          setTitle("");
          onAddTodo(title);
        }}
      >
        Add
      </button>
    </>
  );
}
