"use client";

import { useState } from "react";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useGetCarByIdQuery } from "@/slices/usersApiSlice";

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params?.id as string;

  const { data, isLoading, error } = useGetCarByIdQuery(carId);
  const car = data?.car;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (car?.images?.length) {
      setCurrentIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car?.images?.length) {
      setCurrentIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-80 rounded-2xl bg-secondary/20 animate-pulse border border-border/50" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-background">
      {/* Breadcrumb & Navigation */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Link
          href="/cars"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Link>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/cars" className="hover:text-foreground">
            Cars
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">
            {car?.make} {car?.model}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="relative aspect-[16/9] md:aspect-[2/1] w-full rounded-2xl overflow-hidden bg-muted group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={car?.images?.[currentIndex] || car?.image}
                  alt={`${car?.year} ${car?.make} ${car?.model}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {car?.images?.length > 1 && (
                <>
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {car.images.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-primary w-4" : "bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Header Info */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              >
                {car?.year} {car?.make} {car?.model}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border/40 pb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{car?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span className="text-foreground capitalize">{car?.dealerId?.dealershipName}</span>
                </div>
              </div>
            </div>

            {/* Key Specs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">Key Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: <Calendar className="h-5 w-5" />,
                    label: "Year",
                    value: car?.year,
                  },
                  {
                    icon: <Gauge className="h-5 w-5" />,
                    label: "Mileage",
                    value: `${car?.mileage.toLocaleString()} mi`,
                  },
                  {
                    icon: <Settings className="h-5 w-5" />,
                    label: "Transmission",
                    value: car?.transmission,
                  },
                  {
                    icon: <Fuel className="h-5 w-5" />,
                    label: "Fuel Type",
                    value: car?.fuelType,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 p-4 rounded-xl border border-border/50 bg-card"
                  >
                    <div className="text-muted-foreground">{spec?.icon}</div>
                    <div className="text-sm text-muted-foreground">
                      {spec?.label}
                    </div>
                    <div className="font-semibold">{spec?.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Description & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {car?.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Premium Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car?.features?.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6 shadow-xl space-y-6">
              <div>
                <p className="text-muted-foreground font-medium mb-1">
                  Direct Buy Price
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  ${car?.price.toLocaleString()}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Excluding taxes and registration fees.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <Link
                  href={`/checkout/${car?.id}`}
                  className="w-full flex items-center justify-center rounded-xl bg-primary py-4 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  Buy Now Direct
                </Link>
                <button className="w-full flex items-center justify-center rounded-xl bg-secondary py-4 text-lg font-bold text-secondary-foreground transition-all hover:bg-secondary/80">
                  Contact Seller
                </button>
              </div>

              <div className="pt-6 space-y-4 text-sm">
                {/* <div className="flex justify-between items-center text-muted-foreground pb-4 border-b border-border/40">
                  <span>Financing available from</span>
                  <span className="font-bold text-foreground">$3,150 /mo</span>
                </div> */}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Kingdavid Buyer Protection</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>150-Point Inspection Passed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
