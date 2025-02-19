import type { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const term = sp.get("term") ?? "";
  const fullTitle = `${term} - AI Glossary Definition and Examples`;
  // Ensure the title does not exceed 60 characters
  const safeTitle =
    fullTitle.length > 60 ? fullTitle.substring(0, 60) : fullTitle;
  return {
    title: safeTitle,
    description: `Learn about ${term} with simple explanations, real-life analogies, and practical examples. Part of our comprehensive tech glossary.`,
  };
}

import SearchPageContent from "./SearchPageContent";

export default function SearchPage() {
  return <SearchPageContent />;
}
