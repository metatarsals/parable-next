"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import GradientBackgroundFuller from "@/components/gradbg-fuller";
import CentralNavbar from "@/components/navigate";
import { TextReveal } from "@/components/magicui/text-reveal";
import { SpinningText } from "@/components/magicui/spinning-text";

export default function Story() {
    const [stories, setStories] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
        const fetchStory = async () => {
            try {
                console.log("Fetching story...");

                const { data, error } = await supabase
                    .from("story_contributions")
                    .select("content")
                    .order("id", { ascending: true });

                if (error) {
                    console.error("Supabase Error:", error);
                    throw error;
                }

                console.log("Supabase Data:", data);

                if (data && data.length > 0) {
                    setStories(data.map(entry => entry.content));
                } else {
                    setStories(["No stories found."]);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setStories(["Failed to load story."]);
            }
        };

        fetchStory();
    }, []);

    const handleTranslation = async () => {
        if (!stories.length) return;

        console.log("Translating page to:", selectedLanguage);

        const translatedStories: string[] = [...stories];

        for (let i = 0; i < stories.length; i++) {
            try {
                const response = await fetch(
                    `https://lingva.ml/api/v1/en/${selectedLanguage}/${encodeURIComponent(stories[i])}`
                );

                const data = await response.json();
                console.log("API Response:", data);

                translatedStories[i] = data.translation || "[Translation failed]";

                setStories([...translatedStories]);

            } catch (error) {
                console.error("Translation Error:", error);
                translatedStories[i] = "[Translation failed]";
                setStories([...translatedStories]);
            }
        }
    };

    return (
        <>
            <GradientBackgroundFuller />
            <CentralNavbar />
            <div className="flex flex-col items-center space-y-6 p-6">
                {/* 📜 Stories Display (Translated in Real-Time) */}
                {stories.map((story, index) => (
                    <TextReveal
                        key={index}
                        className="p-4 w-full max-w-2xl text-center rounded-lg"
                        style={{ color: index % 2 === 0 ? "#a855f7" : "#6366f1" }} // Purple & Indigo
                    >
                        {story}
                    </TextReveal>
                ))}

                {/* ➕ Add Contribution Section */}
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                        Want to add your own part?
                    </p>
                    <button
                        className="mt-4 px-6 py-3 text-lg font-thin bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] text-white rounded-xl cursor-pointer"
                        onClick={() => window.location.href = "/auth"}
                    >
                        Add Your Contribution
                    </button>
                </div>
            </div>

            {/* 📌 Fixed Translate Section at Bottom-Left */}
            <div className="fixed bottom-5 left-5 bg-[#1e1e2e] p-4 rounded-xl shadow-lg w-64">
                <div className="flex flex-col items-center">
                    <label className="text-lg font-medium text-gray-300 whitespace-nowrap">
                        Translate to:
                    </label>
                    <select
                        className="mt-2 px-4 py-2 text-white bg-[#333344] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="hi">Hindi</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                    </select>

                    {/* 🆕 Centered Translate Button */}
                    <button
                        onClick={handleTranslation}
                        className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                    >
                        Translate
                    </button>
                </div>
            </div>

            <SpinningText className="fixed bottom-36 right-36">
                scroll down • scroll down • scroll down
            </SpinningText>
        </>
    );
}