import { useEffect, useState } from 'react';
import type { Metadata } from 'next';

export const generateMetadata = async ({ searchParams }: { searchParams: { term: string } }): Promise<Metadata> => {
  const term = searchParams.term || '';
  return {
    title: `${term} - AI Glossary Definition and Examples`,
    description: `Learn about ${term} with simple explanations, real-life analogies, and practical examples. Part of our comprehensive tech glossary.`,
  };
};
import { useSearchParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import SearchBar from '@/components/SearchBar';

interface TermData {
  id: string;
  Term: string;
  Definition: string;
  RealTimeAnalogy: string;
  Examples: string;
}

export default function SearchPage() {
  const [results, setResults] = useState<TermData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const term = searchParams.get('term') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (term.trim() === '') {
        setError('Please enter a search term.');
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'terms'),
          where('Term', '==', term.trim())
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as TermData),
        }));
        if (items.length === 0) {
          setError('No results found.');
        } else {
          setResults(items);
          console.log('Fetched items:', items);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [term]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold my-4">Search Results for: {term}</h1>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && results.map(result => (
          <div key={result.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{result.Term}</h2>
            <p className="mb-3"><strong>Definition:</strong> {result.Definition}</p>
            <p className="mb-3"><strong>Real-Life Analogy:</strong> {result.RealTimeAnalogy || result['Real-Life Analogy']}</p>
            <p><strong>Examples:</strong> {result.Examples}</p>
          </div>
        ))}
        
        {/* SearchBar centered on the page */}
        <div className="flex justify-center mt-6">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
