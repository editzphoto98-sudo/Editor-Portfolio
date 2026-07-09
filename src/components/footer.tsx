"use client";


import {
  Linkedin,
  Mail,
  Heart,
  Instagram,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/917067995677?text=Hi%20Yogita,%20I'd%20like%20to%20discuss%20a%20video%20project.",
      icon: MessageCircle,
    },
    {
      name: "Email",
      href: "mailto:yukta062@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="glass-panel border-t border-black/5 dark:border-white/5 mt-20 backdrop-blur-3xl">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 justify-between">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600 bg-clip-text text-transparent">
              Yogita Singh
            </h3>
            <p className="text-neutral-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Video Editor and Designer passionate about
              creating visual stories with style, precision, and cinematic
              magic.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-neutral-900 dark:text-white tracking-wide uppercase text-xs opacity-70">
              Connect With Me
            </h4>
            <div className="flex space-x-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={link.name}
                  >
                    <div className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:bg-blue-600/10 dark:group-hover:bg-blue-600/20 group-hover:border-blue-500/30 dark:group-hover:border-blue-500/50 transition-all duration-300">
                      <Icon size={20} className="text-neutral-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5 mt-16 pt-8 text-center">
          <p className="text-neutral-500 text-sm flex items-center justify-center gap-1.5">
            Made with <Heart className="text-red-500 fill-red-500/20" size={14} /> by{" "}
            <span className="font-semibold text-neutral-700 dark:text-gray-300">Yogita Singh</span>{" "}
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
