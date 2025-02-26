"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import SearchBar from "@/components/SearchBar";

interface TermData {
  id: string;
  Term: string;
  Definition: string;
  "Real-Life Analogy": string;
  Examples: string;
}

export default function SearchPageContent() {
  const [results, setResults] = useState<TermData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const term = searchParams.get("term") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (term.trim() === "") {
        setError("Please enter a search term.");
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "terms"),
          where("Term", "==", term.trim())
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<TermData, "id">;
          return { id: doc.id, ...data };
        });
        if (items.length === 0) {
          setError("No results found.");
        } else {
          setResults(items);
          console.log("Fetched items:", items); // eslint-disable-line no-console
        }
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [term]);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold my-4 text-indigo-600">Search Results for: {term}</h1>
        {loading && <p className="text-gray-800 font-medium text-center">Loading...</p>}
        {error && <p className="text-red-600 font-medium text-center">{error}</p>}
        {!loading &&
          !error &&
          results.map((result) => (
            <div
              key={result.id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-indigo-800 mb-2">
                {result.Term}
              </h2>
              <p className="mb-3 text-sm sm:text-base text-gray-900 font-medium">
                <strong className="text-gray-900">Definition:</strong> {result.Definition}
              </p>
              <p className="mb-3 text-sm sm:text-base text-gray-900 font-medium">
                <strong className="text-gray-900">Real-Life Analogy:</strong>{" "}
                {result["Real-Life Analogy"]}
              </p>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                <strong className="text-gray-900">Examples:</strong> {result.Examples}
              </p>
            </div>
          ))}

        {/* SearchBar centered on the page */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
