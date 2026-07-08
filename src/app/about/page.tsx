"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import CTASection from "@/components/CTASection";
import GlassmorphismCard from "@/components/glassmorphism-card";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Cpu,
  Award,
  Clock,
  Zap,
  Quote
} from "lucide-react";
import { clientsData } from "@/db/clients";

export default function AboutPage() {


  return (
    <div className="min-h-screen flex flex-col justify-center pt-32 pb-12 md:py-24 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mt-0 md:mt-20 mb-3 text-neutral-950 dark:text-white tracking-tight">
            The Creative Mind Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">Magic</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Visual Storyteller. Professional Video Editor. Creative Designer.
          </p>
        </m.div>

        <BentoGrid className="max-w-6xl mx-auto mb-20">
          {/* 1. Hero Profile - SUPER HIGHLIGHTED */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 md:row-span-2"
          >
            <BentoGridItem
              title=""
              description=""
              header={
                <div className="relative w-full h-full min-h-[28rem] md:min-h-[16rem] rounded-xl overflow-hidden group-hover/bento:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/yogitasingh.jpg"
                    alt="Yogita Singh"
                    fill
                    className="object-cover object-top grayscale-[0] hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

                  {/* Name Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
                    >
                      YOGITA<br />
                      <span className="text-blue-400">SINGH</span>
                    </m.div>
                    <div className="h-1 w-16 md:w-20 bg-purple-500 mt-4 rounded-full" />
                    <p className="text-gray-200 mt-4 text-xs md:text-sm font-medium tracking-wide uppercase">
                      Professional Video Editor & Designer
                    </p>
                  </div>
                </div>
              }
              className="h-full shadow-2xl shadow-blue-900/10"
              icon={null} // Icon inside header
            />
          </m.div>

          {/* 2. Stats - Experience - VISUAL */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Experience"
              description="Years of professional grinding."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-100 to-white dark:from-black dark:to-neutral-900 border border-black/5 dark:border-white/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-colors py-8 md:py-0">
                  <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
                  <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-800 dark:to-emerald-900 z-10">4+</span>
                  <div className="text-emerald-600 dark:text-emerald-500/50 text-xs font-mono uppercase tracking-[0.2em] z-10 mt-2">Years Active</div>
                </div>
              }
              className="h-full"
              icon={<Clock className="h-4 w-4 text-emerald-500" />}
            />
          </m.div>



          {/* 4. Global Reach - Visual Map */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Global Reach"
              description="Remote ready."
              header={
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-slate-100/50 dark:bg-[#0a0a0a] overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                  {/* Abstract grid lines for map feel */}
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                      <MapPin className="text-blue-600 dark:text-blue-500" size={32} />
                    </div>
                    <div className="mt-2 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur text-blue-600 dark:text-blue-300 px-3 py-1 rounded text-xs font-bold border border-blue-500/20 dark:border-blue-500/30">
                      WORLDWIDE
                    </div>
                  </div>
                </div>
              }
              className="h-full"
              icon={<MapPin className="h-4 w-4 text-indigo-500" />}
            />
          </m.div>

          {/* 5. The Philosophy - Quote */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <BentoGridItem
              title="Philosophy"
              description="Story is King."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-100 to-white dark:from-neutral-900 dark:to-black border border-black/5 dark:border-white/5 p-6 flex items-center">
                  <Quote className="text-neutral-500/10 dark:text-white/10 absolute top-4 right-4" size={48} />
                  <p className="text-neutral-700 dark:text-gray-300 italic text-sm md:text-base leading-relaxed relative z-10">
                    "I don't just cut footage; I construct feelings. Every frame must earn its place on the timeline, serving the narrative above all else."
                  </p>
                </div>
              }
              className="h-full"
              icon={<Award className="h-4 w-4 text-yellow-500" />}
            />
          </m.div>

          {/* 6. Socials - Visual Bar */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Connect"
              description=""
              header={
                <div className="flex flex-1 h-full w-full items-center justify-center gap-8 px-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-neutral-900 dark:to-neutral-800 rounded-xl border border-black/5 dark:border-white/5 py-4 md:py-0 min-h-[5rem]">
                  <a href="#" target="_blank" className="p-3 bg-black/5 dark:bg-white/5 rounded-full hover:bg-[#0077b5] hover:scale-110 transition-all duration-300 text-neutral-800 dark:text-white"><Linkedin size={20} /></a>
                  <a href="#" target="_blank" className="p-3 bg-black/5 dark:bg-white/5 rounded-full hover:bg-pink-600 hover:scale-110 transition-all duration-300 text-neutral-800 dark:text-white"><Instagram size={20} /></a>
                </div>
              }
              className="h-full"
              icon={<Zap className="h-4 w-4 text-white" />}
            />
          </m.div>

        </BentoGrid>

        {/* Professional Experience Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-24 px-4"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-white mb-2">Professional Experience</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mx-auto">
              A brief overview of my professional contributions and milestones.
            </p>
          </div>

          <GlassmorphismCard className="p-8 border border-black/5 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
              <div>
                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Freelance Video Editor & Visual Storyteller
                </h3>
                <p className="text-blue-600 dark:text-blue-300/80 text-sm font-medium tracking-wide mt-1">
                  Self-Employed / Remote
                </p>
              </div>
              <span className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold text-neutral-600 dark:text-gray-300 self-start md:self-center">
                2022 - Present
              </span>
            </div>

            <ul className="space-y-4 text-neutral-700 dark:text-gray-300 font-normal dark:font-light text-sm md:text-base leading-relaxed pl-5 list-disc marker:text-blue-500 dark:marker:text-blue-400">
              <li>
                Managed the end-to-end post-production workflow for high-traffic digital platforms.
              </li>
              <li>
                Enhanced viewer retention by <span className="text-neutral-950 dark:text-white font-medium">40%+</span> through strategic pacing, sound design, and engaging motion graphics.
              </li>
              <li>
                Collaborated with creative directors to deliver polished, brand-aligned video assets under tight deadlines.
              </li>
              <li>
                Color graded and mixed audio to ensure broadcast-quality production standards.
              </li>
            </ul>
          </GlassmorphismCard>
        </m.div>

        {/* Clients Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 dark:text-white mb-2">Trusted By</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div
            className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent py-10"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <Marquee className="[--duration:20s]">
              {clientsData.map((client) => (
                <div key={client.id} className="mx-8 flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 p-4 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-black/10 dark:hover:bg-white/10 transition-all">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-neutral-500 dark:text-gray-400 group-hover:text-neutral-950 dark:group-hover:text-gray-200 transition-colors text-center whitespace-nowrap">
                    {client.name}
                  </p>
                </div>
              ))}
            </Marquee>
          </div>
        </m.div>

        <CTASection
          title="Ready to Work Together?"
          description="Let's make something that breaks the internet."
          buttonText="Start Collaboration"
          href="/contact"
        />
      </div>
    </div>
  );
}
