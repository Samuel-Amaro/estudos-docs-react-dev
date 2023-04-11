/**
 * * PREENCHER UMA CADEIA DE CAIXAS DE SELEÇÃO
 *
 *  Neste exemplo, há duas caixas de seleção. Uma caixa de seleção permite que o usuário escolha um planeta. Outra caixa de seleção permite que o usuário escolha um lugar naquele planeta. A segunda caixa ainda não funciona. Sua tarefa é fazer com que ele mostre os lugares do planeta escolhido.
 *
 * Veja como funciona a primeira caixa de seleção. Ele preenche o planetListestado com o resultado da "/planets"chamada de API. O ID do planeta atualmente selecionado é mantido na planetIdvariável de estado. Você precisa descobrir onde adicionar algum código adicional para que a placeListvariável de estado seja preenchida com o resultado da "/planets/" + planetId + "/places"chamada da API.
 *
 * Se você implementar esse direito, a seleção de um planeta deve preencher a lista de lugares. Mudar um planeta deve mudar a lista de lugares.
 */

import { useState, useEffect } from "react";
import { DataPlanet, fetchData } from "./api";
import "./style4.css";
import useSelectionOptions from "./useSelectionOptions";

export default function Page() {
  //const [planetList, setPlanetList] = useState<DataPlanet[]>([]);
  //const [planetId, setPlanetId] = useState("");

  //const [placeList, setPlaceList] = useState<DataPlanet[]>([]);
  //const [placeId, setPlaceId] = useState("");

  /*useEffect(() => {
    let ignore = false;
    fetchData("/planets").then((result) => {
      if (!ignore) {
        console.log("Fetched a list of planets.");
        setPlanetList(result);
        setPlanetId(result[0].id); // Select the first planet
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (planetId.trim() !== "") {
      fetchData("/planets/" + planetId + "/places").then((result) => {
        if (!ignore) {
          console.log("Fetched a list location of planet.");
          setPlaceList(result);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [planetId]);
  */

  const [planetList, planetId, setPlanetId] = useSelectionOptions("/planets");

  const [placeList, placeId, setPlaceId] = useSelectionOptions(
    planetId ? "/planets/" + planetId + "/places" : null
  );

  return (
    <>
      <label>
        Pick a planet:{" "}
        <select
          value={planetId}
          onChange={(e) => {
            setPlanetId(e.target.value);
          }}
        >
          {planetList.map((planet) => (
            <option key={planet.id} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Pick a place:{" "}
        <select
          value={placeId}
          onChange={(e) => {
            setPlaceId(e.target.value);
          }}
        >
          {placeList.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <hr />
      <p>
        You are going to: {placeId || "???"} on {planetId || "???"}{" "}
      </p>
    </>
  );
}
