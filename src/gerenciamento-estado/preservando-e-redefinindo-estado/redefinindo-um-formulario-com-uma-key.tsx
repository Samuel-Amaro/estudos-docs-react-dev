/**
 * * REDEFININDO UM FORMULÁRIO COM UMA KEY
 * 
 *  Redefinir o estado com uma chave é particularmente útil ao lidar com formulários.
 * 
 * Neste aplicativo de bate-papo, o <Chat> componente contém o estado de entrada de texto:
*/

import { useState } from "react";

interface DataContact {
    id: number;
    name: string;
    email: string;
};

type PropsChat = {
    contact: DataContact;
};

export function Chat({ contact } : PropsChat) {
  const [text, setText] = useState("");
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={"Chat to " + contact.name}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

type PropsContactList = {
    selectedContact: DataContact;
    contacts: DataContact[];
    onSelect: (contact: DataContact) => void;
};

export function ContactList({ selectedContact, contacts, onSelect } : PropsContactList) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact);
              }}
            >
              {contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact) => setTo(contact)}
      />
      <Chat contact={to} key={to.id}/>
    </div>
  );
}

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

/**
 * Tente inserir algo na entrada e pressione “Alice” ou “Bob” para escolher um destinatário diferente. Você notará que o estado de entrada é preservado porque o <Chat> é renderizado na mesma posição na árvore.
 * 
 * Em muitos aplicativos, esse pode ser o comportamento desejado, mas não em um aplicativo de bate-papo! Você não deseja permitir que o usuário envie uma mensagem que já digitou para uma pessoa errada devido a um clique acidental. Para corrigi-lo, adicione um key:
 * 
 * Isso garante que, ao selecionar um destinatário diferente, o Chat componente seja recriado do zero, incluindo qualquer estado na árvore abaixo dele. O React também recriará os elementos DOM em vez de reutilizá-los.
*/