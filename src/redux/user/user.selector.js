import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectLoading = createSelector(
  [selectUser],
  (user) => user.isLoading
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
