import { useContext, useState } from "react";
import { TasksDispatchContext } from "./TasksContext";
import { nextId } from "./passos-para-combinar-reducer-e-context";

export default function AddTask() {
  const [text, setText] = useState("");
  //PASSO3: usar o contexto fornecido por app em qualquer lugar da arvore de UI
  //use(lendo o valor do TaskDispatchContext) por meio do useContext hook
  const dispatch = useContext(TasksDispatchContext);
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
          if (!dispatch) {
            return;
          }
          //gerenciar o estado com redutores e diferente de definir diretamente o estado
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
        }}
      >
        Add
      </button>
    </>
  );
}
