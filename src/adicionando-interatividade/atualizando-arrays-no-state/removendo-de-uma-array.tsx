/**
 * * REMOVENDO DE UMA ARRAY 
 * 
 * A maneira mais fácil de remover um item de um array é filtrá-lo . Em outras palavras, você produzirá uma nova array que não conterá esse item. Para fazer isso, use o filter método, por exemplo:
*/

import { useState } from "react";

const initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

export default function List3() {
    const [artists, setArtists] = useState(initialArtists);

    return (
        <>
            <h1>Inspiring sculptors:</h1>
            <ul>
                {
                    artists.map(artist => (
                        <li key={artist.id}>
                            {artist.name}{''}
                            <button onClick={() => {
                                //para remover um item de um array podemos filtra-ló
                                //ira reproduzir um novo array que não contera mais o item
                                setArtists(
                                    //criar uma nova array que tenha artistics que tenha o a.id diferente de artist.id
                                    artists.filter(a => a.id !== artist.id)
                                );
                            }}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

/**
 * 
*/