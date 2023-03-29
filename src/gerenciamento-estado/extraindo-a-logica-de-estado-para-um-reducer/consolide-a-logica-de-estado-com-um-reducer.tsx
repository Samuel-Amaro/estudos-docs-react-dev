/**
 * * CONSOLIDE A LÓGICA DE ESTADO COM UM REDUTOR(REDUCE)
 *
 * À medida que seus componentes crescem em complexidade, pode ficar mais difícil ver rapidamente todas as diferentes maneiras pelas quais o estado de um componente é atualizado. Por exemplo, o TaskApp componente abaixo contém uma matriz de tasks estado e usa três manipuladores de eventos diferentes para adicionar, remover e editar tarefas:
 */

import { useState } from "react";

const nextId = 3;

const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

interface DataTask {
    id: number;
    text: string;
    done: boolean;
};

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextId + 1,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task: DataTask) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

type PropsAddTask = {
    onAddTask: (text: string) => void;
};

export function AddTask({ onAddTask } : PropsAddTask) {
  const [text, setText] = useState("");
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
}

type PropsTaskList = {
    tasks: DataTask[];
    onChangeTask: (task: DataTask) => void;
    onDeleteTask: (taskId: number) => void;
};

export function TaskList({ tasks, onChangeTask, onDeleteTask } : PropsTaskList) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

type PropsTask = {
  task: DataTask;
  onChange: (task: DataTask) => void;
  onDelete: (taskId: number) => void;
};

function Task({ task, onChange, onDelete } : PropsTask) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}

/**
 * Cada um de seus manipuladores de eventos chama setTasks para atualizar o estado. À medida que esse componente cresce, aumenta também a quantidade de lógica de estado espalhada por ele. Para reduzir essa complexidade e manter toda a sua lógica em um local de fácil acesso, você pode mover essa lógica de estado para uma única função fora do seu componente, chamada de “redutor(reducer)”.
 * 
 * Os redutores são uma maneira diferente de lidar com o estado. Você pode migrar de useState para useReducer em três etapas:
 * 
    * Mude do estado de configuração para ações de despacho(dispatching actions.).
    * 
    * Escreva uma função redutora(reducer function).
    * 
    * Use o redutor(reducer) do seu componente.
*/