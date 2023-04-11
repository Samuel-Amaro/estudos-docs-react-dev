/**
 * * OBTENDO UMA REFERÊNCIA(REF) PARA O NODE
 * 
 *  Para acessar um nó DOM gerenciado pelo React, primeiro importe o useRef Hook:
*/

//import { useRef } from 'react';

/**
 * Em seguida, use-o para declarar uma ref dentro do seu componente:
*/

//const myRef = useRef(null);

/**
 * Por fim, passe-o para o nó DOM como o ref atributo:
*/

//<div ref={myRef}>

/**
 * O useRefHook retorna um objeto com uma única propriedade chamada current. Inicialmente, myRef.current será null. Quando o React cria um nó DOM para <div>, o React colocará uma referência a esse nó em myRef.current. Você pode acessar esse nó DOM de seus manipuladores de eventos e usar as APIs de navegador integradas definidas nele.  
*/

// Você pode usar qualquer API do navegador, por exemplo:
//myRef.current.scrollIntoView();