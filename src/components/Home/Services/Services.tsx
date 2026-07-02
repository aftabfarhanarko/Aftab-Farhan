"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Globe,
  Code2,
  Server,
  Cloud,
  Link,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  MonitorSmartphone,
  Smartphone,
  ShoppingBag,
  CalendarCheck,
  Users,
  MessageCircle,
  Newspaper,
  BookOpen,
  Truck,
  Building2,
  HeartPulse,
  GraduationCap,
  BarChart3,
  Briefcase,
  Utensils,
  Hotel,
  CheckCircle2,
  Cpu,
  Database,
  BrainCircuit,
  Layers,
  Rocket,
} from "lucide-react";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // ── Tech stack with logo colors ──────────────────────────────────────────
  const techStack = [
    { name: "JavaScript", color: "bg-yellow-500/10 dark:bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 dark:border-yellow-400/30" },
    { name: "TypeScript", color: "bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/30" },
    { name: "React.js", color: "bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 dark:border-cyan-400/30" },
    { name: "Next.js", color: "bg-foreground/10 text-foreground border-border" },
    { name: "React Native", color: "bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-500 border-cyan-500/20 dark:border-cyan-500/30" },
    { name: "Node.js", color: "bg-green-500/10 dark:bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20 dark:border-green-500/30" },
    { name: "Express.js", color: "bg-foreground/10 text-foreground/70 border-border" },
    { name: "PostgreSQL", color: "bg-blue-600/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-600/20 dark:border-blue-600/30" },
    { name: "MySQL", color: "bg-orange-500/10 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20 dark:border-orange-500/30" },
    { name: "MongoDB", color: "bg-green-600/10 dark:bg-green-600/15 text-green-600 dark:text-green-500 border-green-600/20 dark:border-green-600/30" },
    { name: "Mongoose", color: "bg-red-500/10 dark:bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20 dark:border-red-500/30" },
    { name: "Redis", color: "bg-red-600/10 dark:bg-red-600/15 text-red-600 dark:text-red-500 border-red-600/20 dark:border-red-600/30" },
    { name: "GraphQL", color: "bg-pink-500/10 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/20 dark:border-pink-500/30" },
    { name: "REST API", color: "bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-indigo-500/30" },
    { name: "Docker", color: "bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/30" },
    { name: "AWS", color: "bg-orange-400/10 dark:bg-orange-400/15 text-orange-600 dark:text-orange-400 border-orange-400/20 dark:border-orange-400/30" },
    { name: "Prisma ORM", color: "bg-teal-500/10 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/20 dark:border-teal-500/30" },
    { name: "Tailwind CSS", color: "bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 dark:border-cyan-400/30" },
    { name: "Framer Motion", color: "bg-purple-500/10 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/30" },
    { name: "Socket.io", color: "bg-foreground/10 text-foreground/70 border-border" },
    { name: "Stripe", color: "bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20 dark:border-violet-500/30" },
    { name: "Vercel", color: "bg-foreground/10 text-foreground border-border" },
  ];

  const services = [
    {
      id: 1,
      title: "E-Commerce Development",
      description:
        "Secure, scalable online stores with payment gateways, inventory management, and powerful admin dashboards.",
      icon: <ShoppingCart size={28} />,
      features: [
        "Custom Shopping Cart",
        "Payment Gateway (Stripe, SSLCommerz, bKash, Nagad)",
        "Product Management System",
        "Order Tracking",
        "Inventory Management",
        "Customer Accounts",
        "Admin Dashboard",
        "Analytics & Reports",
        "Discount & Coupon System",
        "Multi-vendor Marketplace",
      ],
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "SSLCommerz", "Redis"],
      color: "from-emerald-500/15 to-teal-500/10",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-500",
    },
    {
      id: 2,
      title: "Custom Website Development",
      description:
        "Tailored websites built from scratch to match your unique business requirements, brand identity, and goals.",
      icon: <Globe size={28} />,
      features: [
        "Responsive Design (Mobile-first)",
        "SEO Optimization",
        "Performance Tuning",
        "CMS Integration",
        "Custom Animations",
        "Progressive Web App (PWA)",
        "Multi-language Support",
        "Accessibility Compliance",
        "Domain & Hosting Setup",
        "Google Analytics Integration",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
      color: "from-blue-500/15 to-indigo-500/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      title: "Custom Software Development",
      description:
        "Business-specific software solutions — from internal tools to complex enterprise systems built to your workflow.",
      icon: <Code2 size={28} />,
      features: [
        "ERP / CRM Systems",
        "HR & Payroll Management",
        "POS (Point of Sale) Systems",
        "School / Hospital Management",
        "Inventory Software",
        "Accounting Software",
        "Workflow Automation",
        "Custom Reporting Tools",
        "Role-based Access Control",
        "Multi-branch Support",
      ],
      tech: ["React", "Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS"],
      color: "from-violet-500/15 to-purple-500/10",
      borderColor: "border-violet-500/30",
      iconColor: "text-violet-500",
    },
    {
      id: 4,
      title: "Full-Stack Web Applications",
      description:
        "End-to-end web apps with robust backend APIs, real-time features, databases, and modern frontends.",
      icon: <Server size={28} />,
      features: [
        "RESTful API Development",
        "Database Design & Optimization",
        "JWT Authentication & OAuth",
        "Real-time Features (Socket.io)",
        "Cloud Deployment (AWS, Vercel)",
        "Microservices Architecture",
        "Third-party Integrations",
        "Scalable Infrastructure",
        "Email & SMS Notifications",
        "File Upload & Media Management",
      ],
      tech: ["MERN Stack", "PostgreSQL", "GraphQL", "Docker", "AWS", "Redis"],
      color: "from-foreground/5 to-transparent",
      borderColor: "border-border",
      iconColor: "text-foreground",
    },
    {
      id: 5,
      title: "SaaS Application Development",
      description:
        "Subscription-based software products with multi-tenancy, billing, and scalable cloud infrastructure.",
      icon: <Cloud size={28} />,
      features: [
        "Multi-tenant Architecture",
        "Subscription & Billing (Stripe)",
        "User Onboarding Flow",
        "Usage-based Pricing",
        "Team & Workspace Management",
        "Analytics Dashboard",
        "Webhook & API Access",
        "White-label Support",
        "Auto-scaling Infrastructure",
        "Admin Super Panel",
      ],
      tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "Redis"],
      color: "from-cyan-500/15 to-sky-500/10",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-500",
    },
    {
      id: 6,
      title: "API Development & Integration",
      description:
        "Custom API development and seamless third-party service integrations for enhanced functionality.",
      icon: <Link size={28} />,
      features: [
        "REST API Design",
        "GraphQL APIs",
        "Payment Gateway Integration",
        "Social Media APIs",
        "CRM Integration",
        "Email & SMS Service (Twilio, SendGrid)",
        "Webhook Implementation",
        "API Documentation (Swagger)",
        "Rate Limiting & Security",
        "Third-party OAuth (Google, Facebook)",
      ],
      tech: ["Node.js", "Express", "GraphQL", "OAuth", "JWT", "Swagger"],
      color: "from-yellow-500/15 to-amber-500/10",
      borderColor: "border-yellow-500/30",
      iconColor: "text-yellow-500",
    },
    {
      id: 7,
      title: "Mobile App Development",
      description:
        "Cross-platform mobile apps for iOS and Android using React Native with native-like performance.",
      icon: <Smartphone size={28} />,
      features: [
        "React Native Development",
        "iOS & Android Support",
        "Push Notifications",
        "Offline Mode",
        "App Store Deployment",
        "Google Play Deployment",
        "Camera & GPS Integration",
        "Payment Integration",
        "Real-time Updates",
        "Native UI Components",
      ],
      tech: ["React Native", "TypeScript", "Node.js", "Firebase", "Expo", "MongoDB"],
      color: "from-rose-500/15 to-pink-500/10",
      borderColor: "border-rose-500/30",
      iconColor: "text-rose-500",
    },
    {
      id: 8,
      title: "Admin Dashboard & CMS",
      description:
        "Powerful admin panels, content management systems, and back-office tools to manage your business easily.",
      icon: <LayoutDashboard size={28} />,
      features: [
        "Custom Admin Panels",
        "Role & Permission Management",
        "Data Tables & Filters",
        "Charts & Analytics",
        "CMS (Content Management)",
        "Blog / News Management",
        "Media Library",
        "User Management",
        "Audit Logs",
        "Export to PDF / Excel",
      ],
      tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Chart.js", "shadcn/ui"],
      color: "from-foreground/5 to-transparent",
      borderColor: "border-border",
      iconColor: "text-foreground",
    },
    {
      id: 9,
      title: "AI & Smart Features Integration",
      description:
        "Add intelligent features to your product — chatbots, AI content generation, smart search, and automation.",
      icon: <BrainCircuit size={28} />,
      features: [
        "AI Chatbot Integration (OpenAI)",
        "Smart Search (Semantic)",
        "AI Content Generation",
        "Image Recognition",
        "Recommendation Engine",
        "Sentiment Analysis",
        "Data Prediction Models",
        "Voice Assistant Integration",
        "Auto-tagging & Classification",
        "Mongoose AI Queries",
      ],
      tech: ["OpenAI API", "LangChain", "Node.js", "MongoDB", "Python", "Vercel AI SDK"],
      color: "from-fuchsia-500/15 to-violet-500/10",
      borderColor: "border-fuchsia-500/30",
      iconColor: "text-fuchsia-500",
    },
    {
      id: 10,
      title: "UI/UX Design Implementation",
      description:
        "Converting Figma/XD designs into pixel-perfect, responsive, and interactive web interfaces.",
      icon: <Palette size={28} />,
      features: [
        "Figma / XD to Code",
        "Responsive Layouts",
        "Custom Animations (GSAP, Framer)",
        "Component Libraries",
        "Cross-browser Testing",
        "Mobile-first Design",
        "Interactive Prototypes",
        "Design Systems",
        "Dark / Light Mode",
        "Micro-interactions",
      ],
      tech: ["React", "Tailwind", "Framer Motion", "GSAP", "Storybook"],
      color: "from-pink-500/15 to-rose-500/10",
      borderColor: "border-pink-500/30",
      iconColor: "text-pink-500",
    },
    {
      id: 11,
      title: "Company IT Solutions",
      description:
        "End-to-end digital transformation for companies — from internal tools to client-facing products and team portals.",
      icon: <Building2 size={28} />,
      features: [
        "Company Website & Portal",
        "Employee Management System",
        "Internal Communication Tools",
        "Project & Task Management",
        "Client Management (CRM)",
        "Invoice & Billing System",
        "Document Management",
        "HR & Leave Management",
        "Custom Reporting & KPIs",
        "Multi-department Access Control",
      ],
      tech: ["Next.js", "Node.js", "PostgreSQL", "MySQL", "Docker", "AWS"],
      color: "from-slate-500/15 to-zinc-500/10",
      borderColor: "border-slate-500/30",
      iconColor: "text-slate-400",
    },
    {
      id: 12,
      title: "Website Maintenance & Optimization",
      description:
        "Keep your website secure, fast, and up-to-date with ongoing maintenance and performance tuning.",
      icon: <ShieldCheck size={28} />,
      features: [
        "Security Updates & Patches",
        "Performance Monitoring",
        "Bug Fixes",
        "Content Updates",
        "Backup Management",
        "SSL Certificate Setup",
        "Uptime Monitoring",
        "Core Web Vitals Optimization",
        "Speed Optimization",
        "Technical Support",
      ],
      tech: ["DevOps", "CI/CD", "Monitoring", "Analytics", "Security"],
      color: "from-orange-500/15 to-red-500/10",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-500",
    },
  ];

  const additionalServices = [
    { label: "Landing Pages", icon: <MonitorSmartphone size={15} /> },
    { label: "Business Websites", icon: <Building2 size={15} /> },
    { label: "Portfolio Websites", icon: <Briefcase size={15} /> },
    { label: "Blog Platforms", icon: <Newspaper size={15} /> },
    { label: "Booking & Appointment Systems", icon: <CalendarCheck size={15} /> },
    { label: "Membership & Subscription Sites", icon: <Users size={15} /> },
    { label: "Real-time Chat Apps", icon: <MessageCircle size={15} /> },
    { label: "Social Media Platforms", icon: <Smartphone size={15} /> },
    { label: "Food Delivery Apps", icon: <Utensils size={15} /> },
    { label: "Job Portals", icon: <Briefcase size={15} /> },
    { label: "E-learning Platforms", icon: <BookOpen size={15} /> },
    { label: "Event Management Systems", icon: <CalendarCheck size={15} /> },
    { label: "Travel & Hotel Booking", icon: <Hotel size={15} /> },
    { label: "Marketplace Platforms", icon: <ShoppingBag size={15} /> },
    { label: "Multi-vendor Shops", icon: <ShoppingCart size={15} /> },
    { label: "Healthcare Management", icon: <HeartPulse size={15} /> },
    { label: "School & College Management", icon: <GraduationCap size={15} /> },
    { label: "Accounting & Finance Tools", icon: <BarChart3 size={15} /> },
    { label: "Analytics Dashboards", icon: <BarChart3 size={15} /> },
    { label: "Courier & Delivery Tracking", icon: <Truck size={15} /> },
    { label: "Real Estate Platforms", icon: <Building2 size={15} /> },
    { label: "News & Magazine Sites", icon: <Newspaper size={15} /> },
  ];

  return (
    <section id="services" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-center sm:justify-start sm:text-left gap-6 mb-12">
        <div className="relative flex flex-col items-center sm:items-start">
          <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight leading-none">
            All-in-One Digital Services Expert
          </h2>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10 hidden sm:block" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;what-i-do /&gt;
        </span>
      </div>

      {/* ── Tech Stack Banner ───────────────────────────────────────────── */}
      <div className="mb-12 p-6 rounded-2xl bg-foreground/5 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Layers size={18} className="text-foreground/60" />
          <p className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">
            Technologies & Languages I Work With
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t.name}
              className={`px-3 py-1.5 text-xs font-medium border rounded-lg ${t.color}`}
            >
              {t.name}
            </span>
          ))}
        </div>
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
              <div className={`mb-4 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}>
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
                      className="px-2 py-1 text-xs bg-card/50 border border-border rounded-md text-foreground/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div
                className={`space-y-2 transition-all duration-300 ${hoveredCard === service.id ? "opacity-100" : "opacity-80"
                  }`}
              >
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                  Key Features
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {service.features.slice(0, 6).map((feature) => (
                    <div key={feature} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-foreground flex-shrink-0" />
                      <span className="text-xs text-foreground/70">{feature}</span>
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

      {/* Also Build */}
      <div className="p-8 rounded-2xl bg-foreground/5 border border-border mb-8">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
          <Rocket size={18} />
          Also Build
        </h3>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
          {additionalServices.map((service) => (
            <span
              key={service.label}
              className="flex items-center gap-2 px-3 py-2 text-[10px] sm:text-sm bg-foreground/5 border border-border rounded-full text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors cursor-default justify-center sm:justify-start"
            >
              <span className="opacity-60 flex-shrink-0">{service.icon}</span>
              <span className="truncate sm:overflow-visible sm:whitespace-normal">{service.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-foreground/10 via-foreground/5 to-transparent border border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to start your project?
            </h3>
            <p className="text-foreground/60">
              Let's discuss your idea and turn it into a real product together.
            </p>
          </div>
          <button className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;