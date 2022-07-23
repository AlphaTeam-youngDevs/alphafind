import { actions } from "../action.type";
export const searchAction = (state) => ({
  type: actions.SET_SEARCH,
  payload: state,
});
