import { actions } from "../action.type";
const INITIAL_STATE = {
  currentUser: null,
  error: "",
  loading: true,
  booked: null,
};
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actions.GOOGLE_SIGN_IN:
    case actions.CREATE_USER:
    case actions.CHOOSE_SCHOOL:
    case actions.UPDATE_USER:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case actions.ON_SUCCESS:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case actions.GOOGLE_SIGN_IN_ERROR:
      return {
        ...state,
        loading: true,
        currentUser: null,
        error: action.payload,
      };
    case actions.SIGN_WITH_EMAIL:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case actions.SIGNED_OUT:
      return {
        ...state,
        currentUser: null,
        error: "",
      };
    case actions.SIGN_IN_SUCCESS:
    case actions.ONLOAD:
      return {
        ...state,
        loading: true,
        currentUser: action.payload,
        error: "",
      };
    case actions.TOGGLE_INFO:
      return {
        ...state,
        error: "",
      };
    case actions.BOOKED_ROOM:
      return {
        ...state,
        booked: actions.payload,
      };
    default:
      return state;
  }
};
