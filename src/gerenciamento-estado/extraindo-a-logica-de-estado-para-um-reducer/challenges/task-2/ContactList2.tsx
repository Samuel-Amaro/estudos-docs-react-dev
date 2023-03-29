import { DataContact } from "./limpar-a-entrada-ao-enviar-uma-mensagem";
import { ActionType } from "./messageReducer2";

type PropsContactList = {
  contacts: DataContact[];
  selectedId: number;
  dispatch: React.Dispatch<ActionType>;
};

export default function ContactList({
  contacts,
  selectedId,
  dispatch,
}: PropsContactList) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({ type: "changed_selection", contactId: contact.id });
              }}
            >
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
