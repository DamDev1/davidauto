"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CarFront,
  PlusCircle,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Cars", href: "/dashboard/cars", icon: CarFront },
  { name: "Add New Car", href: "/dashboard/cars/new", icon: PlusCircle },
  { name: "Orders & Inquiries", href: "/dashboard/orders", icon: Inbox },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden fixed top-20 right-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-card border border-border/50 rounded-lg text-foreground shadow-lg backdrop-blur-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 pt-24 pb-8 px-6 bg-card/50 backdrop-blur-xl border-r border-border/50 z-40">
          <div className="mb-10 px-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Dashboard
            </h2>
          </div>

          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative ${isActive
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  <Icon size={20} className={isActive ? "text-primary" : ""} />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border/50 mt-auto">
            <button className="flex items-center gap-4 px-4 py-3.5 w-full text-left rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-72 pt-24 pb-8 px-6 bg-card border-r border-border z-50 lg:hidden flex flex-col shadow-2xl"
              >
                <div className="mb-10 px-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Dashboard
                  </h2>
                </div>

                <nav className="flex-1 space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative ${isActive
                            ? "text-primary bg-primary/10 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                      >
                        <Icon
                          size={20}
                          className={isActive ? "text-primary" : ""}
                        />
                        {item.name}
                        {isActive && (
                          <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-6 border-t border-border/50 mt-auto">
                  <button className="flex items-center gap-4 px-4 py-3.5 w-full text-left rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72 pt-24 px-4 sm:px-8 pb-12 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
