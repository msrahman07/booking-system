import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { IAppointmentResponse } from "../models/appointment";
import { IStaff } from "../models/staff";
import { RootState } from "./store";

export const loadStaffs = createAsyncThunk<IStaff[]>(
    'staffs/loadStaffs',
    async () => {
        return await agent.Staffs.list();
    }
);

export const addStaffs = createAsyncThunk<IStaff, IStaff>(
    'staffs/addStaffs',
    async (staff: IStaff) => {
        return await agent.Staffs.create(staff);
    }
);

interface ICompleteTypes {
    appointmentId: number, staffId:number
}

const staffSlice = createSlice({
    name: 'staffs',
    initialState: {
        staffs: [] as IStaff[],
        staff: null! as IStaff,
        loading: true
    },
    reducers: {
        addNewStaffAppointment: (state, {payload}: {payload: IAppointmentResponse} ) => {
            state.staff = state.staffs.filter(s => s.id === payload.staffId)[0];
            state.staff.appointments?.push(payload);
        },
        updateStaffAppointment: (state, {payload}: {payload: IAppointmentResponse} ) => {
            state.staff = state.staffs.filter(s => s.id === payload.staffId)[0];
            state.staff.appointments = state.staff.appointments?.filter(a => a.id !== payload.id);
            state.staff.appointments?.push(payload);
        },
        completeStaffAppointment: (state, {payload}: {payload: ICompleteTypes} ) => {
            state.staff = state.staffs.filter(s => s.id === payload.staffId)[0];
            state.staff.appointments = state.staff.appointments?.filter(a => a.id !== payload.appointmentId);
        },
        // completeStaffAppointment: (state, action: ICompleteTypes) => {
        //     state.staff = state.staffs.filter(s => s.id === action.staffId)[0];
            
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(loadStaffs.fulfilled, (state, action) => {
            state.staffs = action.payload;
            state.loading = false;
        });
        builder.addCase(addStaffs.fulfilled, (state, action) => {
            state.staffs.push(action.payload);
            state.loading = false;
        });
    }
})
export const {addNewStaffAppointment, updateStaffAppointment, completeStaffAppointment} = staffSlice.actions;
export const staffsList = (state: RootState) => state.staffStore.staffs;
export const staffsLoading = (state: RootState) => state.staffStore.loading;
export default staffSlice.reducer;