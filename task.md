# SaaS Landing Page Builder - Task Tracker

This file contains the development tasks and roadmap for the SaaS landing page builder project.

## Project Details
- **Description**: A headless, structured-content SaaS landing page builder with swappable themes.
- **Tech Stack**: Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Bun, PostgreSQL, Prisma ORM.

## Phase 1: Foundation (Current)
- [x] Initialize Next.js app (Tailwind, TypeScript, App Router).
- [x] Install dependencies (Prisma, Zod, clsx, tailwind-merge, lucide-react).
- [x] Initialize Prisma and set up `gemini.md` / `task.md`.
- [x] Define Zod schemas for the structure content.
- [x] Implement Prisma Database Schema (`User`, `Page`).
- [x] Create basic `lib/prisma.ts` connection utility.

## Phase 2: Theme Framework Engine
- [x] Create `ThemeComponents` typings.
- [x] Implement the `ThemeRegistry`.
- [x] Create dummy themes (`modern` and `minimalist`).

## Phase 3: The Builder Interface
- [x] Build the Dashboard to list pages and manage settings.
- [x] Create the Editor View (Left sidebar form inputs mapped to schema).
- [x] Live context rendering using split view / dynamic state.

## Phase 4: Publishing & Edge Delivery
- [x] Implement `/[slug]/page.tsx` dynamic routing.
- [x] Apply caching and Next.js revalidation (ISR).
- [x] SEO Metadata handling.
