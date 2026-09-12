import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ToastProvider } from "@/components/Dashboard/ui/ToastContext";
import TopNavbar from "@/components/Dashboard/TopNavbar";
import AuthProvider from "@/providers/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AuthProvider>
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 relative overflow-hidden font-sans">
          {/* Subtle Grid Pattern Overlay */}
          <div
            
          />

          {/* Ambient Brand Accent Light */}
          <div
            className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(255,96,20,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Sidebar — left */}
          <Sidebar />

          {/* Right side — navbar + scrollable content */}
          <div className="flex flex-col flex-1 min-w-0 max-h-screen overflow-hidden relative z-10">
            {/* Top Navbar */}
            <TopNavbar />
            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </AuthProvider>
    </ToastProvider>
  );
}
