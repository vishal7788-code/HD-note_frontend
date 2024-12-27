import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import noteReducer from "./notesSlice"; 


export const store = configureStore({
  reducer: {
    auth: authReducer,
    note:noteReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
