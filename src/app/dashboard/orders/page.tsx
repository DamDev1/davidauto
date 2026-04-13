"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Reply,
  CarFront,
} from "lucide-react";

const INQUIRIES = [
  {
    id: "inq-1",
    customerName: "Michael Smith",
    customerEmail: "michael.smith@example.com",
    car: "2023 Mercedes-Benz G-Class AMG G 63",
    date: "2 hours ago",
    status: "New",
    offer: 180000,
    message:
      "Hi, I'm very interested in the G-Class. Is the price negotiable? I can do $180k cash today.",
    avatar: "MS",
  },
  {
    id: "inq-2",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    car: "2023 Range Rover Sport",
    date: "1 day ago",
    status: "Replied",
    offer: null,
    message:
      "Could you send me more pictures of the interior? Specifically the back seats.",
    avatar: "SJ",
  },
  {
    id: "inq-3",
    customerName: "David Lee",
    customerEmail: "d.lee@example.com",
    car: "2022 BMW M4 Competition",
    date: "3 days ago",
    status: "Closed",
    offer: 80000,
    message: "I'd like to schedule a viewing for this weekend if possible.",
    avatar: "DL",
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  const filteredInquiries = INQUIRIES.filter((inq) => {
    const matchesSearch =
      inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.car.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "New" && inq.status === "New") ||
      (activeTab === "Replied" && inq.status === "Replied") ||
      (activeTab === "Closed" && inq.status === "Closed");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Orders & Inquiries
          </h1>
          <p className="text-muted-foreground">
            Manage communications and offers from interested buyers.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex bg-secondary/50 rounded-xl p-1 w-full md:w-auto overflow-x-auto hide-scrollbar">
          {["All", "New", "Replied", "Closed"].map((tab) => (
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

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border/50 rounded-xl bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Search by name or vehicle..."
          />
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden shadow-sm">
        <ul className="divide-y divide-border/50">
          {filteredInquiries.map((inq, i) => (
            <motion.li
              key={inq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="p-4 sm:p-6 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Avatar */}
                <div className="hidden md:flex flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 text-primary items-center justify-center font-bold text-lg">
                  {inq.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="md:hidden flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {inq.avatar}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {inq.customerName}
                      </h3>

                      {/* Status Badges */}
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${
                          inq.status === "New"
                            ? "bg-amber-500/20 text-amber-500"
                            : inq.status === "Replied"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {inq.status === "New" && <Clock className="w-3 h-3" />}
                        {inq.status === "Replied" && (
                          <Reply className="w-3 h-3" />
                        )}
                        {inq.status === "Closed" && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {inq.status}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {inq.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <CarFront className="w-4 h-4" />
                    <span>
                      Inquiry regarding:{" "}
                      <span className="font-medium text-foreground">
                        {inq.car}
                      </span>
                    </span>
                  </div>

                  {inq.offer && (
                    <div className="inline-block px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-sm font-medium border border-green-500/20 mt-2">
                      Offer: ${inq.offer.toLocaleString()}
                    </div>
                  )}

                  <p className="text-muted-foreground mt-3 bg-background/50 p-4 rounded-xl border border-border/30 text-sm italic">
                    "{inq.message}"
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                    {inq.status !== "Closed" && (
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Mark Closed
                      </button>
                    )}
                  </div>
                </div>

                {/* Options Menu Mobile Placeholder */}
                <button className="absolute top-4 right-4 md:static md:mt-1 p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>

        {filteredInquiries.length === 0 && (
          <div className="text-center py-24">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No inquiries found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search filters."
                : "When buyers contact you, their messages will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
