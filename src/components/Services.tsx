"use client";
import React, { useState } from "react";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: "E-Commerce Development",
      description:
        "Full-featured online stores with secure payments, inventory management, and admin dashboards.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      features: [
        "Custom Shopping Cart",
        "Payment Gateway Integration",
        "Product Management System",
        "Order Tracking",
        "Inventory Management",
        "Customer Accounts",
        "Admin Dashboard",
        "Analytics & Reports",
      ],
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "PayPal", "Redis"],
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Custom Website Development",
      description:
        "Tailored websites built from scratch to meet your unique business requirements and brand identity.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4" />
          <path d="M12 22v-4" />
          <path d="M4 12H2" />
          <path d="M22 12h-2" />
          <path d="M19.07 4.93l-2.83 2.83" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M19.07 19.07l-2.83-2.83" />
          <path d="M4.93 4.93l2.83 2.83" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Performance Tuning",
        "CMS Integration",
        "Custom Animations",
        "Progressive Web App",
        "Multi-language Support",
        "Accessibility Compliance",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-500",
    },
    {
      id: 3,
      title: "Full-Stack Web Applications",
      description:
        "End-to-end web applications with robust backend APIs, databases, and modern frontend frameworks.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      features: [
        "RESTful API Development",
        "Database Design",
        "Authentication & Authorization",
        "Real-time Features",
        "Cloud Deployment",
        "Microservices Architecture",
        "Third-party Integrations",
        "Scalable Infrastructure",
      ],
      tech: ["MERN Stack", "PostgreSQL", "GraphQL", "Docker", "AWS", "Redis"],
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-500",
    },
    {
      id: 4,
      title: "Website Maintenance & Optimization",
      description:
        "Keep your website secure, fast, and up-to-date with ongoing maintenance and performance optimization.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 4v10.54a4 4 0 1 1-4 0V4" />
          <path d="M10 2h4" />
          <path d="M4 10h16" />
          <path d="M18 14v6" />
          <path d="M6 14v6" />
        </svg>
      ),
      features: [
        "Security Updates",
        "Performance Monitoring",
        "Bug Fixes",
        "Content Updates",
        "Backup Management",
        "SSL Certificate",
        "Uptime Monitoring",
        "Technical Support",
      ],
      tech: ["DevOps", "CI/CD", "Monitoring", "Analytics", "Security"],
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-500",
    },
    {
      id: 5,
      title: "API Development & Integration",
      description:
        "Custom API development and seamless third-party service integration for enhanced functionality.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      features: [
        "REST API Design",
        "GraphQL APIs",
        "Payment Gateway Integration",
        "Social Media APIs",
        "CRM Integration",
        "Email Service Integration",
        "Webhook Implementation",
        "API Documentation",
      ],
      tech: ["Node.js", "Express", "GraphQL", "OAuth", "JWT", "Swagger"],
      color: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/30",
      iconColor: "text-yellow-500",
    },
    {
      id: 6,
      title: "UI/UX Design Implementation",
      description:
        "Converting designs into pixel-perfect, responsive, and interactive web interfaces with smooth animations.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12h14" />
          <circle cx="12" cy="12" r="10" />
          <path d="m9 9 6 6" />
          <path d="m15 9-6 6" />
        </svg>
      ),
      features: [
        "Figma to Code",
        "Responsive Layouts",
        "Custom Animations",
        "Component Libraries",
        "Cross-browser Testing",
        "Mobile-first Design",
        "Interactive Prototypes",
        "Design Systems",
      ],
      tech: ["React", "Tailwind", "Framer Motion", "GSAP", "Storybook"],
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      iconColor: "text-pink-500",
    },
  ];

  const additionalServices = [
    "Landing Pages",
    "Business Websites",
    "Portfolio Websites",
    "Blog Platforms",
    "SaaS Applications",
    "Marketplace Platforms",
    "Booking Systems",
    "Membership Sites",
    "Admin Dashboards",
    "Real-time Chat Apps",
    "Social Media Platforms",
    "Analytics Dashboards",
  ];

  return (
    <section id="services" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Services
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
        <span className="text-sm font-mono text-accent/60 hidden sm:block">
          &lt;what-i-do /&gt;
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <div
            key={service.id}
            className={`group relative rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            onMouseEnter={() => setHoveredCard(service.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6">
              {/* Icon */}
              <div
                className={`mb-4 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-foreground/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div
                className={`space-y-2 transition-all duration-300 ${
                  hoveredCard === service.id ? "opacity-100" : "opacity-80"
                }`}
              >
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                  Key Features
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {service.features.slice(0, 6).map((feature) => (
                    <div key={feature} className="flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3 text-accent flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs text-foreground/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                {service.features.length > 6 && (
                  <p className="text-xs text-foreground/40 mt-1">
                    +{service.features.length - 6} more features
                  </p>
                )}
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Additional Services */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-accent-muted/10 to-transparent border border-accent-muted/20">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
          <span className="w-2 h-2 bg-accent rounded-full" />
          Additional Services
        </h3>
        <div className="flex flex-wrap gap-2">
          {additionalServices.map((service) => (
            <span
              key={service}
              className="px-4 py-2 text-sm bg-accent-muted/5 border border-accent-muted/10 rounded-full text-foreground/70 hover:text-foreground hover:border-accent/30 transition-colors cursor-default"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to start your project?
            </h3>
            <p className="text-foreground/60">
              Let's discuss your requirements and bring your vision to life.
            </p>
          </div>
          <button className="px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors whitespace-nowrap">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
