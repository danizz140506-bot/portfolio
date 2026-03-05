"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { usePageNavigation } from "@/hooks/usePageNavigation";

const projects = [
  {
    id: 1,
    number: "01",
    title: "INPACK Sdn Bhd",
    category: "Corporate Website & Brand Identity",
    description:
      "Designed and developed a corporate web presence for a Malaysian packaging manufacturer. Delivered a responsive marketing site with professional brand identity, structured product catalog, and clean visual presentation to strengthen the client's market positioning.",
    role: "Design & Development",
    year: "2025",
    deliverables: [
      "Corporate Website",
      "Logo Design",
      "Responsive Layout",
      "Product Catalog",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Tailwind"],
    link: "https://inpacksb.com",
    image: "/images/inpack.png",
    imageAlt: "INPACK Sdn Bhd website on laptop and mobile",
  },
  {
    id: 2,
    number: "02",
    title: "MYMS Sdn Bhd",
    category: "Learning Management System & Corporate Platform",
    description:
      "Architected and developed a full-stack learning management system for a Malaysian training provider. Engineered end-to-end course application workflows, integrated CHIP payment gateway for seamless transactions, built automated email notifications, real-time attendance tracking, and dynamic e-certificate generation — delivering a complete digital infrastructure for training operations.",
    role: "Full-Stack Development",
    year: "2026",
    deliverables: [
      "LMS Platform",
      "Payment Gateway Integration",
      "Email Notification System",
      "Attendance Tracking",
      "E-Certificate Generation",
      "Admin Dashboard",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Tailwind"],
    link: "https://myms2u.com",
    image: "/images/myms.png",
    imageAlt: "MYMS Sdn Bhd website on laptop and mobile",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Page navigation (vertical scroll → navigate between pages)
  usePageNavigation({
    upRoute: "/services",
    downRoute: "/skills",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < projects.length - 1
      ) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const goToNext = () => {
    if (currentIndex < projects.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Touch swipe for mobile (horizontal = switch projects only)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const minSwipe = 50;

    // Horizontal swipe = switch projects (only if horizontal motion dominates)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const project = projects[currentIndex];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  return (
    <div className="relative h-[100dvh] bg-[#000] text-white font-[var(--font-iceland)] overflow-hidden">
      <Particles
        className="fixed inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        size={0.4}
      />

      <Navbar />

      <main className="relative z-10 h-[100dvh] flex flex-col overflow-hidden">
        {/* Compact Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-3 md:pb-4 flex-shrink-0"
        >
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs tracking-[0.3em] uppercase opacity-50">
                Projects
              </span>
              <div className="h-px w-6 sm:w-8 bg-white/20" />
              <span className="text-xs tracking-[0.2em] uppercase opacity-40 hidden sm:inline">
                Selected Work
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-normal opacity-20">
                {project.number}
              </span>
              <span className="text-sm opacity-30">/</span>
              <span className="text-sm opacity-30">
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Project Content */}
        <div
          className="flex-1 relative overflow-hidden px-4 sm:px-6 md:px-12"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.article
                key={project.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 xl:gap-16 items-start lg:items-center overflow-y-auto lg:overflow-visible scrollbar-hide"
              >
                {/* LEFT: Project Info */}
                <div className="flex flex-col justify-center pt-2 pb-4 sm:py-4 lg:py-0 order-2 lg:order-1">
                  {/* Category */}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-40"
                  >
                    {project.category}
                  </motion.span>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-[0.03em] mt-1.5 sm:mt-2 mb-3 sm:mb-4 lg:mb-5"
                  >
                    {project.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed opacity-70 mb-3 sm:mb-4 lg:mb-6 max-w-lg"
                  >
                    {project.description}
                  </motion.p>

                  {/* Meta: Role + Year */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex gap-6 sm:gap-8 mb-3 sm:mb-4 lg:mb-6"
                  >
                    <div>
                      <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase opacity-40 block mb-0.5 sm:mb-1">
                        Role
                      </span>
                      <span className="text-xs sm:text-sm opacity-80">
                        {project.role}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase opacity-40 block mb-0.5 sm:mb-1">
                        Year
                      </span>
                      <span className="text-xs sm:text-sm opacity-80">
                        {project.year}
                      </span>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-px w-full bg-white/10 mb-3 sm:mb-4 lg:mb-6 origin-left"
                  />

                  {/* Deliverables */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-3 sm:mb-4"
                  >
                    <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase opacity-40 block mb-1.5 sm:mb-2">
                      Deliverables
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.deliverables.map((item) => (
                        <span
                          key={item}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs tracking-wide opacity-70 border border-white/10 rounded-full bg-white/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-4 sm:mb-5 lg:mb-8"
                  >
                    <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase opacity-40 block mb-1.5 sm:mb-2">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs tracking-wide opacity-60 border border-white/15 rounded-md bg-white/[0.03]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ShimmerButton
                      className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3"
                      onClick={() =>
                        window.open(project.link, "_blank", "noopener,noreferrer")
                      }
                    >
                      <span className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm tracking-[0.1em] uppercase text-white">
                        View Live Site
                        <svg
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 17L17 7M17 7H7M17 7v10"
                          />
                        </svg>
                      </span>
                    </ShimmerButton>
                  </motion.div>
                </div>

                {/* RIGHT: Project Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex items-center justify-center order-1 lg:order-2"
                >
                  <div className="relative w-full group">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-white/[0.02] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Image */}
                    <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={100}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Image Carousel Arrows (mobile/tablet) */}
                      {prevProject && (
                        <button
                          onClick={goToPrevious}
                          className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black/50 border border-white/20 backdrop-blur-sm active:scale-90 transition-all duration-200"
                          aria-label="Previous project"
                        >
                          <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                      {nextProject && (
                        <button
                          onClick={goToNext}
                          className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black/50 border border-white/20 backdrop-blur-sm active:scale-90 transition-all duration-200"
                          aria-label="Next project"
                        >
                          <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Watermark number */}
                    <div className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-2 lg:-bottom-6 lg:-right-4 text-[4rem] sm:text-[6rem] lg:text-[8rem] font-normal leading-none opacity-[0.03] select-none pointer-events-none">
                      {project.number}
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            </AnimatePresence>
          </div>


        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-shrink-0 px-4 sm:px-6 md:px-12 pb-3 sm:pb-4 md:pb-6 pt-2"
        >
          <div className="w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-between">
            {/* Left: Previous project (desktop only) */}
            <div className="hidden lg:block w-1/3">
              {prevProject ? (
                <button
                  onClick={goToPrevious}
                  className="group flex items-center gap-2 sm:gap-3 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="text-left">
                    <span className="text-[10px] tracking-[0.15em] uppercase opacity-50 block">
                      Previous
                    </span>
                    <span className="text-xs sm:text-sm opacity-80">
                      {prevProject.title}
                    </span>
                  </div>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Center: Pagination dots */}
            <div className="flex items-center gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? "w-8 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Right: Next project (desktop only) */}
            <div className="hidden lg:flex w-1/3 justify-end">
              {nextProject ? (
                <button
                  onClick={goToNext}
                  className="group flex items-center gap-2 sm:gap-3 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                  <div className="text-right">
                    <span className="text-[10px] tracking-[0.15em] uppercase opacity-50 block">
                      Next Project
                    </span>
                    <span className="text-xs sm:text-sm opacity-80">
                      {nextProject.title}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <span className="text-[10px] sm:text-xs tracking-widest uppercase opacity-30">
                  Scroll for more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
