"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  CarFront,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dummy data for user's cars
const MY_CARS = [
  {
    id: "car-1",
    make: "Mercedes-Benz",
    model: "G-Class AMG G 63",
    year: 2023,
    price: 185000,
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop",
    status: "Active",
    views: 1240,
    inquiries: 3,
  },
  {
    id: "car-2",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2024,
    price: 135000,
    image:
      "https://images.unsplash.com/photo-1503376713356-1a3b115450c9?q=80&w=1000&auto=format&fit=crop",
    status: "Active",
    views: 890,
    inquiries: 1,
  },
  {
    id: "car-3",
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1563720225384-9c0f4ffcbd86?q=80&w=1000&auto=format&fit=crop",
    status: "Pending",
    views: 2100,
    inquiries: 8,
  },
  {
    id: "car-4",
    make: "BMW",
    model: "M4 Competition",
    year: 2022,
    price: 82000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop",
    status: "Sold",
    views: 3400,
    inquiries: 12,
  },
];

export default function ManageCarsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredCars = MY_CARS.filter((car) => {
    const matchesSearch = `${car.make} ${car.model}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || car.status === activeTab;
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

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex bg-secondary/50 rounded-xl p-1 w-full md:w-auto overflow-x-auto hide-scrollbar">
          {["All", "Active", "Pending", "Sold"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab
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

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden group hover:border-border transition-colors"
          >
            <div className="relative h-48 w-full">
              <Image
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <div
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md flex items-center gap-1 ${
                    car.status === "Active"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : car.status === "Pending"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}
                >
                  {car.status === "Active" && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {car.status === "Pending" && <Clock className="w-3 h-3" />}
                  {car.status}
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

                {/* Actions Dropdown Placeholder - usually uses a Radix UI component */}
                <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 py-4 border-t border-border/50 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>{car.views} Views</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4" />
                  <span>{car.inquiries} Inquiries</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  href={`/cars/${car.id}`}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Link>
                <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
