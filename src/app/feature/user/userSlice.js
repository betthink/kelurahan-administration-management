import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {iduser: "", username: "", nik: "", role: "", isLoggin: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.value = action.payload;
    },
    logOut: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
