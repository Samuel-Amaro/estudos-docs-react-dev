/**
 * * ETAPA 2: COLOCAR O ESTADO(STATE) E O ENVIO(DISPATCH) NO CONTEXT(CONTEXTO)
 *
 * Agora você pode importar ambos os contextos em seu TaskApp componente. Pegue o task se dispatch devolvido por useReducer()e forneça-os para toda a árvore abaixo:
 *
 * * PASSO 3: USE O CONTEXTO EM QUALQUER LUGAR DA ARVODE DE UI(COMPONENTES FILHOS ANINHADOS)
 *
 * Agora você não precisa passar a lista de tarefas ou os manipuladores de eventos pela árvore:
 */

import { useReducer } from "react";
import TaskList from "./TaskList2";
import { TasksContext, TasksDispatchContext } from "./TasksContext";
import AddTask2 from "./AddTask2";
import TaskList2 from "./TaskList2";

export const nextId = 3;

const initialTasks = [
  { id: 0, text: "Philosopher' Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink Matcha", done: false },
];

export interface DataTask {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskAppReducerContext() {
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

  //PASSO 2: FORNECER(PROVIDER), envolvendo os filhos renderizados por app em um provedor de contexto para fornecer a arvore de UI abaixo de app o tasks(estado) e dispatch(uma function dispatch para despachar ações do usuario para o reducer(tasksReducer))
  //fornece tasks, e dispatch retornado do hook useReducer, para a arvore de UI de componentes filhos abaixo de app
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask2 />
        <TaskList2 tasks={tasks} />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
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

export type ActionType =
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
  //toda logica de atualização de estado vai aqui nesta function reducer
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
 *
 */
