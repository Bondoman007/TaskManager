import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userInfoReducer from "./userInfoSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
  },
});
export default appStore;
