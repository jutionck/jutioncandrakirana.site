# Jution Candra Kirana - Personal Website & Portfolio

A modern, responsive personal website and blog built with Next.js 16 and Tailwind CSS v4. This project serves as a professional portfolio and content platform for Jution Candra Kirana, a Full-stack Developer and Tech Educator.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **CMS:** [Sanity](https://www.sanity.io/) (embedded Studio at `/studio`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Geist & Geist Mono
- **Package Manager:** pnpm

## ✨ Features

- **Modern Landing Page:** Includes Hero, Stats, Skills, Portfolio, Experience, and Contact sections — all content editable via Sanity Studio.
- **Blog System:** Markdown-based blog with listing and detail pages, per-post SEO metadata, and a dynamic sitemap.
- **Theme System:** Soft Light mode (default) and Dark mode support using `oklch` color spaces.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Performance:** Optimized with Next.js Speed Insights and Analytics.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jutionck/jutioncandrakirana.site.git
   cd jutioncandrakirana.site
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables — copy the Sanity project ID/dataset and tokens into `.env.local` (see [Content Management](#-content-management-sanity) below).

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

To build the application for production:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 📂 Project Structure

```
├── app/                # Next.js App Router pages and layouts
│   ├── api/revalidate/ # Sanity webhook handler (on-demand ISR)
│   ├── blog/           # Blog listing and detail pages
│   ├── studio/         # Embedded Sanity Studio (/studio)
│   ├── globals.css     # Global styles and Tailwind theme configuration
│   ├── layout.tsx      # Root layout (fetches siteSettings/profile for metadata)
│   └── page.tsx        # Main landing page
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   └── ...             # Feature-specific components (Hero, Footer, etc.) — fetch their own content from Sanity
├── sanity/              # Sanity schema types, GROQ queries, client helpers
├── scripts/
│   └── migrate-to-sanity.ts  # One-off seed script (idempotent, supports --dry-run)
├── lib/
│   └── utils.ts         # Helper functions
├── public/              # Static assets (favicons, app icons — not CMS-managed)
└── styles/               # Additional style files
```

> **Note:** The `backend/` directory contains a *planned* microservices scaffold (Docker Compose, Nginx, per-service Dockerfiles). It is not implemented — the services have no application source code and are not wired up to the frontend. It is unrelated to the Sanity CMS integration above.

## ✏️ Content Management (Sanity)

All site content — blog posts, hero copy, stats, skills, portfolio, experience, education, certifications, profile/bio, and SEO metadata — lives in Sanity, not in the codebase. Editing content does **not** require a code change or redeploy.

### Setup

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage) (no CLI login needed).
2. Copy `.env.local` values from your project:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
   SANITY_STUDIO_PROJECT_ID=       # same as NEXT_PUBLIC_SANITY_PROJECT_ID
   SANITY_STUDIO_DATASET=production
   SANITY_API_WRITE_TOKEN=          # Editor-role token, manage.sanity.io > API > Tokens — used only by the seed script, never exposed client-side
   SANITY_REVALIDATE_SECRET=        # any random string — used to verify the webhook below
   ```
3. Seed initial content (safe to re-run; writes deterministic IDs):
   ```bash
   pnpm migrate:sanity            # writes to Sanity
   pnpm migrate:sanity --dry-run  # preview only, no writes
   ```
4. Edit content at `/studio` (e.g. `http://localhost:3001/studio` in dev).

### Editing content

Studio has three singleton documents (**Site Settings**, **Profile**, **Homepage Copy**) plus collections for **Blog Post**, **Stat**, **Skill Category**, **Portfolio Project**, **Experience**, **Education**, and **Certification**. Changes appear on the live site within an hour automatically (ISR fallback), or instantly once the webhook below is configured.

### On-demand revalidation (webhook)

Without this, content updates still go live within ~1 hour via ISR. To make edits appear instantly:

1. In manage.sanity.io → API → Webhooks, add a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: Create, Update, Delete — all document types
   - HTTP method: `POST`
   - Projection: `{"_type": _type, "slug": slug.current}`
   - Secret: same value as `SANITY_REVALIDATE_SECRET`
2. Also add your production domain, `http://localhost:3001`, and `https://*.vercel.app` to CORS Origins in the same project (needed for the Studio to talk to the API from those hosts).

## 👤 Author

**Jution Candra Kirana**

- Website: [jutioncandrakirana.site](https://jutioncandrakirana.site)
- GitHub: [@jutionck](https://github.com/jutionck)
- LinkedIn: [Jution Candra Kirana](https://linkedin.com/in/jutionck)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).