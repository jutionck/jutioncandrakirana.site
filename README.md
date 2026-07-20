# Jution Candra Kirana - Personal Website & Portfolio

A modern, responsive personal website and blog built with Next.js 16 and Tailwind CSS v4. This project serves as a professional portfolio and content platform for Jution Candra Kirana, a Full-stack Developer and Tech Educator.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Geist & Geist Mono
- **Package Manager:** pnpm

## ✨ Features

- **Modern Landing Page:** Includes Hero, Stats, Skills, Portfolio, Experience, and Contact sections.
- **Blog System:** Markdown-based blog with listing and detail pages.
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
│   ├── blog/           # Blog listing and detail pages
│   ├── globals.css     # Global styles and Tailwind theme configuration
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main landing page
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   └── ...             # Feature-specific components (Hero, Footer, etc.)
├── lib/                # Utility functions and data
│   ├── data.ts         # Centralized data for blog posts
│   └── utils.ts        # Helper functions
├── public/             # Static assets (images, icons)
└── styles/             # Additional style files
```

> **Note:** The `backend/` directory contains a *planned* microservices scaffold (Docker Compose, Nginx, per-service Dockerfiles). It is not yet implemented — the services have no application source code and are not wired up to the frontend above. The live site is fully static/data-driven and does not depend on `backend/`.

## 👤 Author

**Jution Candra Kirana**

- Website: [jutioncandrakirana.site](https://jutioncandrakirana.site)
- GitHub: [@jutionck](https://github.com/jutionck)
- LinkedIn: [Jution Candra Kirana](https://linkedin.com/in/jutionck)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
