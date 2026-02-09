"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    setMounted(true);
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

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  if (!mounted) return null;

  const showRing = isHovering || isClicking;
  const isStamp = isClicking;

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Default dot (parchment) — visible when not hovering and not clicking */}
      {!showRing && (
        <div
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-parchment"
          aria-hidden
        />
      )}

      {/* Hover / Click ring (compass style + stamp) — red ink on click */}
      <AnimatePresence>
        {showRing && (
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full border-brand-accent bg-transparent"
            style={{
              width: 25,
              height: 25,
              transform: "translate(-50%, -50%)",
              borderStyle: "solid",
            }}
            initial={false}
            animate={{
              scale: isStamp ? 1.5 : 1,
              borderWidth: isStamp ? 4 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Needle (only when hovering, not during click) */}
      {isHovering && !isClicking && (
        <div
          className="absolute left-1/2 top-1/2 h-px w-[15px] -translate-x-1/2 -translate-y-1/2 bg-brand-accent"
          style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
          aria-hidden
        />
      )}
    </div>
  );
}
