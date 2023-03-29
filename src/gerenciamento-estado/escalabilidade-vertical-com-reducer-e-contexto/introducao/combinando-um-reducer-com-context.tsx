/**
 * * COMBINANDO UM REDUCER COM CONTEXTO
 *
 * Neste exemplo da introdução aos redutores(reducers), o estado é gerenciado por um redutor(reducer). A função redutor contém toda a lógica de atualização de estado e é declarada na parte inferior deste arquivo:
 */

import { useReducer, useState } from "react";
import AddTask from "./AddTask1";
import TaskList from "../passos-combinar-reducer-e-context/TaskList2";
import TaskList1 from "./TaskList1";

const nextId = 3;

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
  }

  function handleChangeTask(task: DataTask) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList1
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
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
 * Um redutor(reducer) ajuda a manter os manipuladores de eventos curtos e concisos. No entanto, à medida que seu aplicativo cresce, você pode encontrar outra dificuldade. Atualmente, o tasks estado e a dispatch função estão disponíveis apenas no TaskApp componente de nível superior. Para permitir que outros componentes leiam a lista de tarefas ou a alterem, você deve passar explicitamente o estado atual e os manipuladores de eventos que o alteram como props.
 *
 * Em um pequeno exemplo como este, isso funciona bem, mas se você tiver dezenas ou centenas de componentes no meio, transmitir todos os estados e funções pode ser bastante frustrante!
 *
 * É por isso que, como alternativa a passá-los por props, você pode querer colocar o tasksestado e a dispatchfunção em contexto.  Dessa forma, qualquer componente abaixo TaskAppna árvore pode ler as tarefas e despachar ações sem a repetitiva “perfuração de propulsores-props”.
 *
 * Aqui está como você pode combinar um redutor com contexto:
 *
 * Crie(create) o contexto.
 *
 * Coloque(Put) o estado e o despacho(dispacth) no contexto.
 *
 * Use o contexto em qualquer lugar da árvore.
 */
