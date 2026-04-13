"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, Fuel, Gauge } from "lucide-react";

export interface CarProps {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images?: string[];
  image?: string; // Fallback for old mock data
  mileage: number;
  transmission: string;
  fuelType: string;
  status?: string;
}

export default function CarCard({ car }: { car: CarProps | any }) {
  // Use first image if available, fallback to mock .image property or placeholder
  const displayImage = car?.images?.[0] || car?.image || "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop";
  const displayId = car?._id || car?.id;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group rounded-2xl border border-border/50 bg-card overflow-hidden shadow-lg transition-all hover:shadow-primary/5 hover:border-primary/30"
    >
      <div className="relative w-full overflow-hidden bg-muted">
        {/* Placeholder image from unsplash for demo purposes */}
        <img
          src={displayImage}
          alt={`${car?.year || ''} ${car?.make || ''} ${car?.model || ''}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105 h-[300px]"
        />
        <div className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-semibold text-primary capitalize">
          {car?.status || 'Available'}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
            {car?.year} {car?.make} {car?.model}
          </h3>
          <p className="text-2xl font-bold text-card-foreground mt-2">
            ${car?.price.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 text-xs text-muted-foreground">
          <div className="flex flex-col items-center justify-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-x border-border/50">
            <Settings className="h-4 w-4" />
            <span>{car?.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{car?.fuelType}</span>
          </div>
        </div>

        <Link
          href={`/cars/${displayId}`}
          className="w-full flex items-center justify-center rounded-lg bg-secondary py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground mt-2"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
