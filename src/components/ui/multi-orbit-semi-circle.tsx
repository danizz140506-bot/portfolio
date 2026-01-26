"use client";
import React, { useState, useEffect, useMemo } from "react";

interface FloatingIconProps {
  icon: string;
  label: string;
  iconSize: number;
  x: number;
  y: number;
  animationDelay: number;
  animationIndex: number;
}

function FloatingIcon({
  icon,
  label,
  iconSize,
  x,
  y,
  animationDelay,
  animationIndex,
}: FloatingIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const durations = ["8s", "7s", "6s", "9s", "7.5s"];

  // Apply filters for different icons
  let iconFilter = "brightness(1.1)";
  if (label === "ChatGPT") {
    iconFilter = "brightness(0) invert(1)";
  }

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 5,
        animation: `float-${animationIndex % 3} ${durations[animationIndex % 5]} ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
        animationPlayState: isHovered ? "paused" : "running",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={icon}
        alt={label}
        width={iconSize}
        height={iconSize}
        className="object-contain cursor-pointer drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        style={{
          minWidth: iconSize,
          minHeight: iconSize,
          filter: iconFilter,
          transform: isHovered ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Tooltip */}
      <div
        className="absolute top-[calc(100%+12px)] w-28 rounded-lg bg-black/90 border border-white/20 px-2 py-1 text-xs text-white shadow-lg text-center backdrop-blur-sm pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {label}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full -mb-1.5 w-3 h-3 rotate-45 bg-black/90 border-l border-t border-white/20" />
      </div>
    </div>
  );
}

interface ScatteredIconsProps {
  icons?: string[];
  labels?: string[];
}

export default function MultiOrbitSemiCircle({
  icons = [],
  labels = [],
}: ScatteredIconsProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const iconSize =
    size.width < 480 ? 32 : size.width < 768 ? 40 : 48;

  // Generate scattered positions using a seeded approach for consistency
  const positions = useMemo(() => {
    if (icons.length === 0) return [];

    const coords: Array<{ x: number; y: number }> = [];
    const padding = 8; // percentage from edges
    const minDistance = 12; // minimum percentage distance between icons

    // Predefined scattered positions that look good
    const presetPositions = [
      { x: 5, y: 15 },
      { x: 85, y: 10 },
      { x: 15, y: 45 },
      { x: 75, y: 35 },
      { x: 8, y: 75 },
      { x: 88, y: 65 },
      { x: 35, y: 20 },
      { x: 55, y: 55 },
      { x: 25, y: 70 },
      { x: 65, y: 80 },
      { x: 45, y: 8 },
      { x: 92, y: 40 },
      { x: 3, y: 50 },
      { x: 70, y: 15 },
      { x: 40, y: 85 },
      { x: 20, y: 25 },
    ];

    for (let i = 0; i < icons.length; i++) {
      if (i < presetPositions.length) {
        coords.push(presetPositions[i]);
      } else {
        // Generate additional positions if needed
        let x, y, attempts = 0;
        do {
          x = padding + Math.random() * (100 - 2 * padding);
          y = padding + Math.random() * (100 - 2 * padding);
          attempts++;
        } while (
          attempts < 50 &&
          coords.some(
            (c) => Math.abs(c.x - x) < minDistance && Math.abs(c.y - y) < minDistance
          )
        );
        coords.push({ x, y });
      }
    }

    return coords;
  }, [icons.length]);

  if (icons.length === 0 || size.width === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 60%)",
          animationDuration: "5s",
        }}
      />

      {/* Scattered icons */}
      {icons.map((icon, index) => (
        <div key={index} className="pointer-events-auto">
          <FloatingIcon
            icon={icon}
            label={labels[index] || `Skill ${index + 1}`}
            iconSize={iconSize}
            x={positions[index]?.x || 50}
            y={positions[index]?.y || 50}
            animationDelay={index * 0.3}
            animationIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
