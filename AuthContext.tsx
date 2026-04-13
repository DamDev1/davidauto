'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setCredentials } from '@/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useUpdateProducerStatusMutation } from '@/slices/usersApiSlice';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePhotoUrl?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    updateProducerStatus: (producerId: string, status: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loginMutation, { isLoading }] = useLoginMutation();
    const [update_producerStatus, { isLoading: isUpdatingProducerStatus }] = useUpdateProducerStatusMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const res = await loginMutation({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({
                userInfo: res.admin,
                token: res.accessToken,
                refreshToken: res.refreshToken
            }));
            router.push('/');
        } catch (error) {
            console.error('Failed to set credentials', error);
        }
    };

    const updateProducerStatus = async (producerId: string, status: string) => {
        try {
            await update_producerStatus({ producerId, status }).unwrap();
            alert('Producer status updated successfully');
        } catch (error) {
            console.error('Failed to set credentials', error);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('admin-auth');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading: isLoading || isUpdatingProducerStatus, login, logout, updateProducerStatus}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
