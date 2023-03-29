import { useContext } from "react";
import Task from "../introducao/Task1";
import { DataTask } from "../introducao/combinando-um-reducer-com-context";
import { useTasks } from "./TasksContext";
import Task2 from "./Task3";


export default function TaskList() {
  //PASSO3: usar o contexto fornecido por app em qualquer lugar da arvore de UI
  //use(lendo o valor do TaskContext) por meio do useContext hook
  //lendo o contexto atraves de um hook customizado que le conterxto
  const tasksState = useTasks();
  if (!tasksState) {
    return null;
  }
  return (
    <ul>
      {tasksState.map((task) => (
        <li key={task.id}>
          <Task2 task={task} />
        </li>
      ))}
    </ul>
  );
}
