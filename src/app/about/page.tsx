"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Particles } from "@/components/ui/particles";
import { usePageNavigation } from "@/hooks/usePageNavigation";

export default function AboutPage() {
  usePageNavigation({
    upRoute: "/",
    downRoute: "/services",
  });

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white font-[var(--font-iceland)]">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-zinc-950 pointer-events-none" />

      {/* Particles background */}
      <Particles
        className="fixed inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        size={0.4}
      />

      <Navbar />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
            {/* Left Column - Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Section Label */}
              <motion.div variants={itemVariants}>
                <span className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-50">
                  About Me
                </span>
                <div className="h-px w-12 bg-white/20 mt-4" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.03em] leading-[1.1]"
              >
                I build systems,
                <br />
                <span className="opacity-60">not just websites.</span>
              </motion.h1>

              {/* Content Paragraphs */}
              <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5 pt-4">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-80">
                  I'm Danish Iskandar, born in 2006, currently a diploma student
                  in Computer Science at KPM Beranang. I'm still early in my journey
                  as a developer, but I've always been curious about how technology
                  works and how systems are built behind the scenes.
                </p>

                <p className="text-base md:text-lg leading-relaxed opacity-80">
                  I enjoy learning by doing. Whether it's building small projects,
                  experimenting with new tools, or fixing things that break, I use
                  hands-on experience to understand concepts better.
                </p>

                <p className="text-base md:text-lg leading-relaxed opacity-80">
                  I focus on improving how I write code, how I solve problems,
                  and how I approach building software in a more thoughtful and
                  intentional way.
                </p>
              </motion.div>

              {/* Stats or highlight */}
              <motion.div
                variants={itemVariants}
                className="flex gap-12 pt-6 border-t border-white/10"
              >
                <div>
                  <div className="text-3xl md:text-4xl font-normal">2+</div>
                  <div className="text-xs tracking-wider uppercase opacity-50 mt-1">
                    Client Projects
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-normal">2024</div>
                  <div className="text-xs tracking-wider uppercase opacity-50 mt-1">
                    Started Coding
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Images Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-12"
            >
              {/* Left stack */}
              <div className="flex flex-col gap-4 md:gap-6">
                <motion.div
                  variants={imageVariants}
                  className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 group"
                >
                  <Image
                    src="/images/me2.jpg"
                    alt="Danish Iskandar"
                    fill
                    className="object-cover image-grayscale hover:scale-105 group-hover:scale-105 transition-all duration-700"
                    priority
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                <motion.div
                  variants={imageVariants}
                  className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 group"
                >
                  <Image
                    src="/images/me.jpg"
                    alt="Danish Iskandar"
                    fill
                    className="object-cover image-grayscale hover:scale-105 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </div>

              {/* Right tall image */}
              <motion.div
                variants={imageVariants}
                className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 bg-white/5 group"
              >
                <Image
                  src="/images/me3.jpg"
                  alt="Danish Iskandar"
                  fill
                  className="object-cover image-grayscale hover:scale-105 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase opacity-40"
      >
        Scroll to continue
      </motion.div>
    </div>
  );
}
