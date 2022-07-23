import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import searchReducer from "./search/search";
export default combineReducers({
  user: userReducer,
  search: searchReducer,
});
