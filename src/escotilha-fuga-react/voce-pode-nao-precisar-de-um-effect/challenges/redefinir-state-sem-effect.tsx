/**
 * * REDEFINIR O STATE SEM EFEITOS
 *
 * Este EditContact componente recebe um objeto de contato com a forma { id, name, email } do savedContact prop. Tente editar os campos de entrada de nome e e-mail. Quando você pressiona Salvar, o botão do contato acima do formulário é atualizado para o nome editado. Quando você pressiona Redefinir, todas as alterações pendentes no formulário são descartadas. Brinque com essa IU para ter uma ideia dela.
 *
 * Quando você seleciona um contato com os botões na parte superior, o formulário é redefinido para refletir os detalhes desse contato. Isso é feito com um Effect dentro EditContact.js. Remova este efeito. Encontre outra maneira de redefinir o formulário quando savedContact.id for alterado.
 */

import { useState, useEffect } from "react";
import "./style.css";

const initialContacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

type DataContact = {
  id: number;
  name: string;
  email: string;
};

export default function ContactManager() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedId, setSelectedId] = useState(0);
  const selectedContact = contacts.filter((c) => c.id === selectedId)[0];

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
      <EditContact savedContact={selectedContact} onSave={handleSave} />
    </div>
  );
}

type PropsContactList = {
  contacts: DataContact[];
  selectedId: number;
  onSelect: (id: number) => void;
};

function ContactList({ contacts, selectedId, onSelect }: PropsContactList) {
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
  savedContact: DataContact;
  onSave: (updateData: DataContact) => void;
};

function EditContact(props: PropsEditContact) {
  //const [name, setName] = useState(savedContact.name);
  //const [email, setEmail] = useState(savedContact.email);
  //const [prevContactId, setPrevContactId] = useState(savedContact.id);

  /*useEffect(() => {
    setName(savedContact.name);
    setEmail(savedContact.email);
  }, [savedContact]);
  */

  /*if (savedContact.id !== prevContactId) {
    setPrevContactId(savedContact.id);
    setName(savedContact.name);
    setEmail(savedContact.email);
  }*/

  return (
    <section>
      <EditForm {...props} key={props.savedContact.id}/>
    </section>
  );
}

function EditForm({ savedContact, onSave }: PropsEditContact) {
     const [name, setName] = useState(savedContact.name);
     const [email, setEmail] = useState(savedContact.email);
    return (
      <>
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
              id: savedContact.id,
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
            setName(savedContact.name);
            setEmail(savedContact.email);
          }}
        >
          Reset
        </button>
      </>
    );
}