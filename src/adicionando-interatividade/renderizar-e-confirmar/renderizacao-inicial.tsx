/**
 * * RENDERIZAÇÃO INICIAL
 * 
 *  Quando seu aplicativo é iniciado, você precisa acionar a renderização inicial. Às vezes, frameworks e sandboxes ocultam esse código, mas isso é feito chamando createRoot com o nó DOM de destino e, em seguida, chamando seu render método com seu componente:
*/

export default function Image() {
    return (
      <img
        src="https://i.imgur.com/ZF6s192.jpg"
        alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
      />
    );
}