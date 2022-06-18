import { createSlice } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
    name: "locations",
    initialState: {},
    reducers: {
        addLocation(state, action) {
            state[state.nextLocationId] = action.payload;
        },
        removeLocation(state, action) {
            if (state.hasOwnProperty(action.payload)) {
                delete state.locations[payload.payload];
            }
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = locationsSlice;
// Extract and export each action creator by name
export const { addLocation, removeLocation } = actions;
// Export the reducer, either as a default or named export
export default reducer;