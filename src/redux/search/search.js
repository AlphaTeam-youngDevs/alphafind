import { actions } from "../action.type";
const INITIAL_STATE = {
  search: null,
};

export default function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
