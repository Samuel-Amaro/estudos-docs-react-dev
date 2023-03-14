/**
 * * ATUALIZANDO UM OBJETO ANINHADO
 *
 *  Considere uma estrutura de objeto aninhada como esta:
 */

/*
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});

 * 
 * Se você quiser atualizar person.artwork.city, está claro como fazer isso com a mutação:
*/

//person.artwork.city = 'New Delhi';

/**
 * Mas no React, você trata o estado como imutável! Para alterar city, primeiro você precisa produzir o novo artwork objeto (pré-preenchido com os dados do anterior) e, em seguida, produzir o novo person objeto que aponta para o novo artwork:
 */

//const nextArtwork = { ...person.artwork, city: 'New Delhi' };
//const nextPerson = { ...person, artwork: nextArtwork };
//setPerson(nextPerson);

/**
 * Ou, escrito como uma única chamada de função:
 */

/*setPerson({
  ...person, // Copy other fields
  artwork: {
    // but replace the artwork
    ...person.artwork, // with the same one
    city: "New Delhi", // but in New Delhi!
  },
});*/

/**
 * Isso fica um pouco prolixo, mas funciona bem para muitos casos:
 */

import React, { useState } from "react";

export default function Form3() {
  const [person, setPerson] = useState({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //atualiza um objeto aninhado
    //copia parte das propriedades e atualiza somente a necessaria, usamos o operador spread ...
    //no react tratamos objetos como imutavel(somente leitura) ou substituimos o objeto por um novo ou copiamos
    setPerson({
      ...person,
      name: e.target.value,
    });
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value,
      },
    });
  }

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value,
      },
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value,
      },
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Image:
        <input
          type="text"
          name="image"
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" by "}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  );
}
