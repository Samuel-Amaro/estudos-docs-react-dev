import { useContext } from "react";
import Task from "../introducao/Task1";
import { DataTask } from "../introducao/combinando-um-reducer-com-context";
import { TasksContext } from "./TasksContext";
import Task2 from "./Task2";

type PropsTaskList = {
  tasks: DataTask[];
};

export default function TaskList({ tasks }: PropsTaskList) {
  //PASSO3: usar o contexto fornecido por app em qualquer lugar da arvore de UI
  //use(lendo o valor do TaskContext) por meio do useContext hook
  const tasksState = useContext(TasksContext);
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
