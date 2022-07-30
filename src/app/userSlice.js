import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  toggle: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("uid", action.payload.uid);
      localStorage.setItem("userType", action.payload.userType);
    },
    logout: (state) => {
      state.user = null;
      localStorage.setItem("uid", "");
      localStorage.setItem("userType", "");
    },
    toggleNavs: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, toggleNavs } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const showNav = (state) => state.user.hide;
