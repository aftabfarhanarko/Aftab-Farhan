"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  User, 
  AtSign, 
  Loader2,
  Inbox,
  X
} from "lucide-react";
import { useToast } from "@/components/Dashboard/ui/ToastContext";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
}

const ContactDashboard = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const res = await axios.get("/api/contact");
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
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

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-white/20" /></div>;

  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Inbox</h1>
        <p className="text-foreground/50 font-medium text-lg">Manage inquiries from your portfolio.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* List */}
        <div className="lg:col-span-5 space-y-4">
          {messages?.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl text-center">
              <Inbox className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No messages yet</p>
            </div>
          ) : (
            messages?.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === "UNREAD") {
                    updateStatusMutation.mutate({ id: msg.id, status: "READ" });
                  }
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  selectedMessage?.id === msg.id 
                    ? "bg-white/10 border-white/20" 
                    : "bg-white/[0.03] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold truncate pr-4 ${msg.status === "UNREAD" ? "text-white" : "text-white/40"}`}>
                    {msg.name}
                  </h3>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    msg.status === "UNREAD" ? "bg-green-500 text-black" : "bg-white/5 text-white/20"
                  }`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-xs text-white/40 font-medium mb-3 truncate">{msg.subject}</p>
                <div className="flex items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                  <span className="group-hover:text-white/40 transition-colors">View Details →</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 lg:p-10 sticky top-10"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <User className="w-6 h-6 text-white/40" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black">{selectedMessage.name}</h2>
                      <p className="text-sm font-medium text-white/40 flex items-center gap-1">
                        <AtSign className="w-3 h-3" /> {selectedMessage.email}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => confirm("Delete this message?") && deleteMutation.mutate(selectedMessage.id)}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Subject</span>
                    <p className="text-lg font-bold text-white/80">{selectedMessage.subject}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Message</span>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-white/70 leading-relaxed font-medium whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-center text-sm hover:scale-[1.02] transition-transform"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-white/10" />
                </div>
                <h3 className="text-xl font-black mb-2">Select a message</h3>
                <p className="text-white/20 font-medium max-w-xs">Choose an inquiry from the list to view full details and respond.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactDashboard;