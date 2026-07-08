"use client";

import { useState, useEffect, useCallback } from "react";
import { m } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import type { VideoProject } from "@/types/videos";
import { getVideoProjectsByCategory } from "@/lib/helper";

interface ProjectGridProps {
  initialCategories: { category: string; count: number }[];
  initialProjects: VideoProject[];
}

export default function ProjectGrid({ initialCategories, initialProjects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedProjects, setDisplayedProjects] = useState<VideoProject[]>(initialProjects.slice(0, 9));
  const [allProjects, setAllProjects] = useState<VideoProject[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProjects.length > 9);

  const ITEMS_PER_PAGE = 9;

  // Load projects for selected category
  useEffect(() => {
    let projects;
    if (selectedCategory === "All") {
        projects = initialProjects;
    } else {
        projects = getVideoProjectsByCategory(selectedCategory);
    }
    
    setAllProjects(projects);
    setDisplayedProjects(projects.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
    setHasMore(projects.length > ITEMS_PER_PAGE);
  }, [selectedCategory, initialProjects]);

  // Load more projects
  const loadMoreProjects = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProjects = allProjects.slice(startIndex, endIndex);

    setDisplayedProjects((prev) => [...prev, ...newProjects]);
    setCurrentPage(nextPage);
    setHasMore(endIndex < allProjects.length);
    setLoading(false);
  }, [currentPage, allProjects, loading, hasMore]);

  // Infinite scroll for non-"All" categories
  useEffect(() => {
    if (selectedCategory === "All") return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProjects();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCategory, loadMoreProjects]);

  return (
    <>
        {/* Category Filter */}
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
        >
            {initialCategories.map(({ category, count }) => (
            <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                ${selectedCategory === category
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                    : "bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-gray-400 hover:bg-black/[0.08] dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white border border-black/5 dark:border-white/5"
                }
                `}
            >
                {category}
                <span className={`
                ml-2 text-[10px] px-1.5 py-0.5 rounded-full transition-colors
                ${selectedCategory === category ? "bg-white text-black dark:bg-black dark:text-white" : "bg-black/10 dark:bg-white/10 text-neutral-500 dark:text-gray-400"}
                `}>
                {count}
                </span>
            </button>
            ))}
        </m.div>

        {/* Projects Grid */}
        <m.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
            {displayedProjects.map((project, index) => (
            <m.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            >
                <ProjectCard project={project} />
            </m.div>
            ))}
        </m.div>

        {/* Load More Button for "All" category */}
        {selectedCategory === "All" && hasMore && (
            <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20"
            >
            <Button
                onClick={loadMoreProjects}
                disabled={loading}
                size="lg"
                className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-8 h-12 font-medium transition-all hover:scale-105 cursor-pointer"
            >
                {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
                ) : (
                <>
                    Load More Projects
                    <ArrowRight className="ml-2" size={16} />
                </>
                )}
            </Button>
            </m.div>
        )}
    </>
  );
}
