"use client";

import { m } from "framer-motion";
import { ArrowDown, Film } from "lucide-react";
import MagneticButton from "./magnetic-button";

import { useLenis } from "lenis/react";

const floatingBadges = [
  { name: "Pr", color: "border-purple-500/30 text-purple-400 bg-purple-500/5", glow: "rgba(168,85,247,0.15)", top: "15%", left: "10%", delay: 0 },
  { name: "Ae", color: "border-blue-500/30 text-blue-400 bg-blue-500/5", glow: "rgba(59,130,246,0.15)", top: "25%", right: "8%", delay: 1.5 },
  { name: "Ps", color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5", glow: "rgba(6,182,212,0.15)", bottom: "35%", left: "7%", delay: 0.8 },
  { name: "Cc", color: "border-teal-500/30 text-teal-400 bg-teal-500/5", glow: "rgba(20,184,166,0.15)", bottom: "40%", right: "12%", delay: 2.2 },
  { name: "Cv", color: "border-pink-500/30 text-pink-400 bg-pink-500/5", glow: "rgba(236,72,153,0.15)", top: "10%", right: "30%", delay: 1 },
];

export default function Hero() {
    const lenis = useLenis();

    const scrollToProjects = (e?: React.MouseEvent) => {
        e?.preventDefault();
        if (lenis) {
            lenis.scrollTo("#projects", {
                duration: 2,
                offset: -100, // Account for fixed navbar
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out for premium feel
            });
        }
    };

    return (
        <section className="relative min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Ambience - Deepened and refined */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-blue-900/15 rounded-[100%] blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Floating Software Badges */}
            {floatingBadges.map((badge, idx) => (
                <m.div
                    key={badge.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                        opacity: 1, 
                        y: [0, -15, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{ 
                        opacity: { duration: 1, delay: badge.delay },
                        y: { repeat: Infinity, duration: 6 + idx, ease: "easeInOut" },
                        x: { repeat: Infinity, duration: 8 + idx, ease: "easeInOut" }
                    }}
                    style={{
                        position: "absolute",
                        top: badge.top,
                        left: badge.left,
                        right: badge.right,
                        bottom: badge.bottom,
                        boxShadow: `0 0 30px ${badge.glow}`
                    }}
                    className={`hidden lg:flex w-14 h-14 rounded-2xl border backdrop-blur-xl items-center justify-center font-bold text-lg select-none pointer-events-none z-10 transition-all hover:scale-110 ${badge.color}`}
                >
                    {badge.name}
                </m.div>
            ))}

            <div className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto w-full flex flex-col items-center pt-16 sm:pt-24">
                {/* Badge */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="inline-block mb-8 md:mb-10 w-full"
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-blue-300 tracking-[0.2em] shadow-[0_0_30px_rgba(59,130,246,0.15)] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 animate-pulse" />
                        Available for Hire
                    </div>
                </m.div>

                {/* Main Title - Split for Creative Typography */}
                <h1 className="font-extrabold text-white mb-8 leading-[0.85] w-full flex flex-col items-center select-none">
                    <m.span
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                        className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] tracking-[0.25em] text-white font-black uppercase mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                        VISUAL
                    </m.span>
                    <m.span
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                        className="block text-6xl sm:text-8xl md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(59,130,246,0.25)] tracking-tighter"
                    >
                        STORYTELLER
                    </m.span>
                </h1>

                {/* Subtitle */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="max-w-2xl mx-auto mb-16 sm:mb-24"
                >
                    <p className="text-blue-400 font-semibold tracking-[0.15em] uppercase text-xs sm:text-sm mb-3.5 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        Professional Video Editor & Designer
                    </p>
                    <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed md:px-0">
                        Turning raw footage into visual stories — with style, precision, and a touch of <span className="text-white font-medium drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">cinematic magic</span>.
                    </p>
                </m.div>

                {/* Buttons */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none"
                >
                    <MagneticButton>
                        <a
                            href="#projects"
                            onClick={scrollToProjects}
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold text-black bg-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center">
                                View Work
                            </span>
                        </a>
                    </MagneticButton>

                    <MagneticButton>
                        <a
                            href="/contact"
                            className="group inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 text-base sm:text-lg font-medium text-white bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            Contact Me
                        </a>
                    </MagneticButton>
                </m.div>
            </div>

            {/* Scroll Indicator */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
            >
                <button
                    onClick={scrollToProjects}
                    className="flex flex-col items-center gap-3 text-white/40 hover:text-white transition-colors duration-500"
                >
                    <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
                    <ArrowDown className="animate-bounce" size={18} strokeWidth={1.5} />
                </button>
            </m.div>
        </section>
    );
}
