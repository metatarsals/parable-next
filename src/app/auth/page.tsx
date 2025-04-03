"use client"

import GradientBackgroundFuller from "@/components/gradbg-fuller";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
    <GradientBackgroundFuller/> 
    <div className="flex items-center h-screen justify-center p-6 tracking-tighter">
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-semibold mb-4 drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]">{isLogin ? "Enter Parable." : "Join Parable."}</h1>
      
      <form className="w-80 p-4 border rounded-lg shadow-md">
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" required />

        <button className="w-full p-2 from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] bg-gradient-to-r text-white rounded cursor-pointer">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <button className="mt-4 text-indigo-300 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New here? Sign up" : "Already have an account? Login"}
      </button>
      </div>
    </div>
    </div>
  );
}
