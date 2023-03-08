/**
 * * ESTADO É ISOLADO E PRIVADO
 * 
 *  O estado é local para uma instância do componente na tela. Em outras palavras, se você renderizar o mesmo componente duas vezes, cada cópia terá um estado completamente isolado! A alteração de um deles não afetará o outro.
 * 
 * Neste exemplo, o Gallery componente anterior é renderizado duas vezes sem alterações em sua lógica. Tente clicar nos botões dentro de cada uma das galerias. Observe que seu estado é independente:
*/

import GalleryWithMultiplyState from "./dando-a-um-componente-multiplas-variaveis-de-estado";

export default function Page() {
    return (
      <div className="Page">
        <GalleryWithMultiplyState />
        <GalleryWithMultiplyState />
      </div>
    );
}

/**
 * Isso é o que torna o estado diferente das variáveis ​​regulares que você pode declarar no início do seu módulo. O estado não está vinculado a uma chamada de função específica ou a um local no código, mas é “local” para o local específico na tela. Você renderizou dois <Gallery />componentes, então o estado deles é armazenado separadamente.
 * 
 * Observe também como o Pagecomponente não “sabe” nada sobre o Galleryestado ou mesmo se ele possui algum. Ao contrário das props, o estado é totalmente privado para o componente que o declara. O componente pai não pode alterá-lo. Isso permite adicionar estado a qualquer componente ou removê-lo sem afetar o restante dos componentes.
 * 
 * E se você quisesse que ambas as galerias mantivessem seus estados sincronizados? A maneira certa de fazer isso no React é remover o estado dos componentes filho e adicioná-lo ao pai compartilhado mais próximo. As próximas páginas se concentrarão na organização do estado de um único componente, mas retornaremos a esse tópico em Compartilhamento de estado entre componentes.
*/