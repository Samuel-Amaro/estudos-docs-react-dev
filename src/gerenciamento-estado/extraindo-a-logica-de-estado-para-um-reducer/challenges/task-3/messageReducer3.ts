import { DataState } from "./restaurar-valores-de-entrada-ao-alternar-entre-guias"

export type ActionType = {type: "changed_selection", contactId: number} | {type: "edited_message", message: string, contactId: number} | {type: "clear_message", contactId: number};

export function messengerReducer(state: DataState, action: ActionType) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
        draftMessage: state.draftMessage.map((dm) => {
            if(dm.contactId === action.contactId) {
              return {
                ...dm,
                message: action.message
              }
            }
            return dm;
          })
      };
    }
    case 'clear_message': {
      return {
        ...state,
         draftMessage: state.draftMessage.map((dm) => {
          if(dm.contactId === action.contactId) {
            return {
              ...dm,
              message: ""
            }
          }
          return dm;
         })
      };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}