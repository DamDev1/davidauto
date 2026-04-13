"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    price: "",
    mileage: "",
    transmission: "Automatic",
    fuelType: "Gasoline",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard/cars");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/cars"
          className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Vehicle</h1>
          <p className="text-muted-foreground">
            List a new car on the Kingdavid marketplace.
          </p>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground/90">
              Vehicle Photos
            </h2>
            <div className="border-2 border-dashed border-border/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-medium mb-1">
                Upload High-Quality Images
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Drag and drop or click to select photos. First image will be the
                cover. Max 10 images.
              </p>
              <button
                type="button"
                className="px-6 py-2 rounded-xl bg-background border border-border/50 font-medium hover:bg-secondary transition-colors"
              >
                Browse Files
              </button>
            </div>
          </section>

          <div className="h-px bg-border/50 w-full" />

          {/* Basic Details Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground/90">
              Basic Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="make"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  required
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="e.g. Porsche, Mercedes-Benz"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="model"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. 911 Carrera, G-Class"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="year"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="250000"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-border/50 w-full" />

          {/* Specifications Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground/90">
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="mileage"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Mileage (miles)
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  required
                  min="0"
                  value={formData.mileage}
                  onChange={handleChange}
                  placeholder="15000"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="transmission"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Semi-Auto">Semi-Auto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="fuelType"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                </select>
              </div>
            </div>
          </section>

          <div className="h-px bg-border/50 w-full" />

          {/* Description Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground/90">
              Description
            </h2>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-muted-foreground"
              >
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the vehicle's condition, features, history, and any modifications..."
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50 resize-y"
              />
            </div>
          </section>

          {/* Submit Action */}
          <div className="pt-4 flex justify-end gap-4">
            <Link
              href="/dashboard/cars"
              className="px-6 py-3 rounded-xl bg-secondary/50 font-medium hover:bg-secondary transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center gap-2 relative z-10">
                  <CheckCircle className="w-5 h-5" />
                  Publish Listing
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
