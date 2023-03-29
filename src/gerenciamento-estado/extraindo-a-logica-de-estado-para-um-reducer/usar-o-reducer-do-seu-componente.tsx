/**
 * * PASSO 3: USAR O REDUCER DO SEU COMPONENTE
 *
 * migrando do useState para useReducer
 * 
 * Finalmente, você precisa conectar o tasksReducer ao seu componente. Importe o useReducerHook do React:
 */

import { useReducer, useState } from "react";

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
}

export default function TaskAppReducer() {
  //const [tasks, setTasks] = useState(initialTasks);
  //conectando a function reducer ao componente
  //o hook use reducer recebe dois argumentos
  //uma function reducer - uma function redutora onde contem a logica de atualizacação de estado que retorna um valor para o react definir como state
  //um state inicial
  //e retorna um valor com estado, e uma function dispatch para despachar ações do usuario para o reducer
  //o hook useReducer e semelhantea a useState devo passar um estado inicial e ele retorna um valor com estado(tasks) e uma maneira de definir o estado a (function dispatch)
  //os dois argumentos que useReducer hook recebe são
  //1. uma reducer function
  //2. um estado inicial
  //o hook retorna
  //um valor com estado(tasks)
  //uma function dispatch para despachar ações do usuario para o reducer(tasksReducer)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    //gerenciar o estado com redutores e diferene de definir diretamente o estado
    //em vez de dizer ao react oque fazer definindo o estado especificamos oque o usuario acabou de fazer despachando acões de seus manipuladores de eventos
    //estamos despachando uma action
    //isso e mais descritivo da intenção do usuario
    //o objeto passado para dispatch como argumento e chaamdo de action, ele pode ter qualquer forma
    //É um objeto JavaScript regular. Você decide o que colocar nele, mas geralmente deve conter as informações mínimas sobre o que aconteceu .
    //Por convenção, é comum dar uma string type que descreva o que aconteceu, e passar qualquer informação adicional em outros campos.
    dispatch(
      //action object
      {
        type: "added", //especifico para componente, um campo que descreve oque aconteceeu para despachar uma ação para atualizar o estado, escolher um nome que diga oque aconteceu
        id: nextId + 1,
        text: text,
        //outros campos vão aqui, para passar informações adicionais
      }
    );

    /*setTasks([
      ...tasks,
      {
        id: nextId + 1,
        text: text,
        done: false,
      },
    ]);
    */
  }

  function handleChangeTask(task: DataTask) {
    dispatch({
      type: "changed",
      task: task,
    });
    /*setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
    */
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
    //setTasks(tasks.filter((t) => t.id !== taskId));
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

export function AddTask({ onAddTask }: PropsAddTask) {
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

export function TaskList({ tasks, onChangeTask, onDeleteTask }: PropsTaskList) {
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

function Task({ task, onChange, onDelete }: PropsTask) {
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
 * Uma função redutora é onde você colocará sua lógica de estado. Ele recebe dois argumentos, o estado atual e o objeto de ação, e retorna o próximo estado
 *
 * O React definirá o estado para o que você retorna do redutor.
 *
 * Para mover sua lógica de configuração de estado de seus manipuladores de eventos para uma função redutora neste exemplo, você irá:
 *
 * Declare o estado atual ( tasks) como o primeiro argumento.
 *
 * Declare o action objeto como o segundo argumento.
 *
 * Retorne o próximo estado do redutor (para o qual o React definirá o estado).
 */

type ActionType =
  | {
      type: "added";
      id: number;
      text: string;
    }
  | { type: "changed"; task: DataTask }
  | { type: "deleted"; id: number };

//reducer function - ou somente reducer
//recebe o state current
//object de action
//retornar o próximo estado para o React definir
function tasksReducer(tasks: DataTask[], action: ActionType) {
  //logica de atualização de estado vai aqui
  //o react definira o estado para oque eu retornar do redutor
  //de acordo com o type da action vamos retorna um valor para o react definir no state
  switch (action.type) {
    //ação de adicionou uma tarefa
    case "added": {
      //retorna todas tarefas existente mais a recem criada
      //o react define o state para este valor
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    //action de modificou uma task
    case "changed": {
      //retorna um array com todas as tarefas incluido a modificada
      return tasks.map((t) => {
        if (t.id === action.task?.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    //action de deletou umma task
    case "deleted": {
      //retorna um array filtrado sem a task excluida
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

/**
 * Como a função redutora usa state ( tasks) como argumento, você pode declará-la fora de seu componente. Isso diminui o nível de indentação e pode facilitar a leitura do código.
 *
 * O código acima usa instruções if/else, mas é uma convenção usar instruções switch dentro de redutores. O resultado é o mesmo, mas pode ser mais fácil ler rapidamente as instruções switch.
 * 
 * Se quiser, você pode até mover o redutor para um arquivo diferente:
 * 
 * A lógica do componente pode ser mais fácil de ler quando você separa interesses como este. Agora, os manipuladores de eventos especificam apenas o que aconteceu ao despachar ações, e a função redutora determina como o estado é atualizado em resposta a eles.
 */
