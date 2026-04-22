'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCredentials, logout as logoutAction } from '@/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCarMutation, useLoginMutation, useRegisterMutation, useUploadImagesMutation, useVerifyEmailMutation, useResendOtpMutation, useForgotPasswordMutation } from '@/slices/usersApiSlice';
import toast from 'react-hot-toast';

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
    logout: () => void;
    register: (fullName: string, email: string, password: string, dealershipName: string, whatsapp?: string) => Promise<void>;
    uploadImages: (images: File[]) => Promise<string[]>;
    createCar: (carData: any) => Promise<void>;
    verifyOtp: (email: string, otp: string) => Promise<void>;
    resendOtp: (email: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { userInfo: user, token } = useSelector((state: any) => state.auth);
    const [loginMutation, { isLoading }] = useLoginMutation();
    const [registerMutation, { isLoading: isRegistering }] = useRegisterMutation();
    const [createCarMutation, { isLoading: isCreatingCar }] = useCreateCarMutation();
    const [uploadImagesMutation, { isLoading: isUploadingImages }] = useUploadImagesMutation();
    const [verifyOtpMutation, { isLoading: isVerifyingOtp }] = useVerifyEmailMutation();
    const [resendOtpMutation, { isLoading: isResendingOtp }] = useResendOtpMutation();
    const [forgotPasswordMutation, { isLoading: isForgotPassLoading }] = useForgotPasswordMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('admin-auth');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed.token) {
                        dispatch(setCredentials({
                            userInfo: parsed.userInfo,
                            token: parsed.token,
                            refreshToken: parsed.refreshToken
                        }));
                    }
                } catch (err) {
                    console.error("Failed to parse stored auth", err);
                }
            }
        }
    }, [dispatch]);

    const login = async (email: string, password: string) => {
        try {
            const res = await loginMutation({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({
                userInfo: res.dealer || res.admin,
                token: res.accessToken,
                refreshToken: res.refreshToken
            }));
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error?.data?.message || "Login failed. Please try again.");
            throw error;
        }
    };

    const register = async (fullName: string, email: string, password: string, dealershipName: string, whatsapp?: string) => {
        try {
            await registerMutation({ fullName, email, password, dealershipName, whatsapp }).unwrap();
        } catch (error: any) {
            toast.error(error?.data?.message || "Registration failed. Please try again.");
            throw error;
        }
    };

    const verifyOtp = async (email: string, otp: string) => {
        try {
            await verifyOtpMutation({ email, otp }).unwrap();
            router.push('/login');
        } catch (error: any) {
            toast.error(error?.data?.message || "Verification failed. Please try again.");
            throw error;
        }
    };

    const resendOtp = async (email: string) => {
        try {
            await resendOtpMutation({ email }).unwrap();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to resend OTP. Please try again.");
            throw error;
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await forgotPasswordMutation({ email }).unwrap();
            toast.success("Password reset instructions sent to your email.");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to process request. Please try again.");
            throw error;
        }
    };

    const createCar = async (carData: any) => {
        try {
            await createCarMutation(carData).unwrap();
            router.push('/dashboard/cars')
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create car. Please try again.");
            throw error;
        }
    };

    const uploadImages = async (images: File[]) => {
        try {
            const formData = new FormData();
            images.forEach((image) => formData.append('images', image));
            const result = await uploadImagesMutation(formData).unwrap();
            return result.urls; // From /api/upload-images backend
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to upload images. Please try again.");
            throw error;
        }
    };

    const logout = () => {
        dispatch(logoutAction());
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading: isLoading || isRegistering || isCreatingCar || isUploadingImages || isVerifyingOtp || isResendingOtp || isForgotPassLoading, login, logout, register, createCar, uploadImages, verifyOtp, resendOtp, forgotPassword }}>
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
