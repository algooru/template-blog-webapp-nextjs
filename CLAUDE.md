# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 blog application using the App Router, integrated with Contentful CMS for content management. It features internationalization (en-US/de-DE), GraphQL with code generation, and Tailwind CSS styling.

## Development Commands

```bash
# Install dependencies (uses Yarn)
yarn

# Development server (runs on port 3023)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Linting and type checking
yarn lint
yarn type-check

# GraphQL code generation
yarn graphql-codegen:generate
yarn graphql-codegen:watch
```

## Architecture Overview

### Data Fetching & GraphQL
- Uses GraphQL with Contentful's API for all content
- Type-safe GraphQL client generated from schema at `src/lib/__generated/sdk.ts`
- GraphQL queries/fragments located in `src/lib/graphql/`
- Two clients: production (`client`) and preview (`previewClient`) in `src/lib/client.ts`
- Run `yarn graphql-codegen:generate` after modifying `.graphql` files

### App Router Structure
- `src/app/[locale]/` - Locale-aware pages (supports en-US, de-DE)
- `src/app/[locale]/page.tsx` - Landing page with featured articles
- `src/app/[locale]/[slug]/page.tsx` - Individual blog post pages
- Uses Server Components with async data fetching

### Component Organization
- `src/components/features/` - Domain-specific components:
  - `article/` - Blog post components (ArticleHero, ArticleContent, ArticleTileGrid)
  - `contentful/` - CMS integration (CtfImage, CtfRichText, CtfPreviewProvider)
  - `language-selector/` - i18n UI components
- `src/components/shared/` - Reusable utilities
- `src/components/templates/` - Layout components (Header, Footer)

### Internationalization
- Configuration in `src/i18n/config.ts`
- Translation files in `public/locales/{locale}/common.json`
- Use `initTranslations()` server-side and `useTranslation()` client-side
- Middleware handles locale detection and routing

### Contentful Integration
- Live preview enabled with `@contentful/live-preview`
- Draft mode API route at `src/app/api/enable-draft/route.ts`
- Rich text rendering with embedded entries support
- Content types: PageBlogPost, PageLanding, ComponentRichImage

## Environment Variables

Required for development (copy from `.env.example`):
- `CONTENTFUL_SPACE_ID` - Contentful space identifier
- `CONTENTFUL_ACCESS_TOKEN` - Content Delivery API token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` - Content Preview API token
- `CONTENTFUL_PREVIEW_SECRET` - Secret for preview mode authentication

## Development Workflow

1. **Content Changes**: Modify GraphQL fragments → Run `yarn graphql-codegen:generate` → Update components
2. **New Pages**: Follow locale-aware routing patterns in `src/app/[locale]/`
3. **Styling**: Uses Tailwind CSS with custom configuration
4. **Type Safety**: Components should use generated GraphQL types from `src/lib/__generated/sdk.ts`

## Git Hooks & Quality

- Husky pre-commit hooks run TypeScript compilation and lint-staged
- ESLint + Prettier configured for code formatting
- Type checking must pass before commits
- Use `--noVerify` flag only when necessary

## Testing & Building

- Always run `yarn type-check` before committing
- Build process includes GraphQL codegen validation
- Preview mode available for content editing workflow