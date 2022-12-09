import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { IGuest } from "../models/guest";
import { RootState } from "./store";

export const loadGuests = createAsyncThunk<IGuest[]>(
    'guests/loadGuests',
    async () => {
        return await agent.Guests.list();
    }
);

const guestSlice = createSlice({
    name: 'guests',
    initialState: {
        guests: [] as IGuest[],
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadGuests.fulfilled, (state, action) => {
            state.guests = action.payload;
            state.loading = false;
        });
    }
})

export const guestsList = (state: RootState) => state.guestStore.guests;
export const guestsLoading = (state: RootState) => state.guestStore.loading;
export default guestSlice.reducer;