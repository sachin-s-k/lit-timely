import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: {
    userData: null,
  },
  reducers: {
    addUserData: (state, action: any) => {
      console.log("called");

      state.userData = action.payload;
    },
    clearUserData: (state, action: any) => {
      state.userData = action.payload;
    },
  },
});
export const { addUserData, clearUserData } = AuthSlice.actions;
export default AuthSlice.reducer;
