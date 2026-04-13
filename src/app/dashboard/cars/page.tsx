"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Search,
  MoreVertical,
  Edit,
  Eye,
  CheckCircle,
  CarFront,
} from "lucide-react";
import Link from "next/link";
import { useGetMyCarsQuery } from "@/slices/usersApiSlice";

export default function ManageCarsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const { data, isLoading, isError } = useGetMyCarsQuery({});

  const cars = data?.cars || [];

  const filteredCars = cars.filter((car: any) => {
    const matchesSearch = `${car.make} ${car.model}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Active" && car.status === "available") ||
      (activeTab === "Sold" && car.status === "sold");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Manage Inventory
          </h1>
          <p className="text-muted-foreground">
            View, edit, and manage your vehicle listings.
          </p>
        </div>
        <Link
          href="/dashboard/cars/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          <PlusCircle className="w-5 h-5" />
          Add Vehicle
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex bg-secondary/50 rounded-xl p-1 w-full md:w-auto overflow-x-auto hide-scrollbar">
          {["All", "Active", "Sold"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border/50 rounded-xl bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Search vehicles..."
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 rounded-2xl bg-secondary/20 animate-pulse border border-border/50" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-24 bg-destructive/5 border border-destructive/20 rounded-2xl">
          <p className="text-destructive font-medium">Failed to load vehicles. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car: any, i: number) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden group hover:border-border transition-colors"
            >
              <div className="relative w-full">
                <div className="">
                  <img
                    src={car.images?.[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    width={500}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <div
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md flex items-center gap-1 ${car.status === "available"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                  >
                    {car.status === "available" && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {car.status === "available" ? "Active" : "Sold"}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-xl font-semibold text-primary mt-1">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>

                  <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 py-4 border-t border-border/50 mt-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{car.views || 0} Views</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    <span>0 Inquiries</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    href={`/cars/${car._id}`}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Link>
                  <Link
                    href={`/dashboard/cars/edit/${car._id}`}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredCars.length === 0 && (
        <div className="text-center py-24 bg-card/50 border border-dashed border-border/50 rounded-2xl">
          <CarFront className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "Try adjusting your search filters."
              : "You haven't added any vehicles yet."}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/cars/new"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Add Your First Car
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
