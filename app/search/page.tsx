import type { Metadata } from 'next';

export const generateMetadata = async ({ searchParams }: { searchParams: { term: string } }): Promise<Metadata> => {
  const term = searchParams.term || '';
  return {
    title: `${term} - AI Glossary Definition and Examples`,
    description: `Learn about ${term} with simple explanations, real-life analogies, and practical examples. Part of our comprehensive tech glossary.`,
  };
};

import SearchPageContent from "./SearchPageContent";

export default function SearchPage() {
  return <SearchPageContent />;
}
