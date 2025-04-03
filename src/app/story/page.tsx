import GradientBackground from "@/components/gradbg";
import CentralNavbar from "@/components/navigate";

export default function Story() {
    return (
        <>
            <GradientBackground />
            <CentralNavbar />
            <main className="relative h-screen w-screen overflow-x-hidden flex flex-col justify-center">
                <div className="flex flex-col items-center w-screen py-16 tracking-tighter text-center max-w-3xl mx-auto">
                    <h1 className="font-playfair text-6xl font-semibold tracking-[-0.08em] opacity-0 animate-fadeUp delay-100">
                        About  <span className="bg-clip-text text-white/30 bg-gradient-to-r from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]">
                            Parable.
                        </span>
                    </h1>
                    <p className="text-xl font-light mt-6 opacity-0 animate-fadeUp delay-200">
                        language is more than just words—it’s rhythm, culture, and memory.
                        at parable, we celebrate the way people truly speak, from regional slang
                        to stories passed down through generations. every phrase carries history,
                        and we’re here to keep it alive.
                    </p>
                    <p className="text-xl font-light mt-4 opacity-0 animate-fadeUp delay-300">
                        our community curates stories in every language, embracing dialects
                        that don’t always make it to textbooks. we believe language grows best
                        when it’s spoken, shared, and remixed by the people who use it daily.
                        every voice matters, and every story belongs.
                    </p>
                    <p className="text-xl font-light mt-4 opacity-0 animate-fadeUp delay-400">
                        whether it’s a childhood tale, an inside joke, or a phrase only your
                        hometown understands, parable is a space for words that feel like home.
                        this is a place where language stays alive, shaped by the people who
                        live it. welcome to a world where every word has a story.
                    </p>
                </div>

                <div className="absolute flex flex-col w-screen justify-center items-center text-white/20 text-sm font-light bottom-0 pb-8 opacity-0 animate-fadeUp delay-500">
                    <p>© 2025 Parable - A Multilingual Community. All rights reserved.</p>
                </div>
            </main>
        </>
    );
}
