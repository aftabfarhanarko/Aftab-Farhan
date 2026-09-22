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
        <div className="flex min-h-screen bg-gray-50 text-black relative overflow-hidden font-sans">
          {/* Subtle Grid Pattern Overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.4]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Ambient Brand Accent Light */}
          <div
            className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(255,96,20,0.18) 0%, transparent 70%)",
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