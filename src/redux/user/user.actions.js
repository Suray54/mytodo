import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const clearUser = () => ({
  type: UserActionTypes.CLEAR_USER,
});
