import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { DataTask } from "../introducao/combinando-um-reducer-com-context";

type PropsTasksProvider = {
  children: React.ReactNode;
};

//criando contextos separados e exportandos-os
//declarações de contexto

//criando contexto, usando o createContext, que recebe como argumento um valor padrão, posso passar qualquer tipo de valor até objetos

//este contexto fornece a lista atual de tarefas
const TasksContext = createContext<DataTask[] | null>(null);

//este contexto fornece a função que permite aos componentes despachar actions do usuario para a function reducer, onde esta definida a logica de atualização do state
const TasksDispatchContext = createContext<React.Dispatch<ActionType> | null>(
  null
);

const initialTasks = [
  { id: 0, text: "Philosopher' Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink Matcha", done: false },
];

/**
 * * MOVENDO TODA A FIAÇÃO PARA UM ÚNICO ARQUIVO
 *
 * Você não precisa fazer isso, mas pode organizar ainda mais os componentes movendo o redutor e o contexto em um único arquivo.
 * @param param0
 */

//este componente ira gerencia o estado com um reducer
//Ele fornecerá ambos os contextos para os componentes abaixo.
//Levará como children um suporte para que você possa passar o JSX para ele.
export default function TasksProvider({ children }: PropsTasksProvider) {
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
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

//exportando functions que usam contexto
//são hooks customizados que leem contexto
//functions de Custom Hooks
export function useTasks() {
    const tasksContext = useContext(TasksContext);
    if(!tasksContext) {
        throw Error("Context tasks error");
    }
    return tasksContext;
}

export function useTasksDispatch() {
    const dispacContext = useContext(TasksDispatchContext);
    if (!dispacContext) {
      throw Error("Context dispatch error");
    }
    return dispacContext;
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