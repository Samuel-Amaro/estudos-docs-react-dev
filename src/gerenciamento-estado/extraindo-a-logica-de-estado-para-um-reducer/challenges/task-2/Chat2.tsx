import React from "react";
import { DataContact } from "./limpar-a-entrada-ao-enviar-uma-mensagem";
import { ActionType } from "./messageReducer2";

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
      <button onClick={() => {
        alert(`email: ${contact.email} / message: ${message}`);
        dispatch({
          type: "clear_message"
        })
      }}>Send to {contact.email}</button>
    </section>
  );
}
