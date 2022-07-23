import { createSelector } from "reselect";
const selectCurrentUser = (state) => state.user.currentUser;
export const messageSelector = createSelector(
  [selectCurrentUser],
  (user) => user.messages
);
export const userDetail = createSelector([selectCurrentUser], (user) => user);
const loaderSlice = (state) => state.user;
export const loader = createSelector([loaderSlice], (user) => user.loading);
export const userData = createSelector(
  [loaderSlice],
  (user) => user.currentUser
);
export const message = createSelector([loaderSlice], (user) => user.error);
