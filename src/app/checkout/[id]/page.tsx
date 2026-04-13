"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// Reuse mock data shape for checkout view
const MOCK_CAR = {
  make: "Mercedes-Benz",
  model: "G-Class AMG G 63",
  year: 2023,
  price: 185000,
  image:
    "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop",
};

export default function CheckoutPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // In a real app we'd fetch actual car details by ID
  const car = MOCK_CAR;
  const depositAmount = car.price * 0.01; // 1% deposit to secure

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen pt-16 bg-background items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center p-8 md:p-12 rounded-2xl border border-border/50 bg-card"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Vehicle Secured!</h2>
          <p className="text-muted-foreground mb-4">
            Congratulations, your ${depositAmount.toLocaleString()} fully
            refundable deposit for the {car.year} {car.make} {car.model} is
            confirmed.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            The seller has been notified and the vehicle is now marked as
            secure. A Kingdavid Concierge will contact you within 24 hours to
            arrange final payment and delivery.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Return to Inventory
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-background">
      <div className="relative py-12 border-b border-border/50 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">
            Secure Checkout
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" /> Encrypted and Secure
            connection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Checkout Form (Left side 3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-8"
          >
            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Buyer Info */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-border/40 pb-4">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                    1
                  </span>
                  Buyer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-border/40 pb-4">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                    2
                  </span>
                  Deposit Payment
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Place a fully refundable 1% deposit to temporarily hold this
                  vehicle while we verify your details and arrange the final
                  transaction.
                </p>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                      <span>Card Number</span>
                      <CreditCard className="w-4 h-4" />
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Expiry Date
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                        <span>CVC</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                {loading
                  ? "Processing Securely..."
                  : `Pay $${depositAmount.toLocaleString()} Deposit Securely`}
                {!loading && <ChevronRight className="w-5 h-5" />}
              </button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pb-8">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Kingdavid Buyer Guarentee included
              </div>
            </form>
          </motion.div>

          {/* Order Summary (Right side 2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 bg-card rounded-2xl border border-border/50 p-6 shadow-xl overflow-hidden">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="flex gap-4 mb-6 pb-6 border-b border-border/40">
                <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={car.image}
                    alt={car.model}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">
                    {car.year} {car.make} {car.model}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    VIN: WBA1234567890XYZ
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border/40 text-sm">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Vehicle Listing Price</span>
                  <span>${car.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Documentation Fee</span>
                  <span>$250</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Estimated Taxes (Calculated later)</span>
                  <span>TBD</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-lg font-bold">
                    Total Deposit Due Today
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Fully refundable 1% deposit
                  </p>
                </div>
                <span className="text-2xl font-bold text-primary">
                  ${depositAmount.toLocaleString()}
                </span>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 text-xs text-muted-foreground leading-relaxed">
                By clicking "Pay Deposit Securely", you agree to our Terms of
                Service and Privacy Policy. The $1,850.00 deposit is fully
                refundable if the physical inspection does not meet the
                specified condition report.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
