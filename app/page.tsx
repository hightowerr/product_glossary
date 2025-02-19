import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Glossary - Home | Product Terms Explained Simply',
  description: 'Search and understand product terminology with AI-powered explanations and real-life analogies. Perfect for product managers and tech professionals.',
};


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      {/* Title and Description */}
      <h1 className="text-3xl xs:text-4xl font-bold text-indigo-600 mb-4">AI Glossary</h1>
      <p className="text-gray-600 text-center mb-6 xs:mb-8 max-w-2xl px-4 text-sm xs:text-base">
        Your go-to resource for understanding AI terminology! <br />
        Key product terms explained by AI in plain English (with Real-Life analogies).
      </p>

      {/* Search Bar */}
      <SearchBar />
      {/* Search Results */}
      <SearchResults />
    </div>
  );
}
