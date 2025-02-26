import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Glossary - Home | Product Terms Explained Simply',
  description: 'Search and understand product terminology with AI-powered explanations and real-life analogies. Perfect for product managers and tech professionals.',
};


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
      {/* Title and Description */}
      <div className="text-center max-w-content w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-4">AI Glossary</h1>
        <p className="text-gray-600 text-center mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-4 text-sm sm:text-base">
          Your go-to resource for understanding AI terminology! <br className="hidden sm:block" />
          Key product terms explained by AI in plain English (with Real-Life analogies).
        </p>
      </div>

      {/* Search Container */}
      <div className="w-full max-w-md px-4 sm:px-0">
        {/* Search Bar */}
        <SearchBar />
        {/* Search Results */}
        <SearchResults />
      </div>
    </div>
  );
}
