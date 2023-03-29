import React from "react";
import { DataContact } from "./acoes-de-despacho-de-manipuladores-de-eventos";
import { ActionType } from "./messageReducer";

type PropsChat = {
  contact: DataContact;
  message: string;
  dispatch: React.Dispatch<ActionType>;
};

export default function Chat({ contact, message, dispatch }: PropsChat) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={"Chat to " + contact.name}
        onChange={(e) => {
          dispatch({
            type: "edited_message",
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
