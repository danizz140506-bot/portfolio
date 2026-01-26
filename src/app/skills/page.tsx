"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semi-circle";
import { Particles } from "@/components/ui/particles";

const skills = [
  // Web Technologies
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  // Backend & Systems
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  // AI & Productivity Tools
  {
    name: "ChatGPT",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
  },
  {
    name: "Gemini",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg",
  },
  {
    name: "Claude AI",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg",
  },
  {
    name: "Cursor",
    icon: "https://www.cursor.com/favicon.ico",
  },
  {
    name: "Google AntiGravity",
    icon: "/images/antigravity.webp",
  },
];

export default function SkillsPage() {
  const router = useRouter();
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

      // Scrolling down at bottom - navigate to contact
      if (e.deltaY > 0 && !hasNavigatedDown.current && isAtBottom) {
        hasNavigatedDown.current = true;
        router.push("/contact");
        return;
      }

      // Scrolling up at top - navigate to projects
      if (e.deltaY < 0 && !hasNavigatedUp.current && isAtTop) {
        hasNavigatedUp.current = true;
        router.push("/projects");
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  const skillIcons = skills.map((skill) => skill.icon);
  const skillLabels = skills.map((skill) => skill.name);

  return (
    <div className="relative min-h-screen bg-[#000] text-white font-[var(--font-iceland)] overflow-hidden">
      {/* Particles background */}
      <Particles
        className="fixed inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        size={0.4}
      />

      <Navbar />

      {/* Scattered skill icons in background */}
      <MultiOrbitSemiCircle icons={skillIcons} labels={skillLabels} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-32 pointer-events-none">
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* Page Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-50"
            >
              Skills & Tools
            </motion.span>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-12 sm:w-16 bg-white/20 mx-auto origin-center"
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.03em] leading-tight px-4"
            >
              Technologies I Use
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base md:text-lg opacity-60 max-w-md mx-auto px-4"
            >
              Tools and technologies that power my projects.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Hover over the icons to explore.
            </motion.p>
          </motion.header>
        </div>
      </main>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase"
      >
        Scroll down for contact
      </motion.div>
    </div>
  );
}
