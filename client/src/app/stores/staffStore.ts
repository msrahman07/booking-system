import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { IStaff } from "../models/staff";
import { RootState } from "./store";

export const loadStaffs = createAsyncThunk<IStaff[]>(
    'staffs/loadStaffs',
    async () => {
        return await agent.Staffs.list();
    }
);

const staffSlice = createSlice({
    name: 'staffs',
    initialState: {
        staffs: [] as IStaff[],
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadStaffs.fulfilled, (state, action) => {
            state.staffs = action.payload;
            state.loading = false;
        });
    }
})

export const staffsList = (state: RootState) => state.staffStore.staffs;
export const staffsLoading = (state: RootState) => state.staffStore.loading;
export default staffSlice.reducer;