"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest("a, button, [role='button']")) setIsHovering(true);
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      if (
        !related?.closest("a, button, [role='button']") &&
        !target?.closest("a, button, [role='button']")
      )
        setIsHovering(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseMove]);

  if (!mounted) return null;

  return (
    <div
      id="custom-cursor"
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      <motion.div
        className="flex origin-center items-center justify-center"
        animate={{ rotate: isHovering ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* North Marker: upward-pointing triangle, filled brand-accent */}
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          className="text-brand-accent"
        >
          <path
            d="M7 0L14 16H0L7 0Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
}
