import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: null,
  reducers: {
    addUserInfo: (state, action) => {
      return (state = action.payload);
    },
    removeUserInfo: () => {
      return null;
    },
  },
});
export const { addUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
