import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ToastProvider } from "@/components/Dashboard/ui/ToastContext";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-h-screen">
          <div className="max-w-5xl mx-auto">
            <QueryProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </QueryProvider>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
