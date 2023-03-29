/**
 * * LIMPAR A ENTRADA AO ENVIAR UMA MENSAGEM
 *
 * Atualmente, pressionar “Enviar” não faz nada. Adicione um manipulador de eventos ao botão “Enviar” que irá:
 *
 * Mostre um alertcom o e-mail do destinatário e a mensagem
 *
 * Limpe a entrada da mensagem.
 */

import { useReducer } from "react";
import Chat from "./Chat2";
import ContactList from "./ContactList2";
import { messengerReducer } from "./messageReducer2";
import "./StyleTask2.css";

export interface DataContact {
  id: number;
  name: string;
  email: string;
}

export interface DataState {
  selectedId: number;
  message: string;
}

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

const initialState = {
  selectedId: 0,
  message: "Hello",
};

export default function Messenger2() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
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
