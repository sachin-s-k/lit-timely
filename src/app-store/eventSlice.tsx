import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "Event",
  initialState: {
    eventData: [],
    effectState: false,
    deleteState: false,
    deleteEventIds: [] as string[],
    categoryData: [] as string[], // Ensure it's initialized as an array
  },
  reducers: {
    addEventData: (state, action) => {
      state.eventData = action.payload;
    },
    clearEventData: (state, action: any) => {
      state.eventData = action.payload;
    },
    effectAdd: (state, action) => {
      state.effectState = action.payload;
    },

    changeDeleteState: (state: any, action: any) => {
      state.deleteState = action.payload;
    },
    addDeleteEventIds: (state, action: { payload: string }) => {
      // Ensure deleteEventIds is always an array before updating
      if (!Array.isArray(state.deleteEventIds)) {
        state.deleteEventIds = [];
      }

      // Add new event ID to the array
      state.deleteEventIds = [...state.deleteEventIds, action.payload];
    },
    removeDeleteEventIds: (state, action: { payload: string[] }) => {
      if (state.deleteEventIds) {
        const idsToRemove = action.payload; // Expecting an array of IDs to remove
        state.deleteEventIds = state.deleteEventIds.filter(
          (id: string) => !idsToRemove.includes(id) // Keep IDs not in the array
        );
      }
    },
    clearDeletedEvents: (state: any, action: any) => {
      const removedIds = [...state.deleteEventIds]; // Copy the array elements before clearing
      state.deleteEventIds = []; // Clear the array
      action.payload = removedIds; // Optionally pass the removed IDs to the action payload if needed
    },

    // addCategory: (state: any, action: { payload: string | string[] }) => {
    //   if (state.categoryData) {
    //     // Ensure payload is always treated as an array
    //     const categoriesToAdd = Array.isArray(action.payload)
    //       ? action.payload
    //       : [action.payload];

    //     // Combine the existing and new categories, then remove duplicates
    //     state.categoryData = Array.from(
    //       new Set([...state.categoryData, ...categoriesToAdd])
    //     );
    //   } else {
    //     // Initialize categoryData with unique categories
    //     state.categoryData = Array.isArray(action.payload)
    //       ? Array.from(new Set(action.payload))
    //       : [action.payload];
    //   }
    // },

    addCategory: (state: any, action: { payload: string[] }) => {
      if (state.categoryData) {
        // Merge existing categories with the new array, ensuring uniqueness
        state.categoryData = action.payload;
      } else {
        // Initialize categoryData with the new array of categories
        state.categoryData = Array.from(new Set(action.payload));
      }
    },
    clearCategories: (state: any) => {
      state.categoryData = [];
    },
  },
});

export const {
  addEventData,
  clearEventData,
  effectAdd,
  changeDeleteState,
  addDeleteEventIds,
  removeDeleteEventIds,
  clearDeletedEvents,
  addCategory,
  clearCategories,
} = eventSlice.actions;

export default eventSlice.reducer;
