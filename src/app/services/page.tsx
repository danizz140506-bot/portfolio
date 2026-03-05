"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Particles } from "@/components/ui/particles";
import { usePageNavigation } from "@/hooks/usePageNavigation";

const services = [
    {
        id: "01",
        title: "Static Websites",
        subtitle: "Landing Pages & Marketing Sites",
        description:
            "Clean, fast, and beautifully crafted static websites that load instantly and look stunning on any device. Perfect for businesses looking to establish a strong online presence without unnecessary complexity.",
        highlights: [
            "Responsive design across all devices",
            "SEO-optimized structure",
            "Lightning-fast load times",
            "Modern, clean aesthetics",
        ],
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
            </svg>
        ),
    },
    {
        id: "02",
        title: "Dynamic Web Apps",
        subtitle: "Full-Stack Applications & Platforms",
        description:
            "Robust, scalable web applications with real-time functionality, database integration, and seamless user experiences. From learning management systems to e-commerce platforms — built to handle complexity.",
        highlights: [
            "Custom admin dashboards",
            "Database architecture & API design",
            "Authentication & user management",
            "Payment gateway integration",
        ],
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
            </svg>
        ),
    },
    {
        id: "03",
        title: "Problem Solving",
        subtitle: "Debug, Optimize & Improve",
        description:
            "Already have a system that's not working how it should? I diagnose issues, optimize performance, and refactor existing codebases. Whether it's fixing bugs, improving architecture, or scaling for growth — I bring clarity to chaos.",
        highlights: [
            "Codebase auditing & refactoring",
            "Performance optimization",
            "Bug diagnosis & resolution",
            "Architecture improvements",
        ],
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1h13.36M4.93 19.07a10 10 0 010-14.14m14.14 0a10 10 0 010 14.14"
                />
            </svg>
        ),
    },
    {
        id: "04",
        title: "System Integration",
        subtitle: "APIs, Payments & Automation",
        description:
            "Connecting systems that need to talk to each other. Payment gateways, email automation, third-party APIs, real-time notifications — I build the bridges between your tools and platforms so everything works together seamlessly.",
        highlights: [
            "Payment gateway setup (FPX, cards, e-wallets)",
            "Automated email & notification systems",
            "Third-party API integration",
            "Workflow automation",
        ],
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.193-5.192a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
            </svg>
        ),
    },
];

export default function ServicesPage() {
    const [activeService, setActiveService] = useState<string | null>(null);

    usePageNavigation({
        upRoute: "/about",
        downRoute: "/projects",
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    return (
        <div className="relative min-h-screen bg-[#000] text-white font-[var(--font-iceland)]">
            {/* Background layers */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black pointer-events-none" />
            <Particles
                className="fixed inset-0"
                quantity={100}
                ease={80}
                color="#ffffff"
                size={0.4}
            />

            <Navbar />

            <main className="relative z-10 min-h-screen px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-32">
                <div className="w-full max-w-6xl mx-auto">
                    {/* Page Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12 sm:mb-16 md:mb-20"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-50">
                                Services
                            </span>
                            <div className="h-px w-12 sm:w-16 bg-white/20" />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.03em] leading-[1.1] mb-4 sm:mb-6"
                        >
                            What I Do
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-sm sm:text-base md:text-lg opacity-60 max-w-2xl leading-relaxed"
                        >
                            I don't just write code — I build solutions. From simple landing
                            pages to complex web platforms, I focus on creating software that
                            actually works for real businesses and real users.
                        </motion.p>
                    </motion.header>

                    {/* Services Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
                    >
                        {services.map((service) => {
                            const isActive = activeService === service.id;
                            return (
                                <motion.div
                                    key={service.id}
                                    variants={itemVariants}
                                    onMouseEnter={() => setActiveService(service.id)}
                                    onMouseLeave={() => setActiveService(null)}
                                    className={`group relative rounded-xl sm:rounded-2xl border transition-all duration-500 cursor-default overflow-hidden ${isActive
                                            ? "border-white/20 bg-white/[0.04]"
                                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                                        }`}
                                >
                                    {/* Glow effect on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"
                                            }`}
                                    />

                                    <div className="relative p-5 sm:p-6 md:p-8">
                                        {/* Service number + icon */}
                                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`text-2xl sm:text-3xl font-normal transition-opacity duration-500 ${isActive ? "opacity-30" : "opacity-10"
                                                        }`}
                                                >
                                                    {service.id}
                                                </span>
                                                <div className="h-4 w-px bg-white/10" />
                                                <span
                                                    className={`opacity-40 transition-opacity duration-300 ${isActive ? "opacity-70" : ""
                                                        }`}
                                                >
                                                    {service.icon}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title + subtitle */}
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-normal tracking-[0.02em] mb-1">
                                            {service.title}
                                        </h2>
                                        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-40 block mb-3 sm:mb-4">
                                            {service.subtitle}
                                        </span>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm leading-relaxed opacity-60 mb-4 sm:mb-5">
                                            {service.description}
                                        </p>

                                        {/* Divider */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: isActive ? 1 : 0.3 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="h-px w-full bg-white/10 mb-4 sm:mb-5 origin-left"
                                        />

                                        {/* Highlights */}
                                        <div className="space-y-1.5 sm:space-y-2">
                                            {service.highlights.map((highlight, i) => (
                                                <motion.div
                                                    key={highlight}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{
                                                        opacity: isActive ? 0.8 : 0.4,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: isActive ? i * 0.05 : 0,
                                                        ease: "easeOut",
                                                    }}
                                                    className="flex items-center gap-2 sm:gap-2.5"
                                                >
                                                    <div
                                                        className={`w-1 h-1 rounded-full transition-all duration-500 ${isActive
                                                                ? "bg-white/60 scale-110"
                                                                : "bg-white/20"
                                                            }`}
                                                    />
                                                    <span className="text-[11px] sm:text-xs tracking-wide">
                                                        {highlight}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Bottom approach section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/[0.08]"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                            {[
                                {
                                    label: "Approach",
                                    value: "Problem-First",
                                    description:
                                        "I start by understanding the problem, not jumping into code. Every feature should have a clear purpose.",
                                },
                                {
                                    label: "Philosophy",
                                    value: "Build to Last",
                                    description:
                                        "Clean code, scalable architecture, and maintainable systems that grow with your business.",
                                },
                                {
                                    label: "Commitment",
                                    value: "End-to-End",
                                    description:
                                        "From initial concept to deployment and beyond — I handle the full development lifecycle.",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 1 + index * 0.15,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-40 block mb-1.5 sm:mb-2">
                                        {item.label}
                                    </span>
                                    <span className="text-lg sm:text-xl md:text-2xl font-normal tracking-[0.02em] block mb-2 sm:mb-3">
                                        {item.value}
                                    </span>
                                    <p className="text-xs sm:text-sm leading-relaxed opacity-50">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Navigation hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.5 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase"
            >
                Scroll to continue
            </motion.div>
        </div>
    );
}
