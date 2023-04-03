import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const userid = localStorage.getItem("userid");

const initialState = {
  loggedIn: token ? true : false,
  token: token ? token : null,
  userId: userid ? userid : null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggin: (state, action) => {
      state.loggedIn = true;
      state.userId = action.payload.userid;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userid", action.payload.userId);
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
    },
  },
});

export const { loggin, logout } = userSlice.actions;
export default userSlice.reducer;
