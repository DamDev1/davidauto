"use client";

import React, { useState, Suspense } from 'react';
import { motion } from "framer-motion";
import { KeyRound, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import GuestRoute from "@/components/GuestRoute";
import Image from "next/image";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { verifyOtp, resendOtp, isLoading } = useAuth();

    // Get email from query params
    const registeredEmail = searchParams.get('email') || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value.slice(-1);
        setOtp(updated);

        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            (next as HTMLInputElement)?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            (prev as HTMLInputElement)?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!registeredEmail) {
            toast.error("Email is missing. Please try logging in again.");
            return;
        }

        const code = otp.join("");
        if (code.length < 6) {
            toast.error("Please enter the complete 6-digit code.");
            return;
        }
        try {
            await verifyOtp(registeredEmail, code);
            toast.success("Email verified successfully! You can now log in.");
        } catch (err: any) {
            toast.error(err?.data?.message || "Verification failed.");
        }
    };

    const handleResend = async () => {
        if (!registeredEmail) {
            toast.error("Email is missing. Please try logging in again.");
            return;
        }

        setOtp(["", "", "", "", "", ""]);
        try {
            await resendOtp(registeredEmail);
            toast.success("New code sent! Check your email.");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to resend OTP.");
        }
    };

    return (
        <GuestRoute>
            <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden py-12">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop"
                        alt="Premium Luxury Car Interior"
                        fill
                        className="object-cover object-center translate-y-[-10%] sm:translate-y-0"
                        priority
                    />
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm sm:bg-background/60 sm:backdrop-blur-md" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md px-4 mx-auto"
                >
                    <div className="bg-card/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary/30 to-purple-500/20 blur-2xl opacity-50 z-[-1]" />

                        <motion.div
                            key="verify-page"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/20 text-primary mb-4 ring-1 ring-primary/30">
                                    <KeyRound className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Verify your email</h1>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We sent a 6-digit code to<br />
                                    <span className="text-white font-medium">{registeredEmail || "your email"}</span>
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-6">
                                {/* OTP boxes */}
                                <div className="flex justify-center gap-3">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            className="w-12 h-14 text-center text-2xl font-bold border border-border/50 rounded-xl bg-background/50 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all caret-transparent"
                                        />
                                    ))}
                                </div>

                                <button type="submit" disabled={isLoading || !registeredEmail}
                                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <span className="relative flex items-center">
                                        {isLoading ? (
                                            <><svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>Verifying…</>
                                        ) : (<>Verify Email<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>)}
                                    </span>
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-muted-foreground space-y-3">
                                <p>
                                    Didn&apos;t receive the code?{" "}
                                    <button onClick={handleResend} disabled={isLoading || !registeredEmail}
                                        className="font-medium text-white hover:text-primary transition-colors hover:underline underline-offset-4 disabled:opacity-50">
                                        Resend
                                    </button>
                                </p>
                                <button onClick={() => router.push('/login')}
                                    className="text-muted-foreground hover:text-white transition-colors text-xs">
                                    ← Back to login
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </GuestRoute>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
