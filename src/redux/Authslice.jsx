import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  isAuthenticated: false,
  token: "",
  persist: false,
};

const Authslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSessionOnly(state, action) {
      const user = action.payload;
      state.currentuser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        image: user.image,
        address: user.address,
      };
      state.token = user.token;
      state.isAuthenticated = true;
      state.persist = false; // Do not persist for session-only login
    },
    loginuser(state, action) {
      const user = action.payload;
      state.currentuser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        image: user.image,
        address: user.address,
      };
      state.token = user.token;
      state.isAuthenticated = true;
      state.persist=true
    },
    logoutuser(state) {
      state.currentuser = null;
      state.isAuthenticated = false;
      state.token = "";
      state.persist=false
    },
  },
});

export const { loginuser, logoutuser, loginSessionOnly } = Authslice.actions;
export default Authslice.reducer;
