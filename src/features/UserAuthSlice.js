import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

const UserAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAuth: (state, action) => {
      state.value = action.payload;
    },
    logoutAuth: (state) => {
      state.value = {};
      localStorage.setItem("authToken", "");
    },
  },
});

export const { loginAuth, logoutAuth } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
