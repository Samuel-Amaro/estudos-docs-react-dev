import { DataContact } from "./restaurar-valores-de-entrada-ao-alternar-entre-guias";
import { ActionType } from "./messageReducer3";

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
