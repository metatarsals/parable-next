"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { supabase } from "@/lib/supabaseClient"; 
import GradientBackgroundFuller from "@/components/gradbg-fuller";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      let result;

      if (isLogin) {
        // 🔹 Supabase Login
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        // 🔹 Supabase Sign-Up
        result = await supabase.auth.signUp({ email, password });
      }

      if (result.error) throw result.error; // Handle errors

      router.push("/upload");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    }    
  };

  return (
    <div className="overflow-hidden min-h-screen flex flex-col items-center justify-center relative">
    <GradientBackgroundFuller />

    {/* Content Wrapper */}
    <div className="flex flex-col items-center px-6 flex-grow justify-center">
      <h1 className="text-5xl font-semibold mb-6 text-center drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]">
        {isLogin ? "Enter Parable." : "Join Parable."}
      </h1>

      {/* 🔹 Auth Form */}
      <form className="w-full max-w-sm p-4 border rounded-lg shadow-md" onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 mb-3 border rounded" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-2 mb-3 border rounded" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔹 Show error message if auth fails */}
        {error && <p className="text-red-500 text-sm mb-3">{error}. Please check your inbox.</p>}

        <button 
          className="w-full p-2 from-[#6a5acd] via-[#5f4b8b] to-[#4682b4] bg-gradient-to-r text-white rounded cursor-pointer">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* 🔹 Toggle Login/Signup */}
      <button 
        className="mt-4 text-indigo-300 cursor-pointer" 
        onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New here? Sign up" : "Already have an account? Login"}
      </button>
    </div>

    {/* 🔹 Footer (positioned at bottom but does NOT break centering) */}
    <div className="pb-4 text-white/20 text-sm font-light opacity-75">
      <p>© 2025 Parable - A Multilingual Community. All rights reserved.</p>
    </div>
  </div>


  );
}

