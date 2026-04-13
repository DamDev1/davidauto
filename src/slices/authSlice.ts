import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    id: string;
    fullName: string;
    email: string;
    role: 'admin';
}

interface AuthState {
    userInfo: UserInfo | null;
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    userInfo: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ userInfo: UserInfo; token: string; refreshToken?: string }>
        ) => {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken || null;

            if (typeof window !== 'undefined') {
                localStorage.setItem('admin-auth', JSON.stringify(state));
            }
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            state.refreshToken = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('admin-auth');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;