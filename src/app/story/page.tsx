"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import GradientBackgroundFuller from "@/components/gradbg-fuller";
import CentralNavbar from "@/components/navigate";
import { TextReveal } from "@/components/magicui/text-reveal";
import { SpinningText } from "@/components/magicui/spinning-text";

export default function Story() {
    const [stories, setStories] = useState<string[]>([]);

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

    return (
        <>
            <GradientBackgroundFuller />
            <CentralNavbar />
            <div className="flex flex-col items-center space-y-4 p-6">
                {stories.map((story, index) => (
                    <TextReveal
                        key={index}
                        className="p-4 w-full text-center rounded-lg"
                    >
                        {story}
                    </TextReveal>
                ))}

                {/* Add Contribution Section */}
                <div className="flex items-center justify-center h-screen">
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
            </div>

            <SpinningText className="fixed bottom-36 right-36">
                scroll down • scroll down • scroll down
            </SpinningText>
        </>
    );
}
