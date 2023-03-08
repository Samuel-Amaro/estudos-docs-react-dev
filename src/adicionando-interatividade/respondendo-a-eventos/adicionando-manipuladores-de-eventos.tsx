
/**
 * * ADICIONANDO MANIPULADORES DE EVENTOS
 * 
 *  Para adicionar um manipulador de eventos, você primeiro definirá uma função e depois a passará como um prop para a tag JSX apropriada. Por exemplo, aqui está um botão que ainda não faz nada:
*/

export default function Button() {

    //definindo uma function manipuladora do evento
    //essa function sera acionada em resposta as iterações por meio dos eventos
    function handleClick() {
        alert('You clicked me!');
    }

    //passamos a function handleClick como uma prop para o buttom elemento
    return <button type="button" onClick={handleClick}>I don&apos;t do anything</button>;
}

/**
 * Você pode fazer com que mostre uma mensagem quando um usuário clicar seguindo estas três etapas:
 * 
    * Declare uma função chamada handleClick dentro do seu Button componente. 
    * 
    * Implemente a lógica dentro dessa função (use alert para mostrar a mensagem).
    * 
    * Adicione onClick={handleClick} ao <button>JSX.
    * 
 *  Você definiu a handleClick função e a passou como prop para <button>.  handleClick é um manipulador de eventos. Funções do manipulador de eventos:
 * 
    * Geralmente são definidos dentro de seus componentes. 
    * 
    * Tenha nomes que comecem com handle, seguidos do nome do evento.
    * 
 * Por convenção, é comum nomear manipuladores de eventos seguidos handle pelo nome do evento. Muitas vezes você verá onClick={handleClick}, onMouseEnter={handleMouseEnter}, e assim por diante. 
 * 
 * Como alternativa, você pode definir um manipulador de eventos embutido no JSX:
*/ 

/*
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
*/

/**
 * Ou, de forma mais concisa, usando uma função de seta(arrow function):
*/

/*
<button onClick={() => {
  alert('You clicked me!');
}}>
*/

/**
 * Todos esses estilos são equivalentes. Os manipuladores de eventos inline são convenientes para funções curtas.
*/