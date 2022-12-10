import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { IService } from "../models/service";
import { RootState } from "./store";

export const loadServices = createAsyncThunk<IService[]>(
    'services/loadServices',
    async () => {
        return await agent.Services.list();
    }
);

export const addService = createAsyncThunk<IService, IService>(
    'services/addService',
    async (service: IService) => {
        return await agent.Services.create(service);
    }
);

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [] as IService[],
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadServices.fulfilled, (state, action) => {
            state.services = action.payload;
            state.loading = false;
        });
        builder.addCase(addService.fulfilled, (state, action) => {
            state.services.push(action.payload);
            state.loading = false;
        });
    }
})

export const servicesList = (state: RootState) => state.serviceStore.services;
export const servicesLoading = (state: RootState) => state.serviceStore.loading;
export default serviceSlice.reducer;