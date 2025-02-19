import type { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams | Record<string, string | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const term =
    typeof sp.get === "function" ? sp.get("term") ?? "" : sp.term ?? "";
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

export default function SearchPage(): JSX.Element {
  return <SearchPageContent />;
}
