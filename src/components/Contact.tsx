"use client";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const contactInfo = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: "Email",
      value: "arko@nexoviasoft.com",
      link: "mailto:arko@nexoviasoft.com",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconBg: "bg-foreground/10",
      iconColor: "text-foreground",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Phone",
      value: "+880 1234 567890",
      link: "tel:+8801234567890",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconBg: "bg-foreground/10",
      iconColor: "text-foreground",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Location",
      value: "Dhaka, Bangladesh",
      link: "#",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconBg: "bg-foreground/10",
      iconColor: "text-foreground",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      url: "https://github.com/arko",
      color: "hover:bg-white/10",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: "https://linkedin.com/in/arko",
      color: "hover:bg-white/10",
    },
    {
      name: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      ),
      url: "https://twitter.com/arko",
      color: "hover:bg-white/10",
    },
  ];

  return (
    <section id="contact" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Get in Touch
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;let's-connect /&gt;
        </span>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Availability Badge */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/5 border border-white/10">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-foreground animate-ping" />
            </div>
            <span className="text-sm font-medium text-foreground/70">
              Available for opportunities
            </span>
          </div>

          {/* Intro Text */}
          <div className="p-6 rounded-2xl bg-foreground/5 border border-white/10">
            <p className="text-foreground/70 text-base leading-relaxed mb-4">
              Have a project in mind? Looking for a senior developer to join
              your team? Or just want to say hello? I'd love to hear from you!
            </p>
            <p className="text-foreground/50 text-sm">
              I typically respond within 24 hours.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-3">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  info.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`block p-4 rounded-xl bg-gradient-to-br ${info.color} border ${info.borderColor} backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${info.iconBg} flex items-center justify-center ${info.iconColor}`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-0.5">
                      {info.label}
                    </h4>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="p-5 rounded-xl bg-foreground/5 border border-white/10">
            <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-3">
              Connect with me
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-foreground/10 border border-white/10 flex items-center justify-center text-foreground/60 transition-all ${social.color} hover:text-white hover:border-transparent`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Response Promise */}
          <div className="p-5 rounded-xl bg-foreground/5 border-l-4 border-l-foreground">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Fast Response Guaranteed
                </p>
                <p className="text-xs text-foreground/50">
                  I'll get back to you within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-6 lg:p-8 rounded-2xl bg-foreground/5 border border-white/10"
          >
            <div className="space-y-5">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3.5 border border-white/10 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-white/10 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full p-3.5 border border-white/10 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-white/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Opportunity / Other"
                  className="w-full p-3.5 border border-white/10 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-white/10 transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className="w-full p-3.5 border border-white/10 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-white/10 transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-4 bg-foreground text-background rounded-xl font-bold uppercase tracking-wider text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}



