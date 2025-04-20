"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import GradientBackgroundFuller from "@/components/gradbg-fuller";
import CentralNavbar from "@/components/navigate";

interface Word {
    id: string;
    word: string;
    meaning: string;
    example_usage: string;
    language_code: string;
}

export default function Dictionary() {
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                console.log("Fetching words...");
                const { data, error } = await supabase
                    .from("words")
                    .select("id, word, meaning, example_usage, language_code")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Supabase Error:", error);
                    throw error;
                }

                console.log("Words Data:", data);
                if (data) setWords(data);
            } catch (err) {
                console.error("Fetch Error:", err);
            }
        };

        fetchWords();
    }, []);

    return (
        <>
            <GradientBackgroundFuller />
            <CentralNavbar />

            {/* Dictionary Section - Added padding to avoid navbar overlap */}
            <div className="pt-36 px-10 tracking-tighter">  
                <h2 className="text-6xl font-bold text-white/10 text-center mb-8">Discover words and culture at one place.</h2>
                {words.length === 0 ? (
                    <p className="text-center text-gray-500">No words found. Be the first to contribute!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {words.map((word) => (
                            <div 
                            key={word.id} 
                            className="relative p-6 border rounded-lg shadow-lg bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg backdrop-saturate-150 border-gray-300/50 dark:border-gray-700/50"
                        >
                            {/* Language Badge - Positioned Top Right */}
                            <div className="absolute top-2 right-2 px-2 py-1 text-sm">
                            <p className="text-gray-700 dark:text-gray-300 italic">{word.language_code.toUpperCase()}</p>
                            </div>
                        
                            {/* Word with Gradient Text */}
                            <h3 className="text-5xl font-bold text-purple-600/">
                                <span className="bg-clip-text text-white/30 bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]">
                                    {word.word}
                                </span>
                            </h3>
                        
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{word.meaning}</p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Example: <em>&quot;{word.example_usage}&quot;</em></p>
                        </div>                        
                        ))}
                    </div>
                )}
            </div>

            {/* Add Word Section - Adjusted height to account for navbar */}
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                        Want to add a new word?
                    </p>
                    <button 
                        className="mt-4 px-6 py-3 text-lg font-thin bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] text-white rounded-xl cursor-pointer"
                        onClick={() => window.location.href = "/auth"}
                    >
                        Add a Word
                    </button>
                </div>
            </div>
        </>
    );
}
