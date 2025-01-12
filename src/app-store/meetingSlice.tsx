import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "Meeting",
  initialState: {
    meetingData: [],
  },
  reducers: {
    addMeetingData: (state, action) => {
      state.meetingData = action.payload;
    },
    addCancelData: (state: any, action) => {
      const { _id, updates } = action.payload; // MongoDB object ID and updates from the payload
      const meetingIndex: any = state.meetingData.findIndex(
        (meeting: any) => meeting._id === _id
      );

      console.log("callled", meetingIndex, "meeting");

      if (meetingIndex !== -1) {
        state.meetingData[meetingIndex] = {
          ...state.meetingData[meetingIndex], // Spread the existing data
          ...updates, // Apply the updates
        };
      }
    },
  },
});
export const { addMeetingData, addCancelData } = meetingSlice.actions;
export default meetingSlice.reducer;
