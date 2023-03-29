import { DataState } from "./limpar-a-entrada-ao-enviar-uma-mensagem";

export type ActionType = {type: "changed_selection", contactId: number} | {type: "edited_message", message: string} | {type: "clear_message"};

export function messengerReducer(state: DataState, action: ActionType) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'clear_message': {
      return {
        ...state,
        message: ''
      };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}