# SaaS Landing Page Builder - Task Tracker

## Phase 1: Foundation ✅
- [x] Initialize Next.js app, install deps, Prisma setup
- [x] Define Zod schemas and database models

## Phase 2: Theme Framework Engine ✅
- [x] ThemeComponents typings, ThemeRegistry, dummy themes

## Phase 3: The Builder Interface ✅
- [x] Dashboard, Editor View, Live preview

## Phase 4: Publishing & Edge Delivery ✅
- [x] Dynamic routing, ISR, SEO metadata

## Phase 5: Dynamic Sections Refactor ✅
- [x] Discriminated union schemas, dynamic block rendering

## Phase 6: Enhanced Editor & Section Management ✅
- [x] Section CRUD, drag-and-drop, visibility toggles

## Phase 7: Additional Themes & Polish ✅
- [x] Bold theme, global settings, Clerk auth, create/delete pages
- [x] Theme preview thumbnails → Theme Gallery Modal (scalable)

## Phase 8: Product Features for Real Usage ✅
- [x] 1. Prisma schema: Add `Lead` model + `headScript`/`bodyScript` to `Page`
- [x] 2. Zod schema: Add `LeadFormSchema`, `TestimonialSchema`, `ScriptInjectionSchema`
- [x] 3. Theme metadata: Add `ThemeMeta` + `ThemeEntry`, refactor registry
- [x] 4. Theme Gallery Modal: Refactor to data-driven from `getAllThemes()`
- [x] 5. Page Duplication: `duplicatePage` action + dashboard UI
- [x] 6. Script Injection: `ScriptEditor.tsx` + Settings tab integration
- [x] 7. Script rendering: Inject scripts into `[slug]/page.tsx`
- [x] 8. Demo viewer: `demo-data.ts` + `/demo/[themeId]` route
- [x] 9. Lead form block: Add to all 3 themes + `LeadFormEditor.tsx` (Supports Real Estate: Name+Phone priority)
- [x] 10. Lead API + Dashboard: `POST /api/leads` + `/dashboard/leads` page
- [x] 11. Testimonials block: Add to all 3 themes + `TestimonialsEditor.tsx`
- [x] 12. Image Upload: Integrate simulated `ImageUpload.tsx` widget
- [x] 13. AI Content Generation: API route + "AI Generate" button in editor
- [x] 14. Build + lint verification
