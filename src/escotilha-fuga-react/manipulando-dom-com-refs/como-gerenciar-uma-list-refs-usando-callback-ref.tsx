/**
 * * COMO GERENCIAR UMA LISTA DE REFERÊNCIAS(REFS) USANDO UM RETORNO DE CHAMADA(CALLBACK) DE REFERÊNCIA(REFS)
 *
 * Nos exemplos acima, há um número predefinido de refs. No entanto, às vezes você pode precisar de uma referência para cada item da lista e não sabe quantos terá.
 *
 * Isso ocorre porque os Hooks devem ser chamados apenas no nível superior do seu componente. Você não pode chamar useRef em um loop, em uma condição ou dentro de uma map() chamada.
 *
 * Uma maneira possível de contornar isso é obter uma única referência para seu elemento pai e, em seguida, usar métodos de manipulação de DOM como querySelectorAll" encontrar" os nós filhos individuais a partir dele. No entanto, isso é frágil e pode quebrar se a estrutura do DOM for alterada.
 *
 * Outra solução é passar uma função para o ref atributo. Isso é chamado de ref retorno de chamada(CALLBACK REF). O React chamará seu retorno de chamada de referência com o nó DOM quando for a hora de definir a referência e null quando for a hora de limpá-la. Isso permite que você mantenha seu próprio array ou um Map e acesse qualquer ref por seu índice ou algum tipo de ID.
 *
 * Este exemplo mostra como você pode usar essa abordagem para rolar para um nó arbitrário em uma longa lista:
 */

//acessando varios nos dom gerenciado pelo react, para aplicar scroll

//import o useRef hook
import { useRef } from "react";

export default function CatFriends2() {
  //as vezes preciamos de uma referencia para cada item de uma lista e não sabemos quantos tera
  //aqui temos mais de uma unica ref em um componente
  //usando o hook useRef para declarar varias refs dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  //aqui itemsRef não contem um unico no dom, em vez disso ele contem um array de nos dom que referencia 
  const itemsRef = useRef<HTMLLIElement[] | null>(null);

  function scrollToId(itemId: number) {
    //aqui lemos a nossa refItems.current array que armazena a nossa lista de nos dom
    const map = getArray();
    //buscamos o no dom especifico que precisamos
    const node = map.filter((node, index) => index === itemId)[0];
    //aqui adicionamos scroll até o no 
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getArray() {
    //lendo o itemsRef.current por meio da ref paramentro
    //inicialmente ref.current sera null
    if (!itemsRef.current) {
      // Inicialize o array no primeiro uso.
      itemsRef.current = [];
    }
    //retorna um array de refs para nos dom de <li>
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>Tom</button>
        <button onClick={() => scrollToId(5)}>Maru</button>
        <button onClick={() => scrollToId(9)}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, index) => (
            <li
              key={index}
              ref={
                //aqui esta a solução quando temos varios nos dom não predefinidos e não sabemos quantos tera
                //passamos uma callback ref para o proprio ref atributo
                //o react chamara o ref de callback com o no dom quando for a hora de definir a referencia
                //e null quando for a hora de limpá-la
                (node) => {
                    //aqui mantemos um array proprio que armazena os nos dom
                    //podemos acessar qualquer no por meio de index
                    const arr = getArray();
                    if (node) {
                        //adiciona o no no array
                        arr.push(node);
                    } else {
                        //remove o no do array
                        console.log(arr);
                        arr.splice(index, 1);
                        console.log(arr);
                    }
                }
              }
            >
              <img src={cat.imageUrl} alt={"Cat #" + index} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

type DataCat = {
  imageUrl: string;
};

const catList: DataCat[] = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}

/**
 * Neste exemplo, itemsRefnão contém um único nó DOM. Em vez disso, ele contém um mapa do ID do item para um nó DOM. ( As referências podem conter qualquer valor! ) O ref retorno de chamada em cada item da lista cuida para atualizar o Mapa:
 * 
 * Isso permite que você leia os nós DOM individuais do mapa posteriormente.
*/