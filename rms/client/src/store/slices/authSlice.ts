// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser as apiRegisterUser } from '../../api/api'; // Import the API function

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null | unknown;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk<User, { name: string; email: string; password: string; role: string }>(
    'auth/registerUser',
    async (userData) => {
        const response = await apiRegisterUser(userData.name, userData.email, userData.password, userData.role);
        return response.data.user; // Adjust based on your API response structure
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("token")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            });
    },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
