import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import images from "./imageUpload";

export default combineReducers({
  auth,
  images,
});
