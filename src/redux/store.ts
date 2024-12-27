import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import notesSlice from "./notesSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define the persist config for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers (Add more reducers as needed)
const rootReducer = combineReducers({
  auth: authSlice,
  note: notesSlice,
});

// Create persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store and add middleware for serializability check
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Define the types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store and persistor for use in the app
export const persistor = persistStore(store);
export default store;
