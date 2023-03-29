import Task from "./Task1";
import { DataTask } from "./combinando-um-reducer-com-context";

type PropsTaskList = {
  tasks: DataTask[];
  onChangeTask: (task: DataTask) => void;
  onDeleteTask: (taskId: number) => void;
};

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: PropsTaskList) {
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
