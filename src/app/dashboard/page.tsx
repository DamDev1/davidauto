"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  CarFront,
  Eye,
  MessageSquare,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetDashboardStatsQuery } from "@/slices/usersApiSlice";



export default function DashboardOverview() {
  const { data, isLoading } = useGetDashboardStatsQuery({});
  const stats = data?.stats;

  const displayStats = [
    {
      name: "Active Listings",
      value: stats?.activeListings?.toString() || "0",
      change: "Live inventory",
      icon: CarFront,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "Total Views",
      value: stats?.totalViews?.toLocaleString() || "0",
      change: "All-time visibility",
      icon: Eye,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your listings today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {isLoading ? (
          [1, 2].map((n) => (
            <div key={n} className="h-40 rounded-2xl bg-secondary/20 animate-pulse border border-border/50" />
          ))
        ) : (
          displayStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-muted-foreground text-sm font-medium mb-1">
                  {stat.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.change}
                </p>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="mt-8">
        {/* Quick Actions */}
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <Link
            href="/dashboard/cars/new"
            className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/20 to-primary/5 hover:to-primary/10 border border-primary/20 hover:border-primary/40 rounded-2xl transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PlusCircle className="text-primary w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg text-white">
              Create New Listing
            </h4>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Add a new vehicle to your inventory instantly
            </p>
          </Link>

          <Link
            href="/dashboard/cars"
            className="group flex flex-col items-center justify-center p-8 bg-card/50 hover:bg-card border border-border/50 rounded-2xl transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CarFront className="text-foreground w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg text-white">
              Manage Inventory
            </h4>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Edit details, track views, or remove listing
            </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
