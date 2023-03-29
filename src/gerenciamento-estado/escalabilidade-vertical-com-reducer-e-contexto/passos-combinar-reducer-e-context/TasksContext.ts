/**
 * * PASSO 1: CRIAR O CONTEXTO
 * 
 *  o hook useReducer retorna a atual tasks state e a dispatch function que permite despachar uma ação do usuario para um reducer atualizar o state
 * 
 * vamos criar dois contextos separados
 * 
 * TasksContext fornece a lista atual de tarefas.
 * 
 * TasksDispatchContext fornece a função que permite aos componentes despachar ações.
 * 
 * Aqui, você está passando null como valor padrão para ambos os contextos. Os valores reais serão fornecidos pelo TaskApp componente.
*/

import { createContext } from "react";
import { DataTask } from "../introducao/combinando-um-reducer-com-context";
import { ActionType } from "./passos-para-combinar-reducer-e-context";

//criando contextos separados e exportandos-os para que os componentes possam usalos

//criando contexto, usando o createContext, que recebe como argumento um valor padrão, posso passar qualquer tipo de valor até objetos

//este contexto fornece a lista atual de tarefas
export const TasksContext = createContext<DataTask[] | null>(null);

//este contexto fornece a função que permite aos componentes despachar actions do usuario para a function reducer, onde esta definida a logica de atualização do state
export const TasksDispatchContext = createContext<React.Dispatch<ActionType> | null>(null);