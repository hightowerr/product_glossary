"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const SearchBar = (): JSX.Element => {
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
        <div className="w-full max-w-md relative px-2 xs:px-0">
            <input
                type="text"
                placeholder="e.g., Algorithm, API, Debugging"
                className="w-full p-2 xs:p-3 text-sm xs:text-base border rounded mb-4 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition-colors"
                value={searchTerm}
                onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
            <div className="flex justify-between">
                <button
                    className="w-[48%] bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                    onClick={handleSearch}
                >
                    Search
                </button>
                <button 
                    className="w-[48%] bg-gray-200 text-indigo-600 py-2 rounded hover:bg-gray-300 transition-colors"
                    onClick={handleFeelingLucky}
                >
                    Feeling Lucky
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
