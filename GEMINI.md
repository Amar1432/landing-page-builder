# SaaS Landing Page Builder

This project is a headless, structured-content SaaS landing page builder with swappable themes. It allows users to create and manage landing pages by defining structured content (Hero, Features, Pricing, FAQ, Testimonials, Lead Form) and applying different visual themes.

## Project Overview

- **Purpose**: A platform for building and hosting structured SaaS landing pages.
- **Architecture**: Next.js App Router with React 19 and TypeScript.
- **State**: Phase 8 in progress. Fully functional editor with dynamic section management, drag-and-drop reordering, theme swapping, global settings, and Clerk authentication.
- **Key Technologies**:
    - **Framework**: Next.js 16.1.6 (App Router)
    - **Styling**: Tailwind CSS 4
    - **Database**: PostgreSQL with Prisma ORM 7.4.2
    - **Validation**: Zod (for dynamic section content and leads)
    - **Runtime**: Bun
    - **Interactivity**: Lucide icons, Drag-and-drop section management
    - **Authentication**: Clerk Auth

## Building and Running

### Prerequisites
- [Bun](https://bun.sh/) installed.
- PostgreSQL database.
- Clerk API keys (set in `.env`).

### Commands
- **Development Server**: `bun dev` - Starts the development server at http://localhost:3000.
- **Build**: `bun build` - Compiles the application for production.
- **Start**: `bun start` - Runs the production build.
- **Lint**: `bun lint` - Runs ESLint for code quality checks.
- **Database**:
    - `bunx prisma generate`: Generate Prisma client.
    - `bunx prisma db push`: Sync schema with database (development).
    - `bunx prisma migrate dev`: Create and run migrations.
    - `bunx prisma studio`: Open Prisma Studio to view/edit data.

## Project Structure

- `prisma/`: Contains `schema.prisma` (Models: `User`, `Page`, `Lead`).
- `src/app/`: Next.js App Router directory for layouts and pages.
    - `[slug]/`: Dynamic route for published landing pages.
    - `dashboard/`: User dashboard for managing pages and leads.
    - `editor/`: Visual builder interface.
- `src/lib/`: Core utilities, server actions, and schemas.
    - `prisma.ts`: Prisma Client singleton.
    - `schema.ts`: Zod schemas for `PageContent`, `PageSettings`, `LeadForm`, etc.
    - `actions.ts`: Server actions for CRUD operations on pages and leads.
- `src/components/themes/`: Theme Registry and individual theme implementations (`modern`, `minimalist`, `bold`).

## Development Conventions

- **Content Validation**: All page content and settings must conform to Zod schemas in `src/lib/schema.ts`.
- **Database Access**: Use the Prisma client exported from `src/lib/prisma.ts`.
- **Server Actions**: Use server actions in `src/lib/actions.ts` for all database mutations.
- **Authentication**: Protected routes (`/dashboard`, `/editor`) require Clerk authentication.
- **Leads**: Lead capture forms support optional fields (email/message) to accommodate diverse use cases like real estate (name + phone priority).

## Roadmap (Current Progress)

- [x] **Phase 1: Foundation**: App setup, DB schema, Zod validation.
- [x] **Phase 2: Theme Framework Engine**: Theme Registry and component typings.
- [x] **Phase 3: The Builder Interface**: Dashboard and live editor view.
- [x] **Phase 4: Publishing & Edge Delivery**: Dynamic routing, ISR, and metadata.
- [x] **Phase 5: Dynamic Sections Refactor**: Discriminated union schemas for flexible page blocks.
- [x] **Phase 6: Enhanced Editor & Section Management**: Drag-and-drop, section CRUD, and refined UX.
- [x] **Phase 7: Additional Themes & Polish**: New themes, global settings, and Clerk auth.
- [x] **Phase 8: Product Features for Real Usage**: Lead capture, script injection, testimonials, image uploads, and AI generation.

Refer to `task.md` for a detailed task list and progress tracking.
