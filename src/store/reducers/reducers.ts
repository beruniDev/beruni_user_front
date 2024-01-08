import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import filter from "./filter";

export default combineReducers({
  filter,
  auth,
});
