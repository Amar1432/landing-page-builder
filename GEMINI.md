# SaaS Landing Page Builder

This project is a headless, structured-content SaaS landing page builder with swappable themes. It allows users to create and manage landing pages by defining structured content (Hero, Features, Pricing, FAQ, Footer) and applying different visual themes.

## Project Overview

- **Purpose**: A platform for building and hosting structured SaaS landing pages.
- **Architecture**: Next.js App Router with React 19 and TypeScript.
- **State**: Phase 6 Complete. The project has a fully functional editor with dynamic section management, drag-and-drop reordering, and theme swapping.
- **Key Technologies**:
    - **Framework**: Next.js 16.1.6 (App Router)
    - **Styling**: Tailwind CSS 4
    - **Database**: PostgreSQL with Prisma ORM 7.4.2
    - **Validation**: Zod (for dynamic section content)
    - **Runtime**: Bun
    - **Interactivity**: Lucide icons, Drag-and-drop section management

## Building and Running

### Prerequisites
- [Bun](https://bun.sh/) installed.
- PostgreSQL database (or a connection string in `.env`).

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

- `prisma/`: Contains `schema.prisma` and database configuration.
- `src/app/`: Next.js App Router directory for layouts and pages.
- `src/lib/`: Core utilities and schemas.
    - `prisma.ts`: Prisma Client singleton.
    - `schema.ts`: Zod schemas for `PageContent` (Hero, Features, Pricing, etc.).
    - `actions.ts`: Server actions for updating and publishing pages.
- `public/`: Static assets (images, icons, etc.).

## Development Conventions

- **Content Validation**: All page content must conform to the `PageContentSchema` defined in `src/lib/schema.ts`.
- **Database Access**: Use the Prisma client exported from `src/lib/prisma.ts`.
- **Server Actions**: Use server actions in `src/lib/actions.ts` for all database mutations from the client.
- **Publishing**: Pages are only accessible at `/[slug]` if the `isPublished` flag is set to `true`. This can be toggled from the Editor.
- **Type Safety**: Maintain strict TypeScript typing. Ensure `PageContent` type is used when handling page data.
- **Components**: Follow a component-based architecture in `src/app`. Future phases will introduce a `ThemeRegistry` for swappable UI components.

## Roadmap (Current Progress)

- [x] **Phase 1: Foundation**: App setup, DB schema, Zod validation.
- [x] **Phase 2: Theme Framework Engine**: Theme Registry and component typings.
- [x] **Phase 3: The Builder Interface**: Dashboard and live editor view.
- [x] **Phase 4: Publishing & Edge Delivery**: Dynamic routing, ISR, and metadata.
- [x] **Phase 5: Dynamic Sections Refactor**: Discriminated union schemas for flexible page blocks.
- [x] **Phase 6: Enhanced Editor & Section Management**: Drag-and-drop, section CRUD, and refined UX.
- [ ] **Phase 7: Additional Themes & Polish**: New themes, global settings, and user auth.

Refer to `task.md` for a detailed task list and progress tracking.
