"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle, CheckCircle2, Plus, X, Camera } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCarByIdQuery, useUpdateCarMutation } from "@/slices/usersApiSlice";
import toast from "react-hot-toast";

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

export default function EditCarPage() {
    const { uploadImages } = useAuth();
    const router = useRouter();
    const params = useParams();
    const carId = params?.id as string;

    const { data: carData, isLoading: isCarLoading } = useGetCarByIdQuery(carId);
    const [updateCar] = useUpdateCarMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        vin: "",
        color: "",
        transmission: "",
        fuelType: "",
        engineSize: "",
        location: "",
        description: "",
        features: [] as string[],
        status: "available",
    });

    useEffect(() => {
        if (carData?.car) {
            const car = carData.car;
            setFormData({
                make: car.make || "",
                model: car.model || "",
                year: car.year?.toString() || "",
                price: car.price?.toString() || "",
                mileage: car.mileage?.toString() || "",
                vin: car.vin || "",
                color: car.color || "",
                transmission: car.transmission || "",
                fuelType: car.fuelType || "",
                engineSize: car.engineSize || "",
                location: car.location || "",
                description: car.description || "",
                features: car.features || [],
                status: car.status || "available",
            });
            setExistingImages(car.images || []);
        }
    }, [carData]);

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

    const toggleFeature = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newFiles].slice(0, 10 - existingImages.length));
        }
    };

    const removeNewImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0 && existingImages.length === 0) {
            toast.error("Please provide at least one image.");
            return;
        }

        setIsSubmitting(true);
        try {
            let finalImages = [...existingImages];

            // 1. Upload New Images if any
            if (images.length > 0) {
                const uploadedUrls = await uploadImages(images) as string[];
                finalImages = [...finalImages, ...uploadedUrls];
            }

            // 2. Update Listing
            await updateCar({
                id: carId,
                ...formData,
                images: finalImages,
            }).unwrap();

            setSuccess(true);
            toast.success("Car listing updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the listing.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const featuresItem = [
        "Sunroof",
        "Leather Seats",
        "Navigation System",
        "Heated Seats",
        "Backup Camera",
        "Bluetooth",
        "Apple CarPlay",
        "Android Auto",
        "Blind Spot Monitor",
        "Lane Departure Warning",
        "Adaptive Cruise Control",
        "Premium Sound",
        "Third Row Seating",
        "Tow Package",
        "Power Liftgate",
        "Keyless Entry"
    ]

    if (isCarLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="mt-4 text-muted-foreground">Loading vehicle data...</p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md text-center p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md shadow-2xl"
                >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 font-outfit">Listing Updated!</h2>
                    <p className="text-muted-foreground mb-8">
                        Your vehicle changes have been successfully saved.
                    </p>
                    <div className="space-y-3">
                        <Link
                            href="/dashboard/cars"
                            className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02]"
                        >
                            Back to Dashboard
                        </Link>
                        <Link
                            href={`/cars/${carId}`}
                            className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
                        >
                            View Listing
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold tracking-tight">Edit Vehicle</h1>
                    <p className="text-muted-foreground">
                        Update your vehicle listing details.
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

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                            {/* Existing Images */}
                            {existingImages.map((url, index) => (
                                <div key={`existing-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-secondary group">
                                    <img
                                        src={url}
                                        alt={`Existing ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    {index === 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground text-[10px] font-bold py-1 text-center">
                                            COVER PHOTO
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* New Image Previews */}
                            {images.map((file, index) => (
                                <div key={`new-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-secondary group ring-2 ring-primary/50">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`New Preview ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary rounded text-[8px] font-bold text-primary-foreground">
                                        NEW
                                    </div>
                                </div>
                            ))}

                            {/* Add More Button */}
                            {existingImages.length + images.length < 10 && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square rounded-xl border-2 border-dashed border-border/50 bg-secondary/20 flex flex-col items-center justify-center hover:bg-secondary/40 transition-colors group"
                                >
                                    <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] mt-1 font-medium">Add Photo</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                </button>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                            You can have up to 10 images. Dragging to reorder is not yet supported.
                        </p>
                    </section>

                    <div className="h-px bg-border/50 w-full" />

                    {/* Basic Details Section */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-foreground/90">
                            Basic Details
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Make</label>
                                <select
                                    name="make"
                                    required
                                    value={formData.make}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Make</option>
                                    {Object.keys(CAR_DATA).map(make => (
                                        <option key={make} value={make}>{make}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Model</label>
                                <select
                                    name="model"
                                    required
                                    disabled={!formData.make}
                                    value={formData.model}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none disabled:opacity-50"
                                >
                                    <option value="" disabled>Select Model</option>
                                    {formData.make && CAR_DATA[formData.make]?.map(model => (
                                        <option key={model} value={model}>{model}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Year</label>
                                <select
                                    name="year"
                                    required
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Year</option>
                                    {YEARS.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Lagos, Nigeria"
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="250000"
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">VIN Number</label>
                                <input
                                    type="text"
                                    name="vin"
                                    required
                                    value={formData.vin}
                                    onChange={handleChange}
                                    placeholder="17-digit VIN"
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Exterior Color</label>
                                <select
                                    name="color"
                                    required
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Color</option>
                                    {COLORS.map(color => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Listing Status</label>
                                <select
                                    name="status"
                                    required
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                </select>
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
                                <label className="text-sm font-medium text-muted-foreground">Mileage (miles)</label>
                                <input
                                    type="number"
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
                                <label className="text-sm font-medium text-muted-foreground">Transmission</label>
                                <select
                                    name="transmission"
                                    required
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Transmission</option>
                                    {TRANSMISSIONS.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Fuel Type</label>
                                <select
                                    name="fuelType"
                                    required
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Fuel Type</option>
                                    {FUEL_TYPES.map(ft => (
                                        <option key={ft} value={ft}>{ft}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Engine Size</label>
                                <select
                                    name="engineSize"
                                    required
                                    value={formData.engineSize}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Engine Size</option>
                                    {ENGINE_SIZES.map(es => (
                                        <option key={es} value={es}>{es}</option>
                                    ))}
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
                            <label className="text-sm font-medium text-muted-foreground">Detailed Description</label>
                            <textarea
                                name="description"
                                rows={5}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the vehicle's condition..."
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-muted-foreground/50 resize-y"
                            />
                        </div>
                    </section>

                    <div className="h-px bg-border/50 w-full" />

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-foreground/90">
                            Premium Features
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {featuresItem.map((feature) => (
                                <button
                                    key={feature}
                                    type="button"
                                    onClick={() => toggleFeature(feature)}
                                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium ${formData.features.includes(feature)
                                        ? "bg-primary/20 border-primary text-primary"
                                        : "bg-background/50 border-border/50 text-muted-foreground hover:border-border"
                                        }`}
                                >
                                    {formData.features.includes(feature) ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-current opacity-50" />
                                    )}
                                    {feature}
                                </button>
                            ))}
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
                                    Saving Changes...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 relative z-10">
                                    <CheckCircle className="w-5 h-5" />
                                    Save Changes
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
