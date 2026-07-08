import { Suspense } from "react";
import MouseMoveEffect from "@/components/mouse-move-effect";
import Hero from "@/components/hero";
import GlassmorphismCard from "@/components/glassmorphism-card";
import ProjectGrid from "@/components/project-grid";
import {
  getVideoCategoriesWithCountIncludingAll,
  getAllVideoProjectsFlattened
} from "@/lib/helper";

export default function HomePage() {
  // Fetch data on the server
  const categories = getVideoCategoriesWithCountIncludingAll();
  const allProjects = getAllVideoProjectsFlattened(); // We need all projects initially for the grid to filter client-side

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MouseMoveEffect />

      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            {/* Spotlight Effect behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-neutral-950 dark:text-white tracking-tight relative z-10">
              <span className="bg-gradient-to-r from-neutral-950 via-blue-900 to-blue-600 dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                My Video Projects
              </span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              From smooth transitions to precise audio syncing and dynamic
              animations — I focus on making your content not just polished, but
              <span className="text-blue-600 dark:text-blue-400 font-medium"> powerful</span>.
            </p>
          </div>

          <Suspense fallback={<div className="text-center py-20 text-neutral-500 dark:text-neutral-400">Loading projects...</div>}>
            <ProjectGrid initialCategories={categories} initialProjects={allProjects} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
