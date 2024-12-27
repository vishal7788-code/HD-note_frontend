import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//  user type
interface User {
  userId: string;
  email: string;
  name?: string;
}

//  state structure
interface AuthState {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log("Setting user:", action.payload);
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;

    },
    

  },
});

export const { setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;
