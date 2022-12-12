import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { IAppointmentResponse, IAppointmentRequest } from "../models/appointment";
import { RootState } from "./store";

export const loadAppointments = createAsyncThunk<IAppointmentResponse[]>(
    'appointments/loadAppointments',
    async () => {
        return await agent.Appointments.list();
    }
);

export const loadAppointmentsByDate = createAsyncThunk<IAppointmentResponse[], string>(
    'appointments/loadAppointmentsByDate',
    async (date) => {
        return await agent.Appointments.listByDate(date);
    }
);

export const addAppointment = createAsyncThunk<IAppointmentResponse, IAppointmentRequest>(
    'appointments/addAppointment',
    async (appointment: IAppointmentRequest) => {
        return await agent.Appointments.create(appointment);
    }
);

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [] as IAppointmentResponse[],
        loading: true
    },
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
        });
        builder.addCase(loadAppointmentsByDate.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
        });
        builder.addCase(addAppointment.fulfilled, (state, action) => {
            state.appointments.push(action.payload);
            state.loading = false;
        });
    }
})

export const { setLoadingTrue } = appointmentSlice.actions;
export const appointmentsList = (state: RootState) => state.appointmentStore.appointments;
export const appointmentsLoading = (state: RootState) => state.appointmentStore.loading;
export default appointmentSlice.reducer;