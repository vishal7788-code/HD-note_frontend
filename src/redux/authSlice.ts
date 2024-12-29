import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User type definition
interface User {
  userId: string;
  email: string;
  name?: string;
}

// State structure
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
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set user state
    setUser: (state, action: PayloadAction<User | null>) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = !!user;  // Simplified check for authentication
    },
  },
});

export const { setLoading, setUser} = authSlice.actions;

export default authSlice.reducer;
