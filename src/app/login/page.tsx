"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-white/5 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] bg-green-500/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-white tracking-tight mb-3">
              Welcome back.
            </h2>
            <p className="text-white/40 font-semibold text-sm uppercase tracking-widest">
              Enter your credentials to access dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold p-4 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-widest uppercase text-white/40 px-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-black/40 border border-white/8 rounded-2xl px-5 py-4 text-white text-base placeholder-white/20 outline-none focus:border-white/25 transition-all font-medium"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-widest uppercase text-white/40 px-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/40 border border-white/8 rounded-2xl px-5 py-4 pr-14 text-white text-base placeholder-white/20 outline-none focus:border-white/25 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/70 transition-colors p-1"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black py-5 px-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base uppercase tracking-widest shadow-xl shadow-white/5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
