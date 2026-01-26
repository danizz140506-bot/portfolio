"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Navbar } from "@/components/navbar";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";

export default function Home() {
  const router = useRouter();
  const hasNavigated = useRef(false);
  const threshold = 100;

  useEffect(() => {
    hasNavigated.current = false;
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasNavigated.current) return;

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (e.deltaY > 0 && windowHeight + scrollY >= documentHeight - threshold) {
        hasNavigated.current = true;
        router.push("/about");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  return (
    <div className="relative bg-[#000] text-white font-[var(--font-iceland)] min-h-screen overflow-hidden">
      {/* Ethereal Shadow Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EtherealShadow
          color="rgba(255, 255, 255, 0.3)"
          animation={{ scale: 80, speed: 70 }}
          noise={{ opacity: 0.6, scale: 1.2 }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-[10] flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* Subtle label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs tracking-[0.3em] uppercase mb-8 opacity-50"
          >
            Software Engineer
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.08em] mb-4 sm:mb-6 px-4"
          >
            Danish Iskandar
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-px bg-white/30 mb-8 origin-center"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-70 mb-8 sm:mb-12 max-w-xl leading-relaxed px-4"
          >
            Clean architecture. Scalable systems.
            <br />
            Built for real businesses.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShimmerButton
              className="shadow-2xl px-8 py-4 md:px-10 md:py-5"
              onClick={() => router.push("/about")}
            >
              <span className="whitespace-pre-wrap text-center text-sm md:text-base font-medium leading-none tracking-wider text-white">
                Explore My Work
              </span>
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase opacity-60">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </section>
    </div>
  );
}
