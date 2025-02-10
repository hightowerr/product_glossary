'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';

interface Term {
  id: string;
  Term: string;
}

export default function GlossaryPage() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      console.log('Fetching terms...');
      try {
        const termsCollection = collection(db, 'terms'); // Changed from 'Terms' to 'terms'
        console.log('Collection reference created:', termsCollection); // Debug log
        const querySnapshot = await getDocs(termsCollection);
        console.log('Query snapshot received:', querySnapshot.size); // Log number of docs
        const termsList = querySnapshot.docs.map(doc => {
          console.log('Document data:', doc.data()); // Log each document's data
          return {
            id: doc.id,
            ...doc.data(),
          } as Term;
        });

        console.log('Terms fetched:', termsList);

        termsList.sort((a, b) => a.Term.localeCompare(b.Term));
        setTerms(termsList);
      } catch (err) {
        console.error('Error fetching terms:', err);
        setError(`Failed to load terms: ${err.message}`); // More detailed error message
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Terms Glossary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {terms.length === 0 && (
          <p className="text-gray-500 col-span-full">No terms found</p>
        )}
        {terms.map((term) => (
          <div 
            key={term.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
          >
            <Link 
              href={`/search?term=${encodeURIComponent(term.Term)}`}
              className="block"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                  {term.Term}
                </h2>
                <svg 
                  className="w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
