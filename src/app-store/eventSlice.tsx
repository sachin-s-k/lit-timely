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
      state.eventData = action.payload;
    },
    effectAdd: (state, action) => {
      state.effectState = action.payload;
    },
    deleteEventData: (state: any, action: any) => {
      state.eventData = state.eventData.filter(
        (item: any) => item._id !== action.payload
      );
    },
  },
});
export const { addEventData, clearEventData, effectAdd, deleteEventData } =
  eventSlice.actions;
export default eventSlice.reducer;
