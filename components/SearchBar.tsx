"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const SearchBar = (): React.ReactElement => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const fetchSuggestions = async (searchText: string) => {
        if (searchText.trim() === '') {
            setSuggestions([]);
            return;
        }
        try {
            const q = query(
                collection(db, 'terms'),
                orderBy('Term'),
                startAt(searchText),
                endAt(searchText + "\uf8ff")
            );
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return data.Term as string;
            });
            setSuggestions(items);
        } catch (error: unknown) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(newValue);
        }, 300);
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return;
        }
        router.push(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleFeelingLucky = async () => {
        try {
            const termsRef = collection(db, 'terms');
            const querySnapshot = await getDocs(termsRef);
            
            if (!querySnapshot.empty) {
                const terms = querySnapshot.docs.map(doc => doc.data().Term);
                const randomTerm = terms[Math.floor(Math.random() * terms.length)];
                
                router.push(`/search?term=${encodeURIComponent(randomTerm)}`);
            }
        } catch (error: unknown) {
            console.error("Error fetching random term:", error); // eslint-disable-line no-console
        }
    };

    return (
        <div className="w-full relative">
            <div className="relative">
                <input
                    type="text"
                    placeholder="e.g., Algorithm, API, Debugging"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition-colors shadow-sm"
                    value={searchTerm}
                    onChange={handleInputChange}
                    aria-label="Search terms"
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-auto shadow-md">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base text-black"
                                onClick={() => {
                                    setSearchTerm(suggestion);
                                    setSuggestions([]);
                                    router.push(`/search?term=${encodeURIComponent(suggestion.trim())}`);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                    className="w-full sm:w-1/2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
                    onClick={handleSearch}
                >
                    Search
                </button>
                <button 
                    className="w-full sm:w-1/2 bg-gray-200 text-indigo-600 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base font-medium"
                    onClick={handleFeelingLucky}
                >
                    Feeling Lucky
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
