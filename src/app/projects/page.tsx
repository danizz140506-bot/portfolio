"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Particles } from "@/components/ui/particles";

const projects = [
  {
    id: 1,
    title: "INPACK Sdn Bhd",
    subtitle: "Client Project",
    description: "Corporate website built for a real client.",
    role: "Solo Developer",
    type: "Client Website",
    stack: "HTML, CSS, JavaScript, Tailwind",
    features: ["Responsive layout", "Clean content structure", "Professional presentation"],
    link: "https://inpacksb.com",
    image: "/images/inpack.png",
    imageAlt: "INPACK Screenshot",
  },
  {
    id: 2,
    title: "MYMS Sdn Bhd",
    subtitle: "Client Project",
    description: "Website and internal system for a training platform.",
    role: "Solo Developer",
    type: "Website & System",
    stack: "Laravel, MySQL, Tailwind",
    features: ["Structured system layout", "Dynamic content", "Responsive UI"],
    link: "https://myms2u.com",
    image: "/images/myms.png",
    imageAlt: "MYMS Screenshot",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasNavigatedUp = useRef(false);
  const hasNavigatedDown = useRef(false);
  const threshold = 100;

  useEffect(() => {
    hasNavigatedUp.current = false;
    hasNavigatedDown.current = false;
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtTop = scrollY <= threshold;
      const isAtBottom = windowHeight + scrollY >= documentHeight - threshold;

      // Scrolling down at bottom - navigate to skills
      if (e.deltaY > 0 && !hasNavigatedDown.current && isAtBottom) {
        hasNavigatedDown.current = true;
        router.push("/skills");
        return;
      }

      // Scrolling up at top - navigate to about
      if (e.deltaY < 0 && !hasNavigatedUp.current && isAtTop) {
        hasNavigatedUp.current = true;
        router.push("/about");
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < projects.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const project = projects[currentIndex];

  return (
    <div className="relative h-screen bg-[#000] text-white font-[var(--font-iceland)] overflow-hidden">
      {/* Particles background */}
      <Particles
        className="fixed inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        size={0.4}
      />

      <Navbar />

      <main className="relative z-10 h-screen flex flex-col overflow-hidden">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-4 md:pb-6 flex-shrink-0"
        >
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-50">
                  Projects
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.03em] mt-1 sm:mt-2">
                  Selected Work
                </h1>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-3xl sm:text-4xl md:text-5xl font-normal opacity-20">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-base sm:text-lg opacity-30 mx-2">/</span>
                <span className="text-base sm:text-lg opacity-30">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Project Content */}
        <div className="flex-1 relative overflow-hidden px-4 sm:px-6">
          <div className="w-full max-w-5xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.article
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full flex flex-col"
              >
                {/* Screenshot */}
                <div className="relative mb-6 group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-white/5"
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-[1.02]"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
                      currentIndex === 0
                        ? "opacity-20 cursor-not-allowed"
                        : "opacity-70 hover:opacity-100 hover:bg-white/10 hover:scale-110 active:scale-95"
                    }`}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentIndex === projects.length - 1}
                    className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
                      currentIndex === projects.length - 1
                        ? "opacity-20 cursor-not-allowed"
                        : "opacity-70 hover:opacity-100 hover:bg-white/10 hover:scale-110 active:scale-95"
                    }`}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Project Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12"
                >
                  {/* Left: Title & Description */}
                  <div className="space-y-2 sm:space-y-3">
                    <span className="text-xs sm:text-sm tracking-[0.2em] uppercase opacity-40">
                      {project.subtitle}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-wide">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base opacity-70 leading-relaxed">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-all duration-300 group/link mt-2"
                    >
                      <span>View Live Site</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Right: Details */}
                  <div className="space-y-4">
                    <dl className="space-y-2 text-sm">
                      {[
                        { label: "Role", value: project.role },
                        { label: "Type", value: project.type },
                        { label: "Stack", value: project.stack },
                      ].map((item) => (
                        <div key={item.label} className="flex gap-4">
                          <dt className="opacity-40 w-14">{item.label}</dt>
                          <dd className="opacity-80">{item.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="space-y-1 text-sm opacity-60 pt-2">
                      {project.features.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-white/40 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-3 mt-auto pb-6">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentIndex
                          ? "w-8 h-2 bg-white"
                          : "w-2 h-2 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
