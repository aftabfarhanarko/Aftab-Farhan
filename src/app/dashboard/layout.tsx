import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ToastProvider } from "@/components/Dashboard/ui/ToastContext";
import TopNavbar from "@/components/Dashboard/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar — fixed left */}
        <Sidebar />

        {/* Right side — navbar + scrollable content */}
        <div className="flex flex-col flex-1 min-w-0 max-h-screen overflow-hidden">
          {/* Top Navbar */}
          <TopNavbar />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
              {children}
              </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

