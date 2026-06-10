# Agent Guide for blog.realrz.com

This file contains the context, conventions, and architectural decisions that agents working on this codebase should know.

## Project Overview

A personal software development blog built with Next.js. It renders MDX posts from the `posts/` directory as static pages. The blog is deployed behind an Nginx reverse proxy on port 9001.

## Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16.2.9 | App Router, Turbopack |
| React | React | 19.0.0 | Server Components by default |
| Language | TypeScript | 5.8.x | Strict null checks enabled |
| Styling | Tailwind CSS | 4.3.0 | CSS-first configuration (no `tailwind.config.js`) |
| Content | next-mdx-remote | 6.0.0 | RSC mode (`next-mdx-remote/rsc`) |
| Frontmatter | gray-matter | 4.0.3 | Parses YAML frontmatter from MDX |
| Syntax Highlight | shiki + rehype-pretty-code | 4.2.0 / 0.14.3 | Custom Tokyo Night theme |
| Package Manager | pnpm | — | Do not use npm |
| Linting | ESLint | 9.39.4 | Flat config (`eslint.config.mjs`) |

## Architecture

### App Router (RSC)

The project uses the Next.js App Router exclusively:

- `app/layout.tsx` — Root layout with Header, Footer, and main content area
- `app/page.tsx` — Home page listing all blog posts
- `app/[blog]/page.tsx` — Individual blog post pages (async Server Components)
- `pages/api/hello.ts` — Legacy API route (can be removed if not used)

All blog post pages are statically generated at build time via `generateStaticParams()`.

### Content System

Blog posts live in `posts/*.mdx`. Each post has YAML frontmatter:

```yaml
---
title: Post Title
date: "2024-03-03"
language: zh-CN
category: react
---
```

The `lib/posts.ts` module reads these files from disk:

- `getAllPosts()` — Returns metadata for all posts (no content)
- `getPostBySlug(slug)` — Returns full post including MDX content string

The MDX content is rendered with `MDXRemote` from `next-mdx-remote/rsc`:

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";
```

**Important:** MDX files should NOT contain `import` or `export` statements at the top level. Components and icons are provided externally via the `components` and `scope` props of `MDXRemote`. Any top-level imports/exports are stripped by `next-mdx-remote`'s built-in plugin. If you need components available in MDX, add them to the `components`/`scope` objects in `app/[blog]/page.tsx`.

### Styling

Tailwind CSS v4 uses a CSS-first configuration. The setup is:

- `app/global.css` — Imports Tailwind, registers the typography plugin, defines custom CSS variables, and sets prose overrides
- `postcss.config.js` — Uses `@tailwindcss/postcss` as the only PostCSS plugin
- No `tailwind.config.js` — configuration is done in CSS

The design uses a warm stone color palette (`#fafaf9` background, `#1c1917` text) with indigo (`#4338ca`) accents.

### Rehype Plugins (MDX Processing)

The following plugins are applied to every MDX post:

1. `rehype-slug` — Adds `id` attributes to headings
2. `rehype-autolink-headings` — Wraps headings in anchor links
3. `@jsdevtools/rehype-toc` — Generates a table of contents
4. `rehype-pretty-code` — Syntax highlighting via Shiki with a custom Tokyo Night theme loaded from `lib/themes/tokyo-night-color-theme.json`

## File Structure

```
app/
  [blog]/page.tsx       # Blog post detail page
  global.css            # Tailwind import + custom styles
  layout.tsx            # Root layout
  page.tsx              # Home page

components/
  BlogList/             # Post list with search
  Collapse/             # Collapsible section component
  Footer/               # Site footer
  GridList/             # Grid card list (used in MDX)
  Header/               # Sticky navigation header
  MDX/                  # MDX component overrides
    CustomLink.tsx      # Smart link (internal/external/anchor)

drafts/                 # Draft MDX posts (not built)
lib/
  codeHighlightOptions.ts   # Shiki / rehype-pretty-code config
  posts.ts                  # File-system post reading utilities
  themes/                   # Shiki theme JSON
posts/                  # Published MDX posts (source of truth)
```

## Key Conventions

### Path Aliases

- `~/*` maps to the project root (`.")
- `contentlayer/generated` alias was removed during the contentlayer migration

### Component Style

- Prefer function components over `const Foo: FC = () => ...`
- Use Tailwind utility classes exclusively (no inline styles)
- The `prose` class from `@tailwindcss/typography` handles article typography
- Custom prose overrides are in `app/global.css`

### MDX Components Available to Posts

These components are injected into every MDX file via `MDXRemote`:

- `Collapse` — Collapsible content sections
- `GridList` — Grid of cards with icons
- All `@heroicons/react/24/outline` icons (via `...HeroIcons` spread)
- `a` — Custom smart link component

If you add a new component that MDX posts should use, add it to both:
1. The `components` object in `app/[blog]/page.tsx` (for JSX rendering)
2. The `scope` object in `app/[blog]/page.tsx` (for variable references like `icon: SomeIcon`)

### Language & Content

- Posts are written in Chinese (`zh-CN`) or English (`en`)
- The `language` frontmatter field is required
- Dates should be ISO strings: `"2024-03-03"`

## Development Workflow

```bash
# Install dependencies (use pnpm, never npm)
pnpm install

# Start dev server on port 9001
pnpm dev

# Production build (also generates static pages)
pnpm build

# Serve production build locally
pnpm serve          # builds + starts on port 9001

# Lint
pnpm lint           # runs eslint .
```

## Deployment

The blog is deployed behind Nginx with a reverse proxy to port 9001:

```nginx
server {
    listen 80;
    server_name www.blog.realrz.com blog.realrz.com;
    location / {
        proxy_pass http://127.0.0.1:9001;
    }
}
```

Production process management uses PM2:

```bash
pm2 start npm --name "blog.realrz.com" -- run serve
```

## Recent Major Changes

If you're reading this after a long gap, here are the most important recent migrations:

1. **Contentlayer → next-mdx-remote** — Content was previously managed by Contentlayer (now archived). It was replaced with `next-mdx-remote/rsc` + `gray-matter` + manual file-system reading in `lib/posts.ts`.

2. **npm → pnpm** — Package manager switched to pnpm. `package-lock.json` was removed; `pnpm-lock.yaml` is the lockfile.

3. **Next.js 13 → 16** — Upgraded through Next.js 15 to 16.2.9. This included React 18 → 19, Turbopack as the default dev bundler, and the ESLint flat config migration.

4. **Tailwind CSS 3 → 4** — Complete configuration rewrite. `tailwind.config.js` was removed; Tailwind is now configured entirely in CSS via `@import "tailwindcss"` and `@plugin` directives.

## Known Issues / Quirks

- `suppressHydrationWarning` is set on `<body>` in `app/layout.tsx` to prevent warnings from browser extensions injecting attributes.
- `next-mdx-remote` options include `blockJS: false` and `blockDangerousJS: false` — without these, JavaScript expressions in MDX (like icon references in object literals) are stripped.
- The `.eslintrc.json` was replaced with `eslint.config.mjs` for ESLint 9 flat config compatibility.
