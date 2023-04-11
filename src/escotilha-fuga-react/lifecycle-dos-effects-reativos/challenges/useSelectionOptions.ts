import { useEffect, useState } from "react";
import { DataPlanet, fetchData } from "./api";

export default function useSelectionOptions(url: string | null) {
    const [list, setList] = useState<DataPlanet[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");

    useEffect(() => {
        if(!url) {
            return;
        }
        let ignore = false;
        fetchData(url).then((result) => {
        if (!ignore) {
            console.log("Fetched a list of planets.");
            setList(result);
            setSelectedId(result[0].id); // Select the first planet
        }
        });
        return () => {
        ignore = true;
        };
    }, [url]);

    return [list, selectedId, setSelectedId] as const;
}