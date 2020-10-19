import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: [],
  isLoading: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };

    case UserActionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
