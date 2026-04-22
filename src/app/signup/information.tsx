import React from 'react'
import { motion } from "framer-motion";
import { Car, User, Mail, Building2, Lock, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Information({ form, setStep, setForm }: {
    form: any;
    setStep: (step: "form" | "verify") => void;
    setForm: (form: any) => void;
}) {

    const { register, isLoading } = useAuth();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }
        try {
            const fullWhatsapp = form.whatsapp ? `${form.whatsappCode}${form.whatsapp.replace(/^0+/, '')}` : undefined;
            await register(form.fullName, form.email, form.password, form.dealershipName, fullWhatsapp);
            toast.success("Registration successful! Please verify your email.");
            setStep("verify");
        } catch (err: any) {
            toast.error(err?.data?.message || "Registration failed. Please try again.");
        }
    };
    return (
        <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/20 text-primary mb-4 ring-1 ring-primary/30">
                    <Car className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Dealer Account</h1>
                <p className="text-muted-foreground">Join Kingdavid Motors as a dealer</p>
            </div>


            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-muted-foreground" /></div>
                        <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="John Doe" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-muted-foreground" /></div>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="you@example.com" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="dealershipName" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Dealership Name <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Building2 className="h-5 w-5 text-muted-foreground" /></div>
                        <input type="text" id="dealershipName" name="dealershipName" value={form.dealershipName || ''} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Kingdavid Motors Ltd." />
                    </div>
                </div>

                <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1.5">
                        WhatsApp Number <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <div className="flex gap-2">
                        <select
                            name="whatsappCode"
                            value={form.whatsappCode || '+1'}
                            onChange={handleChange}
                            className="w-[80px] block px-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+27">+27</option>
                            <option value="+91">+91</option>
                            <option value="+61">+61</option>
                            <option value="+234">+234</option>
                        </select>
                        <div className="relative flex-1">
                            <input type="text" id="whatsapp" name="whatsapp" value={form.whatsapp || ''} onChange={handleChange}
                                className="block w-full pl-4 pr-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="8012345678" />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-muted-foreground" /></div>
                        <input type="password" id="password" name="password" value={form.password} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Min. 6 characters" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><ShieldCheck className="h-5 w-5 text-muted-foreground" /></div>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-xl bg-background/50 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="••••••••" required />
                    </div>
                </div>

                <div className="pt-2">
                    <button type="submit" disabled={isLoading}
                        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <span className="relative flex items-center">
                            {isLoading ? (
                                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                            ) : (<>Create Account<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>)}
                        </span>
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-white hover:text-primary transition-colors hover:underline underline-offset-4">Sign in now</Link>
            </div>
        </motion.div>
    )
}
