/**
 * * PASSO 1: CRIE O CONTEXTO
 * 
 * Primeiro, você precisa criar o contexto. Você precisará exportá-lo de um arquivo para que seus componentes possam usá-lo:
 * 
 * O único argumento para createContext é o valor padrão . Aqui, 1 refere-se ao maior nível de título, mas você pode passar qualquer tipo de valor (até mesmo um objeto). Você verá a importância do valor padrão na próxima etapa.
*/

import { createContext } from "react";

//criando contexto, usando o createContext, que recebe como argumento um valor padrão, posso passar qualquer tipo de valor até objetos
export const LevelContext = createContext(0);