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

const getStoredAuth = (): AuthState => {
    if (typeof window === 'undefined') return { userInfo: null, token: null, refreshToken: null };
    try {
        const stored = localStorage.getItem('admin-auth');
        return stored ? JSON.parse(stored) : { userInfo: null, token: null, refreshToken: null };
    } catch {
        return { userInfo: null, token: null, refreshToken: null };
    }
};

const initialState: AuthState = getStoredAuth();

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
                // Cleanup legacy keys if any
                localStorage.removeItem('producerDetails');
                localStorage.removeItem('role');
                localStorage.removeItem('userDetails');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;