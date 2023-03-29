/**
 * * EVITE O ESTADO PROFUNDAMENTE ANINHADO
 *
 *  Imagine um plano de viagem composto por planetas, continentes e países. Você pode ficar tentado a estruturar seu estado usando objetos aninhados e arrays, como neste exemplo:
 */

import { useState } from "react";
import { initialTravelPlan } from "./places.js";
import { initialTravelPlanRestruct } from "./place-restruturado.js";

interface TravePlan {
  id: number;
  title: string;
  childPlaces: ChildPlace[];
}

interface ChildPlace {
  id: number;
  title: string;
  childPlaces: ChildPlace[];
}

type PropsPlaceTree = {
  place: ChildPlace;
};

function PlaceTree({ place }: PropsPlaceTree) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map((place) => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState<TravePlan>(initialTravelPlan);
  const planets = plan.childPlaces;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map((place) => (
          <PlaceTree key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}

/**
 * Agora, digamos que você queira adicionar um botão para excluir um lugar que você já visitou. Como você faria isso? Atualizar o estado aninhado envolve fazer cópias de objetos desde a parte que foi alterada. A exclusão de um local profundamente aninhado envolveria a cópia de toda a cadeia de locais pai. Esse código pode ser muito detalhado.
 * 
 * Se o estado estiver muito aninhado para ser atualizado facilmente, considere torná-lo “plano”. Aqui está uma maneira de reestruturar esses dados. Em vez de uma estrutura semelhante a uma árvore onde cada um placetem uma matriz de seus locais filhos , você pode fazer com que cada local contenha uma matriz de seus IDs de locais filhos . Em seguida, você pode armazenar um mapeamento de cada ID de local para o local correspondente.
 * 
 * Essa reestruturação de dados pode lembrá-lo de ver uma tabela de banco de dados:
 * 
 * Agora que o estado é “plano” (também conhecido como “normalizado”), a atualização de itens aninhados se torna mais fácil.
 * 
 * Para remover um local agora, você só precisa atualizar dois níveis de estado:
 * 
 * A versão atualizada de seu local pai deve excluir o ID removido de sua childIds matriz.
 * 
 * A versão atualizada do objeto “tabela” raiz deve incluir a versão atualizada do local pai.
 * 
 * Aqui está um exemplo de como você pode fazer isso:
*/

interface TravePlanRestruct {
    [index: number]: PlaceRestruct;
};

interface PlaceRestruct {
    id: number;
    title: string;
    childIds: number[];
};

export function TravelPlan2() {
  const [plan, setPlan] = useState<TravePlanRestruct>(initialTravelPlanRestruct);

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId];
    // Cria uma nova versão do local pai
    // que não inclui este ID filho.
    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== childId),
    };
    // Atualiza o objeto de estado raiz...
    setPlan({
      ...plan,
      // ...para que tenha o pai atualizado.
      [parentId]: nextParent,
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map((id) => (
          <PlaceTree2
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

type PropsPlaceTree2 = {
  id: number;
  parentId: number;
  placesById: TravePlanRestruct;
  onComplete: (parentId: number, childId: number) => void;
};

function PlaceTree2({ id, parentId, placesById, onComplete } : PropsPlaceTree2) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button
        onClick={() => {
          onComplete(parentId, id);
        }}
      >
        Complete
      </button>
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTree2
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

/**
 * Você pode aninhar o estado o quanto quiser, mas torná-lo “plano” pode resolver vários problemas. Isso torna o estado mais fácil de atualizar e ajuda a garantir que você não tenha duplicação em diferentes partes de um objeto aninhado.
 * 
 * Você pode aninhar o estado o quanto quiser, mas torná-lo “plano” pode resolver vários problemas. Isso torna o estado mais fácil de atualizar e ajuda a garantir que você não tenha duplicação em diferentes partes de um objeto aninhado.
*/