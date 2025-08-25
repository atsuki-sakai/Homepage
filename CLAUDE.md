# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual Next.js 15 application using the App Router with React 19 and TypeScript. It's built on the Tailwind Plus Studio template and features internationalization (i18n) with Sanity CMS for content management.

## Development Commands

**Primary commands:**
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

**Sanity CMS (in sanity-cms/ directory):**
- Navigate to `sanity-cms/` and run Sanity Studio commands there
- Sanity Studio is configured separately with its own package.json

## Architecture & Key Technologies

### Internationalization (i18n)
- **Locales**: Japanese (`ja`) and English (`en`) 
- **Default locale**: Japanese (`ja`)
- **URL structure**: Always prefixed with locale (`/ja/...`, `/en/...`)
- **Configuration**: `src/i18n/routing.ts` and `src/i18n/request.ts`
- **Messages**: Located in `messages/ja.json` and `messages/en.json`
- **Middleware**: `src/middleware.ts` handles locale routing

### Content Management with Sanity CMS
- **Project ID**: `t62e3xha` 
- **Dataset**: `production`
- **Content types**: Blog posts and News items
- **Localization**: Uses internationalized arrays for multilingual content
- **Client configuration**: `src/lib/sanity.ts` 
- **Helper functions**: `getLocalizedValue()` and `getLocalizedBody()` for content retrieval

### Next.js Configuration
- **MDX support**: Configured for blog and work case studies
- **Page extensions**: `.js`, `.jsx`, `.ts`, `.tsx`, `.mdx`
- **Custom MDX layouts**: Different layouts for blog (`@/app/blog/wrapper`) and work (`@/app/work/wrapper`)
- **Code highlighting**: Shiki with CSS variables theme
- **Image processing**: Automatic image imports via recma-import-images

### UI Framework
- **Styling**: Tailwind CSS v4 with PostCSS
- **Components**: Shadcn/ui components (configured in `components.json`)
- **Animations**: Framer Motion
- **Typography**: Custom typography plugin for MDX content

## Project Structure

```
src/
├── app/[locale]/          # Internationalized pages
│   ├── blog/             # Blog section with MDX support
│   ├── news/             # News section 
│   ├── work/             # Case studies with MDX
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── process/          # Process page
├── components/           # Reusable components
├── i18n/                # Internationalization config
├── lib/                 # Utilities (Sanity client, utils)
└── styles/              # Global styles and typography

sanity-cms/              # Separate Sanity Studio project
├── schemaTypes/         # Content schemas (blog, news)
└── sanity.config.ts     # Sanity configuration
```

## Content Management Patterns

### Blog Posts
- Fetched via `getBlogPosts()`, `getBlogPost()` functions
- Support pagination, categories, and localization
- MDX content with custom wrapper layouts

### News Items  
- Fetched via `getNews()`, `getNewsItem()` functions
- Similar structure to blog posts but simpler schema

### Localized Content Handling
- All Sanity content uses internationalized arrays
- Use `getLocalizedValue()` for simple fields (title, description)
- Use `getLocalizedBody()` for rich text content
- Fallback to Japanese (`ja`) if content not available in requested locale

## Development Workflow

1. **Content changes**: Edit in Sanity Studio (separate project in `sanity-cms/`)
2. **Component development**: Follow existing patterns in `src/components/`
3. **New pages**: Add to appropriate locale directory under `src/app/[locale]/`
4. **Internationalization**: Add translations to both `messages/ja.json` and `messages/en.json`
5. **Styling**: Use Tailwind classes, follow existing component patterns

## Important Notes

- Always test both locales when making changes
- Sanity content requires specific handling for internationalized arrays
- MDX files automatically get appropriate wrapper layouts based on location
- The project uses Next.js 15 App Router patterns throughout