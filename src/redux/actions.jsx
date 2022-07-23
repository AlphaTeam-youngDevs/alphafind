import { actions } from "./action.type";
export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export const google_signin = (user) => ({
  type: actions.GOOGLE_SIGN_IN,
  payload: user,
});
export const google_sign_success = (message) => ({
  type: actions.ON_SUCCESS,
  payload: message,
});
export const google_sign_error = (message) => ({
  type: actions.GOOGLE_SIGN_IN_ERROR,
  payload: message,
});
export const signWithEmail = (user) => ({
  type: actions.SIGN_WITH_EMAIL,
  payload: user,
});
export const toggleInfo = () => ({
  type: actions.TOGGLE_INFO,
});
export const createUser = (user) => ({
  type: actions.CREATE_USER,
  payload: user,
});
export const onLoad = (user) => ({
  type: actions.ONLOAD,
  payload: user,
});
export const chooseSchool = (school) => ({
  type: actions.CHOOSE_SCHOOL,
  payload: school,
});
export const signOut = () => ({
  type: actions.SIGN_OUT,
});

export const updateuser = (update) => ({
  type: actions.UPDATE_USER,
  payload: update,
});
export const updateBook = (book) => ({
  type: actions.BOOKED_ROOM,
  payload: book,
});
