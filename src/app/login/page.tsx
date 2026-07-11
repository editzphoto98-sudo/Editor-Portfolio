"use client";

import { useState, useTransition, useEffect } from "react";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Mail, Lock, Loader2, Phone, Key, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// Simple custom Google icon SVG
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.1h3.99c2.34-2.16 3.69-5.32 3.69-8.72z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.99-3.1a7.43 7.43 0 0 1-11.93-3.97H.02v3.19A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M6.04 14.02a7.14 7.14 0 0 1 0-4.04V6.79H.02a11.98 11.98 0 0 0 0 10.42l6.02-3.19z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.34 0 3.25 2.67 1.02 6.59l6.02 4.67c1.37-4.14 5.23-6.51 8.96-6.51z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [isSignUp, setIsSignUp] = useState(false);

  // Phone Authentication State
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Parse error queries from callbacks
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorMsg = params.get("error");
      if (errorMsg) {
        toast.error(errorMsg);
      }
    }
  }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+91" + formattedPhone;
    }

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("OTP sent successfully to your mobile number!");
        setOtpSent(true);
      }
    });
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the 6-digit OTP code.");
      return;
    }

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+91" + formattedPhone;
    }

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed in successfully!");
        window.location.href = "/profile";
      }
    });
  };

  const handleGoogleLogin = async () => {
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        toast.error(error.message);
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
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Sign in to manage your editing workspace details
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-black/[0.03] dark:bg-white/[0.04] rounded-xl mb-6 border border-black/5 dark:border-white/5">
            <button
              onClick={() => {
                setLoginMethod("email");
                setOtpSent(false);
              }}
              disabled={isPending}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                loginMethod === "email"
                  ? "bg-white dark:bg-white/10 text-neutral-950 dark:text-white shadow-sm"
                  : "text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              disabled={isPending}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                loginMethod === "phone"
                  ? "bg-white dark:bg-white/10 text-neutral-950 dark:text-white shadow-sm"
                  : "text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Mobile & OTP
            </button>
          </div>

          <AnimatePresence mode="wait">
            {loginMethod === "email" ? (
              // EMAIL LOGIN FORM
              <m.form
                key="email-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                onSubmit={handleEmailSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      disabled={isPending}
                      className="pl-11 h-12 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      disabled={isPending}
                      className="pl-11 h-12 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/30"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-12 rounded-xl font-medium shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : isSignUp ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={isPending}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {isSignUp
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Create one"}
                  </button>
                </div>
              </m.form>
            ) : (
              // MOBILE OTP FORM
              <m.form
                key="phone-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}
              >
                <div>
                  <label
                    htmlFor="phone"
                    className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block"
                  >
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="98765 43210 (without +91)"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isPending || otpSent}
                      className="pl-11 h-12 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/30"
                    />
                  </div>
                </div>

                {otpSent && (
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="otp"
                        className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block"
                      >
                        Enter 6-Digit OTP Code
                      </label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                        <Input
                          id="otp"
                          name="otp"
                          type="text"
                          placeholder="123456"
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          disabled={isPending}
                          className="pl-11 h-12 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/30"
                        />
                      </div>
                    </div>
                  </m.div>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-12 rounded-xl font-medium shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : otpSent ? (
                    "Verify & Sign In"
                  ) : (
                    "Send OTP Code"
                  )}
                </Button>

                {otpSent && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                      disabled={isPending}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      ← Edit phone number
                    </button>
                  </div>
                )}
              </m.form>
            )}
          </AnimatePresence>

          {/* OR PROVIDER DIVIDER */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5 dark:border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 dark:bg-[#080c16] px-2 text-neutral-400">
                Or Continue With
              </span>
            </div>
          </div>

          {/* GOOGLE SIGN IN BUTTON */}
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleGoogleLogin}
            className="w-full h-12 border-black/10 dark:border-white/10 bg-white hover:bg-neutral-50 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl font-medium flex items-center justify-center space-x-2 text-neutral-900 dark:text-white cursor-pointer hover:scale-[1.01] transition-transform"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
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
