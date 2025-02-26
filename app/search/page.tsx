import type { Metadata } from 'next';
import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const term = searchParams.term as string ?? "";
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

export default function SearchPage(): React.ReactElement {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
