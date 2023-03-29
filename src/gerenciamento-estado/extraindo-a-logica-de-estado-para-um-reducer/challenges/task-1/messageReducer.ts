import { DataState } from "./acoes-de-despacho-de-manipuladores-de-eventos";

export type ActionType = {type: "changed_selection", contactId: number} | {type: "edited_message", message: string};

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
    default: {
      throw Error("Unknown action");
    }
  }
}