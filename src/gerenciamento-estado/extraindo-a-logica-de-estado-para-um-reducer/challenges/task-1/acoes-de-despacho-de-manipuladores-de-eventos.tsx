/**
 * * AÇÕES DE DESPACHO DE MANIPULADORES DE EVENTOS
 * 
 * Atualmente, os manipuladores de eventos em ContactList.js e Chat.js possuem // TODO comentários. É por isso que digitar na entrada não funciona e clicar nos botões não altera o destinatário selecionado.
 * 
 * Substitua esses dois // TODOs pelo código dispatch das ações correspondentes. Para ver a forma esperada e o tipo das ações, verifique o redutor em messengerReducer.js. O redutor já está escrito, então você não precisará alterá-lo. Você só precisa despachar as ações em ContactList.js e Chat.js.
*/

import { useReducer } from "react";
import Chat from "./Chat";
import ContactList from "./ContactList";
import { messengerReducer } from "./messageReducer";
import "./StyleTask1.css";

export interface DataContact {
    id: number;
    name: string;
    email: string;
};

export interface DataState {
    selectedId: number;
    message: string;
};

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

const initialState = {
  selectedId: 0,
  message: "Hello",
};

export default function Messenger() {
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

