import { createContext, useContext, useReducer } from "react";

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

export type ActionType =
  | {
      type: "added";
      id: number;
      text: string;
    }
  | { type: "changed"; task: DataTask }
  | { type: "deleted"; id: number };

export type DataTask = { id: number; text: string; done: boolean };

const TasksContext = createContext<
  { id: number; text: string; done: boolean }[] | null
>(null);
const TasksDispatchContext = createContext<React.Dispatch<ActionType> | null>(
  null
);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const contextTasks = useContext(TasksContext);
  if (contextTasks !== null) return contextTasks;
  throw Error("Error in context tasks");
}

export function useTasksDispatch() {
  const contextDispatch = useContext(TasksDispatchContext);
  if (contextDispatch !== null) return contextDispatch;
  throw Error("Error in context dispatch");
}

function tasksReducer(tasks: DataTask[], action: ActionType) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: ");
    }
  }
}
