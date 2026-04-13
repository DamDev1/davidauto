"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Handshake } from "lucide-react";
import CarCard, { CarProps } from "@/components/CarCard";
import { useGetCarsQuery } from "@/slices/usersApiSlice";


export default function Home() {
  const { data, isLoading, error } = useGetCarsQuery({})

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
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Cars"
            fill
            className="object-cover object-center brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 md:px-8 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Drive Your <span className="text-primary italic">Dreams</span>{" "}
            Today.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            The ultimate marketplace to buy and sell premium vehicles directly.
            Zero hidden fees. Pure automotive excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-lg transition-transform hover:scale-105"
            >
              Browse Inventory
            </Link>
            <Link
              href="/sell"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/10 text-white backdrop-blur-md font-semibold text-lg border border-white/20 transition-transform hover:bg-white/20 hover:scale-105"
            >
              Sell Your Car
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-background px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              >
                Featured Vehicles
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg max-w-xl"
              >
                Handpicked premium selections from our verified direct sellers.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/cars"
                className="hidden md:inline-flex items-center text-primary font-medium hover:underline"
              >
                View All Inventory &rarr;
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.cars?.map((car: any, i: number) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/cars"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              View All Inventory &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/30 px-4 md:px-8 border-y border-border/50">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-16"
          >
            Why Choose Kingdavid Motors
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Handshake className="h-10 w-10 text-primary" />,
                title: "Direct Dealing",
                description:
                  "Connect directly with buyers and sellers. No middlemen cutting into your profits or raising the price.",
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                title: "Verified Quality",
                description:
                  "Every listing is vetted. We assure that high-value vehicles match their description for peace of mind.",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Fast & Dynamic",
                description:
                  "Our platform ensures the fastest listing process and searching experience. Don't waste time on legacy sites.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-6 border rounded-2xl border-border/50 bg-card"
              >
                <div className="mb-6 p-4 rounded-full bg-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Ready to Upgrade Your Drive?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Join thousands of car enthusiasts trading premium vehicles on the
            Kingdavid marketplace.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/sell"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              List Your Car Available
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
