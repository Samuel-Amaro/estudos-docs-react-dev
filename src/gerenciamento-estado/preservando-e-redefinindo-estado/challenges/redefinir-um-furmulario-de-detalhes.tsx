/**
 * * REDEFINIR UM FORMULÁRIO DE DETALHES
 * 
 * Esta é uma lista de contatos editável. Você pode editar os detalhes do contato selecionado e pressionar “Salvar” para atualizá-lo ou “Redefinir” para desfazer as alterações.
 * 
 * Quando você seleciona um contato diferente (por exemplo, Alice), o estado é atualizado, mas o formulário continua mostrando os detalhes do contato anterior. Corrija-o para que o formulário seja redefinido quando o contato selecionado for alterado.
*/

import { useState } from "react";

const initialContacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

interface DataContact {
    id: number;
    name: string;
    email: string;
};

export default function ContactManager() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedId, setSelectedId] = useState(0);
  //const selectedContact = contacts.find((c) => c.id === selectedId);
  const selectedContact = contacts.filter((c) => c.id === selectedId);

  function handleSave(updatedData: DataContact) {
    const nextContacts = contacts.map((c) => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
      />
      <hr />
      <EditContact initialData={selectedContact[0]} onSave={handleSave} key={selectedContact[0].id}/>
    </div>
  );
}


type PropsContactList = {
    contacts: DataContact[];
    selectedId: number;
    onSelect: (id: number) => void;
};

export function ContactList({ contacts, selectedId, onSelect } : PropsContactList) {
  return (
    <section>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact.id);
              }}
            >
              {contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

type PropsEditContact = {
    initialData: DataContact;
    onSave: (updatedData: DataContact) => void;
};

export function EditContact({ initialData, onSave } : PropsEditContact) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          const updatedData = {
            id: initialData.id,
            name: name,
            email: email,
          };
          onSave(updatedData);
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          setName(initialData.name);
          setEmail(initialData.email);
        }}
      >
        Reset
      </button>
    </section>
  );
}
