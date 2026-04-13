"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { CarProps } from "@/components/CarCard";

// Using the same mock data for demo purposes
const MOCK_CAR: CarProps & {
  description: string;
  features: string[];
  location: string;
  seller: string;
} = {
  id: "car-1",
  make: "Mercedes-Benz",
  model: "G-Class AMG G 63",
  year: 2023,
  price: 185000,
  image:
    "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop",
  mileage: 12500,
  transmission: "Automatic",
  fuelType: "Gasoline",
  description:
    "Pristine condition AMG G 63. Single owner, garage kept, full service history at authorized Mercedes-Benz dealership. Features the highly sought-after Night Package and exclusive interior plus. Paint is flawless obsidian black metallic.",
  location: "Beverly Hills, CA",
  seller: "Verified Private Seller",
  features: [
    "Night Package",
    "Burmester Surround Sound",
    "Massage Seats",
    "Carbon Fiber Trim",
    "Active Lane Keeping Assist",
    "Adaptive Cruise Control",
  ],
};

export default function CarDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  // In a real app, fetch car based on ID.
  // For demo, we just use MOCK_CAR, changing ID to match params.
  const car = { ...MOCK_CAR, id: id || "car-1" };

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
            {car.make} {car.model}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Images & Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[16/9] md:aspect-[2/1] w-full rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Header Info */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              >
                {car.year} {car.make} {car.model}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border/40 pb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{car.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span className="text-foreground">{car.seller}</span>
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
                    value: car.year,
                  },
                  {
                    icon: <Gauge className="h-5 w-5" />,
                    label: "Mileage",
                    value: `${car.mileage.toLocaleString()} mi`,
                  },
                  {
                    icon: <Settings className="h-5 w-5" />,
                    label: "Transmission",
                    value: car.transmission,
                  },
                  {
                    icon: <Fuel className="h-5 w-5" />,
                    label: "Fuel Type",
                    value: car.fuelType,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 p-4 rounded-xl border border-border/50 bg-card"
                  >
                    <div className="text-muted-foreground">{spec.icon}</div>
                    <div className="text-sm text-muted-foreground">
                      {spec.label}
                    </div>
                    <div className="font-semibold">{spec.value}</div>
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
                  {car.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Premium Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.features.map((feature, i) => (
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
                  ${car.price.toLocaleString()}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Excluding taxes and registration fees.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <Link
                  href={`/checkout/${car.id}`}
                  className="w-full flex items-center justify-center rounded-xl bg-primary py-4 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  Buy Now Direct
                </Link>
                <button className="w-full flex items-center justify-center rounded-xl bg-secondary py-4 text-lg font-bold text-secondary-foreground transition-all hover:bg-secondary/80">
                  Contact Seller
                </button>
              </div>

              <div className="pt-6 space-y-4 text-sm">
                <div className="flex justify-between items-center text-muted-foreground pb-4 border-b border-border/40">
                  <span>Financing available from</span>
                  <span className="font-bold text-foreground">$3,150 /mo</span>
                </div>
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
