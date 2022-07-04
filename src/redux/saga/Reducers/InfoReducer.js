import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { INFO_ADDED, INFO_DELETED, INFOS_LOADED, INFOS_EDITED } from '../Types/InfoType'

const initState = {
  isError: false,
  errorMessage: "",
  dataInfo: [],
  isLoading: false
};

const InfoReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_INFO":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_INFO_SUCCESS":
      return {
        ...state,
        isLoading: false,
        dataInfo: action.payload,
      };
    case "GET_ALL_INFO_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      case INFO_ADDED:
        return {
          ...state,
          dataInfo: [...state.dataInfo, action.info]
      }
      // case INFOS_EDITED:
      //   return {
      //     ...state,
      //     dataCargo: [...state.dataCargo, action.info]
      //   }
        case INFOS_EDITED:
          const contactUpdate = state.dataInfo.filter((contact) =>
            contact.id === action.payload.id
              ? Object.assign(contact, action.payload)
              : contact
          );
          state.dataInfo = contactUpdate;
          return state;
      case INFO_DELETED:
        const { id } = action
        return state.dataInfo.filter(task => task.id !== id)
    default:
      return state;
  }
};

export default InfoReducer;