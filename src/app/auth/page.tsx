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

      // 🔹 Redirect to home/dashboard after successful auth
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <GradientBackgroundFuller />
      <div className="flex items-center h-screen justify-center p-6 tracking-tighter">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-semibold mb-4 drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]">
            {isLogin ? "Enter Parable." : "Join Parable."}
          </h1>

          {/* 🔹 Auth Form */}
          <form className="w-80 p-4 border rounded-lg shadow-md" onSubmit={handleAuth}>
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
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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
      </div>
    </div>
  );
}

