"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactManager = () => {
  const [formData, setFormData] = useState({
    email: "aftab.arko@example.com",
    phone: "+880 1234 567890",
    location: "Dhaka, Bangladesh",
    linkedin: "linkedin.com/in/arko",
    github: "github.com/arko",
    twitter: "twitter.com/arko",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Changes saved locally! (Backend not implemented)");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Contact Details</h1>
        <p className="text-foreground/50 font-medium">Manage your contact information and social links.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Twitter / X</label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-8 py-4 bg-foreground text-background rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactManager;
