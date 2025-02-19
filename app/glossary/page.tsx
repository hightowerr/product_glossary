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
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Product Terms Glossary</h1>
      <div className="space-y-6">
        {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => {
          const letterTerms = terms.filter((term) => term.Term[0].toUpperCase() === letter);
          return (
            <div key={letter}>
              <h2 className="text-xl font-semibold text-gray-900">{letter}</h2>
              {letterTerms.length > 0 && (
                <ul className="ml-4 mt-2 space-y-1">
                  {letterTerms.map((term) => (
                    <li key={term.id}>
                      <Link
                        href={`/search?term=${encodeURIComponent(term.Term)}`}
                        className="text-gray-900 hover:text-indigo-900"
                      >
                        {term.Term}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
