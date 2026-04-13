"use client";
import Link from "next/link";
import { Car, Menu, Search, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  console.log(user)
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">KINGDAVID</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/cars"
            className="transition-colors hover:text-primary text-foreground/80"
          >
            Browse Cars
          </Link>
          <Link
            href="/sell"
            className="transition-colors hover:text-primary text-foreground/80"
          >
            Sell Your Car
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-primary text-foreground/80"
          >
            About Us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:flex items-center text-sm font-medium text-foreground/80 hover:text-foreground">
            <Search className="h-5 w-5 mr-2" />
            <span className="sr-only">Search</span>
          </button>
          {user ? (
            <>
              <button
                onClick={logout}
                className="hidden md:flex items-center text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                <User className="h-5 w-5 mr-2" />
                Sign Out
              </button>
              <Link
                href="/dashboard"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:flex items-center text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Link>
              <Link
                href="/sell"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                List Your Car
              </Link>
            </>
          )}
          <button className="md:hidden p-2 text-foreground/80 hover:text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
