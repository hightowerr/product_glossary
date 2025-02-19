import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Terms Glossary | Complete List of Tech Definitions',
  description: 'Browse our comprehensive glossary of product and technology terms. Each term includes simple definitions and real-world analogies.',
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
