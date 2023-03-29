import { useContext, useState } from "react";
import { useTasksDispatch } from "./TasksContext";
import { DataTask } from "../introducao/combinando-um-reducer-com-context";

type PropsTask = {
  task: DataTask;
};

export default function Task({ task }: PropsTask) {
  const [isEditing, setIsEditing] = useState(false);
  //PASSO3: usar o contexto fornecido por app em qualquer lugar da arvore de UI
  //use(lendo o valor do TaskDispatchContext) por meio do useContext hook
  //lendo o contexto atraves de um hook customizado que le conterxto
  const dispatch = useTasksDispatch();

  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            if (!dispatch) {
              return;
            }
            //em vez de dizer ao react oque fazer definindo o estado especificamos oque o usuario acabou de fazer despachando acões de seus manipuladores de eventos
            //estamos despachando uma action, que o usuario acabou de fazer, para a function dispatch, passando um objeto action,
            //dispatch para despachar ações do usuario para o reducer(tasksReducer), onde esta a definido a logica de atualização de estado
            //despachamos a ação de modificou uma task para ser atualizada
            dispatch({
              type: "changed",
              task: { ...task, text: e.target.value },
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
          if (!dispatch) return;
          //despacha mais uma action do usuario para o reducer, para modificar uma task
          dispatch({
            type: "changed",
            task: { ...task, done: e.target.checked },
          });
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          if (!dispatch) return;
          //despacha mais uma ação do usuario para o reduceer, para deletar uma task
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}
