"use client";

import { useState, useTransition } from "react";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { m } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      if (isSignUp) {
        const result = await signup(formData);
        if (result?.error) {
          toast.error(result.error);
        } else if (result?.success) {
          toast.success(result.success);
          setIsSignUp(false);
        }
      } else {
        const result = await login(formData);
        if (result?.error) {
          toast.error(result.error);
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 relative z-10">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <GlassmorphismCard className="p-8 md:p-10 border border-black/5 dark:border-white/5">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {isSignUp
                ? "Sign up to access your profile dashboard"
                : "Sign in to manage your editing workspace details"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  disabled={isPending}
                  className="pl-11 h-12 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/30 h-12"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                  className="pl-11 h-12 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/30 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-12 rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all hover:scale-[1.02] cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isPending}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </GlassmorphismCard>
      </m.div>
    </div>
  );
}
