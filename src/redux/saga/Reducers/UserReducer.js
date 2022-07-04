import { USER_ADDED, USER_DELETED, USERS_LOADED, USERS_EDITED } from '../Types/UserType'

const initState = {
  isError: false,
  errorMessage: "",
  dataUser: [],
  isLoading: false
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_USERS_SUCCESS":
      console.log("action", action)
      return {
        ...state,
        isLoading: false,
        dataUser: action.payload,
      };
    case "GET_ALL_USER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      case USER_ADDED:
        return {
          ...state,
          dataUser: [...state.dataUser, action.payload]
      }
      case USERS_EDITED:
        return {
          ...state,
          dataUser: [...state.dataUser, action.payload]
        }
      case USER_DELETED:
        const { id } = action
        return state.dataUser.filter(user => user.id !== id)
    default:
      return state;
  }
};

export default UserReducer;
