"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Scissors, Type, Music, Layers, Video, Volume2 } from "lucide-react";
import { m } from "framer-motion";

export default function TimelineWidget() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs text-gray-500 font-mono pl-2">Yogita_Timeline_V4.prproj</span>
        </div>

        {/* Timecode */}
        <div className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
          00:00:04:18
        </div>

        {/* Control Tools */}
        <div className="flex items-center space-x-3 text-gray-400">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
          </button>
          <div className="h-4 w-px bg-white/10" />
          <Scissors size={13} className="hover:text-white cursor-pointer" />
          <Type size={13} className="hover:text-white cursor-pointer" />
          <Music size={13} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Editor Tracks Area */}
      <div className="p-4 space-y-3 relative select-none">
        
        {/* Animated Playhead Line */}
        <m.div 
          animate={isPlaying ? { left: ["8%", "92%"] } : {}}
          transition={isPlaying ? { repeat: Infinity, duration: 6, ease: "linear" } : {}}
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
          style={{ left: "8%" }}
        >
          {/* Playhead Handle */}
          <div className="absolute -top-1 -left-1.5 w-3.5 h-3.5 bg-red-500 rotate-45 border border-red-400 rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        </m.div>

        {/* Track 1: Text & Graphics (V2) */}
        <div className="flex items-center space-x-3">
          <div className="w-16 flex items-center space-x-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <Layers size={10} />
            <span>V2 GFX</span>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-2 h-7">
            <div className="col-span-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 rounded-md flex items-center px-2 text-[9px] text-orange-300 font-mono font-medium overflow-hidden whitespace-nowrap">
              [ Intro Title ]
            </div>
            <div className="col-span-4 col-start-4 bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 rounded-md flex items-center px-2 text-[9px] text-orange-300 font-mono font-medium overflow-hidden whitespace-nowrap">
              [ CapCut Text Preset ]
            </div>
            <div className="col-span-3 col-start-9 bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 rounded-md flex items-center px-2 text-[9px] text-orange-300 font-mono font-medium overflow-hidden whitespace-nowrap">
              [ CTA Overlay ]
            </div>
          </div>
        </div>

        {/* Track 2: Video Footage (V1) */}
        <div className="flex items-center space-x-3">
          <div className="w-16 flex items-center space-x-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <Video size={10} />
            <span>V1 Video</span>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-2 h-8">
            <div className="col-span-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-md flex items-center justify-between px-2 text-[10px] text-blue-300 font-medium overflow-hidden whitespace-nowrap relative">
              <span>01_Hook_Raw.mp4</span>
              <span className="text-[8px] opacity-40">24fps</span>
            </div>
            <div className="col-span-1 bg-gradient-to-r from-purple-500/30 to-purple-600/30 border border-purple-500/40 rounded-md flex items-center justify-center text-[9px] text-purple-300 overflow-hidden font-bold">
              ⚡
            </div>
            <div className="col-span-5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-md flex items-center justify-between px-2 text-[10px] text-blue-300 font-medium overflow-hidden whitespace-nowrap">
              <span>02_Cinematic_Broll.mp4</span>
              <span className="text-[8px] opacity-40">60fps</span>
            </div>
            <div className="col-span-2 col-start-11 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-md flex items-center px-2 text-[10px] text-blue-300 font-medium overflow-hidden whitespace-nowrap">
              <span>03_Outro.mov</span>
            </div>
          </div>
        </div>

        {/* Track 3: Audio Vocal (A1) */}
        <div className="flex items-center space-x-3">
          <div className="w-16 flex items-center space-x-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <Volume2 size={10} />
            <span>A1 Audio</span>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-2 h-7">
            <div className="col-span-11 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-md flex items-center justify-between px-2 text-[9px] text-green-300 font-mono overflow-hidden whitespace-nowrap">
              <span>🎙️ Voiceover_L_R_Normalized.wav (48kHz)</span>
              {/* Waveform graphic mock */}
              <div className="flex items-end space-x-0.5 opacity-30 h-4">
                {[2, 4, 3, 5, 2, 6, 4, 3, 5, 2, 7, 4, 3, 5, 2, 4, 2, 6, 3, 5, 4].map((h, i) => (
                  <div key={i} className="w-0.5 bg-green-400" style={{ height: `${h * 15}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Track 4: Sound Effects & Music (A2) */}
        <div className="flex items-center space-x-3">
          <div className="w-16 flex items-center space-x-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <Music size={10} />
            <span>A2 SFX</span>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-2 h-7">
            <div className="col-span-2 col-start-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-teal-500/30 rounded-md flex items-center justify-center text-[9px] text-teal-300 font-mono font-medium overflow-hidden whitespace-nowrap">
              🎵 Swoosh
            </div>
            <div className="col-span-6 col-start-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-md flex items-center justify-between px-2 text-[9px] text-pink-300 font-mono overflow-hidden whitespace-nowrap">
              <span>🎵 Background_Beat_120bpm.mp3</span>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
