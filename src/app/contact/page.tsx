"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ClipPathLinks } from "@/components/ui/clip-path-links";
import { Particles } from "@/components/ui/particles";

export default function ContactPage() {
  const router = useRouter();
  const hasNavigated = useRef(false);
  const threshold = 100;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    hasNavigated.current = false;
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasNavigated.current) return;

      const scrollY = window.scrollY;

      if (e.deltaY < 0 && scrollY <= threshold) {
        hasNavigated.current = true;
        router.push("/skills");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send email via API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white font-[var(--font-iceland)]">
      {/* Subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-zinc-950 via-black to-black pointer-events-none" />

      {/* Particles background */}
      <Particles
        className="fixed inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        size={0.4}
      />

      <Navbar />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl mx-auto"
        >
          {/* Page Header */}
          <motion.header variants={itemVariants} className="mb-8 sm:mb-12 text-center">
            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-50">
              Contact
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-12 bg-white/20 mx-auto my-4 sm:my-6 origin-center"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.03em] leading-tight mb-3 sm:mb-4 px-4">
              Let's Connect
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-60 max-w-md mx-auto mb-4 sm:mb-6 px-4">
              Have a project in mind or just want to say hello?
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4"
            >
              <a
                href="mailto:iskandar@danish.my"
                className="inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="group-hover:underline">iskandar@danish.my</span>
              </a>
            </motion.div>
          </motion.header>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mb-12 sm:mb-16 space-y-4 sm:space-y-5"
          >
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "name" || formData.name
                    ? "-top-2.5 text-xs opacity-60 bg-black px-1"
                    : "top-3.5 text-sm opacity-40"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-lg focus:outline-none focus:border-white/40 transition-all duration-300 text-white"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "email" || formData.email
                    ? "-top-2.5 text-xs opacity-60 bg-black px-1"
                    : "top-3.5 text-sm opacity-40"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-lg focus:outline-none focus:border-white/40 transition-all duration-300 text-white"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "message" || formData.message
                    ? "-top-2.5 text-xs opacity-60 bg-black px-1"
                    : "top-3.5 text-sm opacity-40"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                className="w-full px-4 py-3.5 bg-transparent border border-white/15 rounded-lg focus:outline-none focus:border-white/40 transition-all duration-300 text-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full px-6 py-4 bg-white text-black rounded-lg font-medium tracking-[0.1em] uppercase text-sm hover:bg-white/90 transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-white/10 border border-white/20 rounded-lg text-sm text-center"
                >
                  <p className="text-green-400">✓ Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-white/10 border border-red-500/20 rounded-lg text-sm text-center"
                >
                  <p className="text-red-400">✗ Failed to send message. Please try again or email me directly at iskandar@danish.my</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs tracking-widest uppercase opacity-40">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Social Links Section */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm opacity-50 mb-6">Find me on</p>
            <div className="w-full max-w-sm mx-auto">
              <ClipPathLinks />
            </div>
          </motion.div>

        </motion.div>
      </main>

      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase"
      >
        Scroll up to go back
      </motion.div>
    </div>
  );
}
