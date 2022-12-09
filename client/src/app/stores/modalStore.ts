import { createSlice } from "@reduxjs/toolkit"
import React from "react";
import { RootState } from "./store";

interface IPayload {
  payload: JSX.Element | React.ReactNode;
}
export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
      open: false,
      content: null! as JSX.Element | React.ReactNode,
    },
    reducers: {
      openModal: (state, {payload}: IPayload ) => {
        state.open = true
        state.content = payload
      },
      closeModal: (state) => {
        state.open = false;
        state.content = null!;
      },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
  
export const modalState = (state:RootState) => state.modalStore.open;
export const modalContent = (state:RootState) => state.modalStore.content;
  
export default modalSlice.reducer;