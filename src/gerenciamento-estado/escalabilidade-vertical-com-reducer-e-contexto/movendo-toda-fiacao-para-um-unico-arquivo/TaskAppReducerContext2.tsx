import { useReducer } from "react";
import TasksProvider from "./TasksContext";
import AddTask3 from "./AddTask3";
import TaskList3 from "./TaskList3";

export const nextId = 3;

export interface DataTask {
  id: number;
  text: string;
  done: boolean;
};

export default function TaskAppReducerContext2() {
  //PASSO 2: FORNECER(PROVIDER), envolvendo os filhos renderizados por app em um provedor de contexto para fornecer a arvore de UI abaixo de app o tasks(estado) e dispatch(uma function dispatch para despachar ações do usuario para o reducer(tasksReducer))
  //fornece tasks, e dispatch retornado do hook useReducer, para a arvore de UI de componentes filhos abaixo de app
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask3 />
      <TaskList3 />
    </TasksProvider>
  );
}

