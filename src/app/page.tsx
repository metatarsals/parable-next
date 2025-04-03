import { GlobeDemo } from "@/components/globe-hero";
import GradientBackground from "@/components/gradbg";
import CentralNavbar from "@/components/navigate";

export default function Home() {
  return (
    <>
    <GradientBackground/>
    <CentralNavbar/>
    <GlobeDemo/>
    <div className="absolute flex flex-col w-screen justify-center items-center text-white/20 text-sm font-light bottom-0 pb-8">
          <p>© 2025 Parable - A Multilingual Community. All rights reserved.</p>
    </div>
    </>
  );
}
