"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, ChevronRight, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const CAR_DATA: Record<string, string[]> = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
  Ford: ["Mustang", "F-150", "Explorer", "Escape", "Bronco"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "M4"],
  Mercedes: ["C-Class", "E-Class", "S-Class", "GLE", "G-Wagon"],
  Audi: ["A4", "A6", "Q5", "Q7", "R8"],
  Lexus: ["IS", "ES", "RX", "GX", "LX"],
  Chevrolet: ["Silverado", "Equinox", "Tahoe", "Corvette"],
  Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder"]
};

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 1 - i);
const COLORS = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Brown", "Other"];
const TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Dual-Clutch"];
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-in Hybrid"];
const ENGINE_SIZES = ["1.0L", "1.5L", "2.0L", "2.5L", "3.0L", "4.0L", "5.0L", "5.0L+", "Electric", "Other"];

export default function SellCarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    vin: "",
    color: "",
    transmission: "",
    fuelType: "",
    engineSize: "",
    price: "",
    description: "",
  });
  const { createCar, uploadImages, isLoading } = useAuth();
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(0, 10)); // Max 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 1. Upload Images
      const uploadedUrls = await uploadImages(images) as string[];

      // 2. Submit Listing with URLs
      await createCar({
        ...formData,
        images: uploadedUrls,
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the listing.");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen pt-16 bg-background items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center p-8 rounded-2xl border border-border/50 bg-card"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Listing Submitted!</h2>
          <p className="text-muted-foreground mb-8">
            Your vehicle has been successfully submitted for review. Once
            verified, it will be published to the premium marketplace.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Inventory
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight mb-4 text-center"
          >
            Sell Your Car Direct
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center max-w-lg mx-auto"
          >
            Join Kingdavid's premium marketplace. Zero middlemen, total
            transparency, maximum value.
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-10 shadow-xl overflow-hidden relative min-h-[500px]">
          <form
            className="pb-24"
            onSubmit={
              step === 3
                ? handleSubmit
                : (e) => {
                  e.preventDefault();
                  handleNext();
                }
            }
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold mb-6 text-foreground">
                    Vehicle Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Make
                      </label>
                      <select
                        name="make"
                        required
                        value={formData.make}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                      >
                        <option value="" disabled>Select Make</option>
                        {Object.keys(CAR_DATA).map(make => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Model
                      </label>
                      <select
                        name="model"
                        required
                        disabled={!formData.make}
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none disabled:opacity-50"
                      >
                        <option value="" disabled>Select Model</option>
                        {formData.make && CAR_DATA[formData.make]?.map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Year
                      </label>
                      <select
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                      >
                        <option value="" disabled>Select Year</option>
                        {YEARS.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Mileage
                      </label>
                      <input
                        name="mileage"
                        required
                        type="number"
                        value={formData.mileage}
                        onChange={handleChange}
                        placeholder="e.g. 15000"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        VIN
                      </label>
                      <input
                        name="vin"
                        required
                        type="text"
                        value={formData.vin}
                        onChange={handleChange}
                        placeholder="e.g. WBA0000000000"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Color
                      </label>
                      <select
                        name="color"
                        required
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                      >
                        <option value="" disabled>Select Color</option>
                        {COLORS.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Transmission
                      </label>
                      <select
                        name="transmission"
                        required
                        value={formData.transmission}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                      >
                        <option value="" disabled>Select Transmission</option>
                        {TRANSMISSIONS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Fuel Type
                      </label>
                      <select
                        name="fuelType"
                        required
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                      >
                        <option value="" disabled>Select Fuel Type</option>
                        {FUEL_TYPES.map(ft => (
                          <option key={ft} value={ft}>{ft}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Engine Size
                      </label>
                      <select
                        name="engineSize"
                        required
                        value={formData.engineSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                      >
                        <option value="" disabled>Select Engine Size</option>
                        {ENGINE_SIZES.map(es => (
                          <option key={es} value={es}>{es}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Specs & Pricing */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold mb-6 text-foreground">
                    Specifications & Pricing
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Asking Price ($)
                      </label>
                      <input
                        name="price"
                        required
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 85000"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground text-xl font-bold"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Description
                      </label>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the condition, features, and history of the vehicle..."
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground resize-none"
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Photos */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold mb-6 text-foreground">
                    Upload Photos
                  </h3>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-border/50 bg-secondary/30 flex flex-col items-center justify-center transition-colors hover:border-primary hover:bg-secondary/50 cursor-pointer"
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-foreground font-medium text-sm mb-1">
                      Click to browse or drag & drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upload up to 10 high-resolution images
                    </p>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {images.map((file, index) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-secondary group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-primary/10 text-primary p-4 rounded-xl text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p>
                      High-quality photos significantly increase your chances of
                      a quick sale.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 pt-6 border-t border-border/40 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl flex items-center font-medium hover:bg-secondary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center hover:bg-primary/90 transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 shadow-[0_4px_14px_0_rgba(245,158,11,0.2)]"
              >
                {isLoading ? (
                  "Processing..."
                ) : step < 3 ? (
                  <span className="flex items-center">
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Submit Listing <CheckCircle2 className="w-4 h-4 ml-2" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
