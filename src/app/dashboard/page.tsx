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

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "inquiry",
    user: "Michael S.",
    car: "2024 Porsche 911",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 2,
    type: "view",
    user: "Anonymous",
    car: "2023 Range Rover",
    time: "5 hours ago",
    status: "Viewed",
  },
  {
    id: 3,
    type: "inquiry",
    user: "Sarah L.",
    car: "2023 Range Rover",
    time: "1 day ago",
    status: "Replied",
  },
  {
    id: 4,
    type: "listing",
    user: "You",
    car: "2022 BMW M4",
    time: "2 days ago",
    status: "Published",
  },
];

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
    {
      name: "New Inquiries",
      value: stats?.newInquiries?.toString() || "0",
      change: "Coming soon",
      icon: MessageSquare,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      name: "Sales Volume",
      value: `$${(stats?.salesVolume || 0).toLocaleString()}`,
      change: "Total revenue",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading ? (
          [1, 2, 3, 4].map((n) => (
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area - Performance Chart (Placeholder) */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6 h-[400px] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Views Performance</h3>
              <select className="bg-secondary text-sm rounded-lg px-3 py-1.5 outline-none border border-border/50">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-1 flex items-center justify-center border border-dashed border-border/50 rounded-xl bg-secondary/20">
              <p className="text-muted-foreground">
                Chart Visualization Placeholder
              </p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="grid sm:grid-cols-2 gap-4"
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
                Edit details, price, or mark as sold
              </p>
            </Link>
          </motion.div>
        </div>

        {/* Sidebar - Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <Link
              href="/dashboard/orders"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
            </Link>
          </div>

          <div className="space-y-6">
            {RECENT_ACTIVITY.map((activity: any) => (
              <div key={activity.id} className="flex gap-4">
                <div className="relative mt-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${activity.type === "inquiry"
                      ? "bg-amber-500"
                      : activity.type === "view"
                        ? "bg-green-500"
                        : "bg-blue-500"
                      }`}
                  />
                  {activity.id !== RECENT_ACTIVITY.length && (
                    <div className="absolute top-3 left-1/2 -translateX-1/2 w-px h-10 bg-border/50" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.type === "inquiry" &&
                      `New inquiry from ${activity.user}`}
                    {activity.type === "view" && `New view on ${activity.car}`}
                    {activity.type === "listing" && `Published ${activity.car}`}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {activity.car}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
