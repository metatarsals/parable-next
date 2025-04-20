"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import GradientBackgroundFuller from "@/components/gradbg-fuller";
import CentralNavbar from "@/components/navigate";

export default function UploadPage() {
    const [activeTab, setActiveTab] = useState("story");
    const [userId, setUserId] = useState<string | null>(null);

    // Story Contribution State
    const [storyContent, setStoryContent] = useState("");
    const [storyLanguage, setStoryLanguage] = useState("");

    // Word Upload State
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const [exampleUsage, setExampleUsage] = useState("");
    const [wordLanguage, setWordLanguage] = useState("");

    // Fetch the logged-in user ID
    useEffect(() => {
        const fetchUser = async () => {
            const { data} = await supabase.auth.getUser();
            if (data?.user) setUserId(data.user.id);
        };
        fetchUser();
    }, []);

    // Handle Story Submission
    const handleStorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("User ID is missing. Please log in.");
            return;
        }

        const { data, error } = await supabase
            .from("story_contributions")
            .insert([
                {
                    story_id: "3fdc6041-3a87-47f3-8337-c879c1559359", // Fixed Story ID
                    user_id: userId,
                    content: storyContent,
                    language_code: storyLanguage,
                },
            ])
            .select("*");

        console.log("Story Insert:", data, error);

        if (error) {
            alert("Error submitting story: " + error.message);
        } else {
            alert("Story submitted successfully!");
            setStoryContent("");
            setStoryLanguage("");
        }
    };

    // Handle Word Submission
    const handleWordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("User ID is missing. Please log in.");
            return;
        }

        const { data, error } = await supabase
            .from("words")
            .insert([
                {
                    user_id: userId,
                    word,
                    meaning,
                    example_usage: exampleUsage,
                    language_code: wordLanguage,
                },
            ])
            .select("*");

        console.log("Word Insert:", data, error);

        if (error) {
            alert("Error submitting word: " + error.message);
        } else {
            alert("Word submitted successfully!");
            setWord("");
            setMeaning("");
            setExampleUsage("");
            setWordLanguage("");
        }
    };

    return (
        <>
            <GradientBackgroundFuller />
            <CentralNavbar />
            <div className="pt-36 px-10 tracking-tighter font-thin">  
                <h2 className="text-6xl font-semibold text-white/10 text-center mb-8">Contribute to Parable.</h2>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-6 font-thin">
                    <button 
                        className={`px-4 py-2 mx-2 cursor-pointer ${
                            activeTab === "story" 
                            ? "bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] rounded-md text-white border-2 border-white" 
                            : "bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] rounded-md text-white"
                        }`} 
                        onClick={() => setActiveTab("story")}
                    >
                        Story Contribution
                    </button>
                    <button 
                        className={`px-4 py-2 mx-2 cursor-pointer ${
                            activeTab === "word" 
                            ? "bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] rounded-md text-white border-2 border-white" 
                            : "bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] rounded-md text-white"
                        }`} 
                        onClick={() => setActiveTab("word")}
                    >
                        Word Upload
                    </button>
                </div>

                {/* Story Contribution Form */}
                {activeTab === "story" && (
                    <form onSubmit={handleStorySubmit} className="space-y-4">
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Write your story contribution..."
                            value={storyContent}
                            onChange={(e) => setStoryContent(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Language Code (e.g., EN, FR)"
                            value={storyLanguage}
                            onChange={(e) => setStoryLanguage(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full py-2 cursor-pointer bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] text-white rounded"
                        >
                            Submit Story
                        </button>
                    </form>
                )}

                {/* Word Upload Form */}
                {activeTab === "word" && (
                    <form onSubmit={handleWordSubmit} className="space-y-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Word"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Meaning"
                            value={meaning}
                            onChange={(e) => setMeaning(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Example Usage"
                            value={exampleUsage}
                            onChange={(e) => setExampleUsage(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Language Code (e.g., EN, FR)"
                            value={wordLanguage}
                            onChange={(e) => setWordLanguage(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full py-2 cursor-pointer bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] text-white rounded"
                        >
                            Submit Word
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
