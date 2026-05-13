"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import ContactHeader from "./ContactHeader";
import MessageDetailView from "./MessageDetailView";
import MessagesList from "./MessagesList";
import type { ContactMessage, ContactMessageStatus } from "./types";

export default function ContactDashboard() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );

  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["contact-messages"],
    queryFn: async () => (await axios.get("/api/contact")).data,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactMessageStatus }) =>
      axios.put(`/api/contact/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      showToast("Status updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/contact/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      showToast("Message deleted");
      setSelectedMessage(null);
    },
  });

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === "UNREAD") {
      updateStatusMutation.mutate({ id: msg.id, status: "READ" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full">
      <ContactHeader />

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <MessagesList
            messages={messages ?? []}
            selectedId={selectedMessage?.id ?? null}
            onSelect={handleSelect}
          />
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <MessageDetailView
              message={selectedMessage}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

