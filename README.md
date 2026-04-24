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
- **PostgreSQL**: Scalable data storage solutions.

### State Management & Data Fetching
- **Redux Toolkit**: Managing global application state (e.g., user authentication info).
- **TanStack Query (React Query)**: Handling server state, caching, and efficient data fetching.
- **React Redux**: Connecting Redux state to React components.

## 🛠️ Folder Structure

- `src/app`: Next.js App Router, pages, and layouts.
- `src/components`: Reusable UI components.
- `src/providers`: Configuration for Redux, TanStack Query, and other context providers.
- `src/store`: Redux Toolkit store configuration and slices.
- `src/models`: Database query functions and data models.
- `prisma`: Database schema and migration files.

## 🏁 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (`.env`):
```env
DATABASE_URL="your_database_url"
AUTH_SECRET="your_secret_key"
```

3. Run the development server:
```bash
npm run dev
```

---
Built with ❤️ by **Aftab Farhan Arko**