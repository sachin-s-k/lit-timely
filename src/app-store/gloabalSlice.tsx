import { createSlice } from "@reduxjs/toolkit";

const GlobalSlice = createSlice({
  name: "Gloabalslice",
  initialState: {
    activeNav: 0,
  },
  reducers: {
    addActiveNavState: (state, action: any) => {
      console.log("called");

      state.activeNav = action.payload;
    },
  },
});
export const { addActiveNavState } = GlobalSlice.actions;
export default GlobalSlice.reducer;
