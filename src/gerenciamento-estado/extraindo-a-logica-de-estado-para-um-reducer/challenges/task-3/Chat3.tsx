import React from "react";
import { DataContact } from "./restaurar-valores-de-entrada-ao-alternar-entre-guias";
import { ActionType } from "./messageReducer3";

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
            contactId: contact.id,
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`sending: "${message}" to ${contact.email}`);
          dispatch({
            type: "clear_message",
            contactId: contact.id,
          });
        }}
      >
        Send to {contact.email}
      </button>
    </section>
  );
}
