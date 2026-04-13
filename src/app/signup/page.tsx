"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Building2, ArrowRight, Car, ShieldCheck, KeyRound } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import GuestRoute from "@/components/GuestRoute";
import Otp from "./otp";
import { toast } from 'react-hot-toast';
import Information from "./information";

type Step = "form" | "verify";

export default function SignupPage() {

    // Step 1 — registration form
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        dealershipName: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [step, setStep] = useState<Step>("form");

    

    return (
        <GuestRoute>
            <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden py-12">
                {/* Background */}
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

                        <AnimatePresence mode="wait">
                            {/* ── STEP 1: Registration Form ── */}
                            {step === "form" && (
                                <Information
                                    form={form}
                                    setStep={setStep}
                                    setForm={setForm}
                                />
                            )}

                            {/* ── STEP 2: OTP Verification ── */}
                            {step === "verify" && (
                                <Otp
                                    form={form}
                                    setStep={setStep}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </GuestRoute>
    );
}
