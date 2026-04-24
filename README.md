# Arko Portfolio - Full Stack Developer

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
- **MongoDB/PostgreSQL**: Scalable data storage solutions.

### State Management & Data Fetching
- **Redux Toolkit**: Managing global application state (e.g., user authentication info).
- **TanStack Query (React Query)**: Handling server state, caching, and efficient data fetching.
- **React Redux**: Connecting Redux state to React components.

## 📂 Project Structure

```text
arko-protflieo/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── image.png
│   └── (static assets)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── education/
│   │   │   ├── experience/
│   │   │   ├── hero/
│   │   │   ├── projects/
│   │   │   ├── services/
│   │   │   ├── skills/
│   │   │   └── soft-skills/
│   │   ├── login/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── ui/
│   │   │   └── Sidebar.tsx
│   │   ├── Home/
│   │   │   ├── About/
│   │   │   ├── Contact/
│   │   │   ├── Education/
│   │   │   ├── Experience/
│   │   │   ├── Hero/
│   │   │   ├── Projects/
│   │   │   ├── Services/
│   │   │   ├── Skills/
│   │   │   └── SoftSkills/
│   │   ├── ui/
│   │   ├── Navbar.tsx
│   │   └── Threads.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── models/
│   │   ├── About/
│   │   ├── Users/
│   │   └── (feature models)
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   └── ReduxProvider.tsx
│   ├── store/
│   │   ├── slices/
│   │   └── store.ts
│   ├── auth.config.ts
│   ├── auth.ts
│   └── middleware.ts
├── .env
├── next.config.ts
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

---
Built with ❤️ by **Aftab Farhan Arko**