/**
 * * RESTAURAR VALORES DE ENTRADA AO ALTERNAR ENTRE GUIAS
 *
 * Isso ocorre porque você não deseja compartilhar um único rascunho de mensagem entre vários destinatários. Mas seria melhor se seu aplicativo “lembrasse” um rascunho para cada contato separadamente, restaurando-os quando você trocar de contato.
 *
 * Sua tarefa é alterar a forma como o estado é estruturado para que você se lembre de um rascunho de mensagem separado por contato . Você precisaria fazer algumas alterações no redutor, no estado inicial e nos componentes.
 */

import { useReducer } from "react";
import Chat from "./Chat3";
import ContactList from "./ContactList3";
import { messengerReducer } from "./messageReducer3";
import "../task-1/StyleTask1.css";

export interface DataContact {
  id: number;
  name: string;
  email: string;
}

type DataDraftMessage = {
  contactId: number;
  message: string;
};

export interface DataState {
  selectedId: number;
  //message: string;
  draftMessage: DataDraftMessage[];
}

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

export const initialState: DataState = {
  selectedId: 0,
  draftMessage: contacts.map((c) => {
    return { contactId: c.id, message: "" };
  }),
};

export default function Messenger3() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.draftMessage.filter(
    (df) => df.contactId === state.selectedId
  )[0].message;
  const contact = contacts.filter((c) => c.id === state.selectedId)[0];
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}
