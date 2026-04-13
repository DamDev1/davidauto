import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import StoreProvider from "@/utils/StoreProvider";
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kingdavid Motors | Direct Car Dealership",
  description:
    "Buy and sell premium cars directly with zero hassle. The best marketplace for car enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </StoreProvider>

      </body>
    </html>
  );
}
