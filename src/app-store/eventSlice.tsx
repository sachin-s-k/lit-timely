import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "Event",
  initialState: {
    eventData: [],
    effectState: false,
  },
  reducers: {
    addEventData: (state, action) => {
      state.eventData = action.payload;
    },
    clearEventData: (state, action: any) => {
      console.log("called");
      state.eventData = [];
    },
    effectAdd: (state, action) => {
      state.effectState = action.payload;
    },
  },
});
export const { addEventData, clearEventData, effectAdd } = eventSlice.actions;
export default eventSlice.reducer;
