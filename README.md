# Arko Portfolio - Full Stack Developer

Live Website: [aftabfarhan.tech](http://aftabfarhan.tech/)

This is a modern, high-performance portfolio application built with the latest web technology stack.

## 🚀 Tech Stack

The core frameworks and libraries used in this project are listed below:        

### Core Framework & Language

- **Next.js 16 (App Router)**: Utilizing the latest Server Side Rendering (SSR) and Static Site Generation (SSG) features.
- **React 19**: The core library for building the user interface.
- **TypeScript**: Ensuring type-safe coding and an enhanced developer experience.

### Styling & Animation

- **Tailwind CSS 4**: For rapid and customizable utility-first styling.
- **Framer Motion**: Powering smooth scroll animations and interactive elements.
- **Lucide React**: A collection of modern and clean icons.

### Authentication

- **NextAuth.js v5 (Auth.js)**: Handling secure login and dashboard route protection.
- **Bcryptjs**: Used for secure password hashing.

### Database & ORM

- **Prisma ORM**: Providing type-safe database queries and schema management.   
- **PostgreSQL**: Scalable data storage solutions.

### State Management & Data Fetching

- **Redux Toolkit**: Managing global application state (e.g., user authentication info).
- **TanStack Query (React Query)**: Handling server state, caching, and efficient data fetching.
- **React Redux**: Connecting Redux state to React components.

## 📂 Project Structure

```text
arko-protflieo/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
│   └── (static assets: images, icons, etc.)
├── src/
│   ├── app/
│   │   ├── api/          # Backend API routes (Auth, Hero, About, Skills, etc.)
│   │   ├── dashboard/    # Admin Dashboard pages
│   │   ├── login/        # Authentication pages
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx      # Main portfolio homepage
│   ├── components/
│   │   ├── Dashboard/    # Dashboard specific components
│   │   ├── Home/         # Homepage sections (strictly modularized < 150 lines per file)
│   │   │   ├── About/          # About section (Profile, Bio, Highlights, TechStack)
│   │   │   ├── AIStack/        # AI Workflow section (ToolCard, StepCard, AIPipeline, AIHighlightCard)
│   │   │   ├── Contact/        # Contact section (ContactInfo, ContactForm, SubjectDropdown)
│   │   │   ├── Education/      # Education section
│   │   │   ├── Experience/     # Experience section (ExperienceCard, ExperienceComponents)
│   │   │   ├── Hero/           # Hero section (HeroLeft, HeroRight, HeroSkeleton, HeroDecorations)
│   │   │   ├── Projects/       # Projects showcase (ProjectCard, FeaturedCard, ProjectsFilters)
│   │   │   ├── Services/       # Services list (ServiceCard, servicesData1/2, techStackData)
│   │   │   ├── Skills/         # Skills display (SkillsMarquee, SkillCategoryCard, SkillsSkeleton)
│   │   │   └── SoftSkills/     # Soft Skills display (SkillCard, softSkillsData)
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── lib/              # Utility functions and shared logic
│   ├── providers/        # Context providers (Auth, Redux, Query)
│   ├── store/            # Redux state management
│   ├── auth.ts           # Auth.js configuration
│   └── middleware.ts     # Next.js middleware
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

Built with ❤️ by **Aftab Farhan Arko**
