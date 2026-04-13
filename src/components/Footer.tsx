import Link from "next/link";
import { Car, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background pt-12">
      <div className="container mx-auto px-4 md:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight">
                KINGDAVID
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The premier marketplace for luxury and direct car sales. Buy and
              sell your next dream car with absolute zero hassle.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Inventory</h3>
            <ul className="space-y-3 flex flex-col">
              <Link
                href="/cars?type=suv"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Luxury SUVs
              </Link>
              <Link
                href="/cars?type=sedan"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Premium Sedans
              </Link>
              <Link
                href="/cars?type=sports"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sports Cars
              </Link>
              <Link
                href="/cars?type=electric"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Electric Vehicles
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3 flex flex-col">
              <Link
                href="/sell"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                List Your Car
              </Link>
              <Link
                href="/financing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Financing Options
              </Link>
              <Link
                href="/warranty"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Extended Warranty
              </Link>
              <Link
                href="/inspections"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Vehicle Inspections
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 flex flex-col">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Kingdavid Motors. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <span className="text-xs text-muted-foreground">
              Premium Dealership Experience
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
