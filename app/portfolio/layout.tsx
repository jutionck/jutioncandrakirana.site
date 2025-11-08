import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Featured projects showcasing expertise in full-stack development, product leadership, and training programs. Including Sobat Psikotes, LASIK JEC, FOILA, and corporate training at Enigma Camp.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
