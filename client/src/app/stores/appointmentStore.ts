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

export const updateAppointment = createAsyncThunk<IAppointmentResponse, IAppointmentRequest>(
    'appointments/updateAppointment',
    async (appointment: IAppointmentRequest) => {
        return await agent.Appointments.update(appointment.id!, appointment);
    }
);

export const completeAppointment = createAsyncThunk<boolean, number>(
    'appointments/completeAppointment',
    async (id: number) => {
        return await agent.Appointments.completed(id);
    }
);

export const deleteAppointment = createAsyncThunk<string, number>(
    'appointments/deleteAppointment',
    async (id:number) => {
        return await agent.Appointments.delete(id);
    }
);

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [] as IAppointmentResponse[],
        appointmentsListByDate: [] as IAppointmentResponse[],
        newlyAddedAppointment: null! as IAppointmentResponse,
        loading: true,
        currentDate: new Date()
    },
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setCurrentDate: (state, action) => {
            state.currentDate = action.payload
        },
        removeAppointment: (state, action) => {
            state.appointmentsListByDate = state.appointmentsListByDate.filter(a => a.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
        });
        builder.addCase(loadAppointmentsByDate.fulfilled, (state, action) => {
            state.appointmentsListByDate = action.payload;
            state.loading = false;
        });
        builder.addCase(addAppointment.fulfilled, (state, action) => {
            if(state.currentDate.toString() === action.payload.date.toString()) {
                state.appointmentsListByDate.push(action.payload);
            }
            state.newlyAddedAppointment = action.payload;
            state.loading = false;
        });
        builder.addCase(deleteAppointment.fulfilled, (state, action) => {
        });
        builder.addCase(updateAppointment.fulfilled, (state, action) => {
            state.appointments = state.appointmentsListByDate.filter(a => a.id !== action.payload.id);
            // if(state.currentDate.toString() === action.payload.date.toString()) {
            //     state.appointmentsListByDate.push(action.payload);
            // }
            state.newlyAddedAppointment = action.payload;
            state.loading = false;
        });
        builder.addCase(completeAppointment.fulfilled, (state, action) => {
            // state.appointments = state.appointmentsListByDate.filter(a => a.id !== action.payload.id);
            // if(state.currentDate.toString() === action.payload.date.toString()) {
            //     state.appointmentsListByDate.push(action.payload);
            // }
            // state.newlyAddedAppointment = action.payload;
            state.loading = false;
        });
        builder.addCase(addAppointment.rejected, (state, error) => {
            console.log(error)
        });
    }
})

export const { setLoadingTrue, setCurrentDate, removeAppointment } = appointmentSlice.actions;
export const appointmentsList = (state: RootState) => state.appointmentStore.appointments;
export const appointmentsListByDate = (state: RootState) => state.appointmentStore.appointmentsListByDate;
export const appointmentsLoading = (state: RootState) => state.appointmentStore.loading;
export const newlyAddedAppointment = (state: RootState) => state.appointmentStore.newlyAddedAppointment;
export default appointmentSlice.reducer;