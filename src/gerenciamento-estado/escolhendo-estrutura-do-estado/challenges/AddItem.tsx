import { useState } from "react";

type PropsAddItem = {
    onAddItem: (title: string) => void;
};

export default function AddItem({ onAddItem }: PropsAddItem) {
  const [title, setTitle] = useState("");
  return (
    <>
      <input
        placeholder="Add item"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          setTitle("");
          onAddItem(title);
        }}
      >
        Add
      </button>
    </>
  );
}
