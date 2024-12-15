import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: {
    userData: null,
  },
  reducers: {
    addUserData: (state, action) => {
      console.log("called");

      state.userData = action.payload;
    },
    clearUserData: (state, action) => {
      state.userData = null;
    },
  },
});
export const { addUserData, clearUserData } = AuthSlice.actions;
export default AuthSlice.reducer;
