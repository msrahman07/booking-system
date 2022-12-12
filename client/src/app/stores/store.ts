import { configureStore } from '@reduxjs/toolkit'
import guestReducer from './guestStore';
import staffReducer from './staffStore';
import serviceReducer from './serviceStore';
import modalReducer from './modalStore';
import appointmentReducer from './appointmentStore';

export const store = configureStore({
    reducer: {
      guestStore: guestReducer,
      staffStore: staffReducer,
      serviceStore: serviceReducer,
      modalStore: modalReducer,
      appointmentStore: appointmentReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch