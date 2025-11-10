import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Jution Candra Kirana - Featured projects showcasing expertise in full-stack development, AI/ML, product leadership, and training programs. Including Sobat Psikotes, Student Pathfinder, AI CV Evaluator, and corporate training at Enigma Camp.',
  alternates: {
    canonical: 'https://jutioncandrakirana.site/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
