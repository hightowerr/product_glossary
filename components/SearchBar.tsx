"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
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
        } catch (error) {
            console.error("Error fetching random term:", error);
        }
    };

    return (
        <div className="w-full max-w-md">
            <input
                type="text"
                placeholder="e.g., Algorithm, API, Debugging"
                className="w-full p-3 border rounded mb-4"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <div className="flex justify-between">
                <button
                    className="w-[48%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={handleSearch}
                >
                    Search
                </button>
                <button 
                    className="w-[48%] bg-gray-200 text-blue-500 py-2 rounded hover:bg-gray-300"
                    onClick={handleFeelingLucky}
                >
                    Feeling Lucky
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
