import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "Event",
  initialState: {
    eventData: [],
  },
  reducers: {
    addeventData: (state, action) => {
      console.log("called");
      state.eventData = action.payload;
    },
  },
});
export const { addeventData } = eventSlice.actions;
export default eventSlice.reducer;
