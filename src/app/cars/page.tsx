"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import CarCard, { CarProps } from "@/components/CarCard";
import { useGetCarsQuery } from "@/slices/usersApiSlice";

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetCarsQuery({})

  const filteredCars = data?.cars?.filter(
    (car: any) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <div className="bg-secondary/40 py-12 px-4 md:px-8 border-b border-border/50">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Premium Inventory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8 max-w-2xl"
          >
            Explore our curated selection of luxury vehicles. Connect directly
            with owners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 w-full"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors whitespace-nowrap">
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors whitespace-nowrap">
                <span>Sort By: Newest</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-grow py-12 px-4 md:px-8 bg-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-medium text-muted-foreground">
              Showing{" "}
              <span className="text-foreground font-bold">
                {filteredCars?.length}
              </span>{" "}
              vehicles
            </h2>
          </div>

          {filteredCars?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars?.map((car:any, i:number) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No vehicles found</h3>
              <p className="text-muted-foreground max-w-sm">
                We couldn't find any cars matching "{searchTerm}". Try adjusting
                your search or filters.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
