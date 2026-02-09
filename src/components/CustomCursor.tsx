"use client";

import { useEffect, useState, useCallback } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 rounded-full transition-all duration-200 ease-out"
        style={{
          width: isHovering ? 25 : 10,
          height: isHovering ? 25 : 10,
          transform: "translate(-50%, -50%)",
          border: isHovering ? "1px solid #F5F5F5" : "none",
          backgroundColor: isHovering ? "transparent" : "#F5F5F5",
        }}
      />
      {isHovering && (
        <div
          className="absolute left-1/2 top-1/2 bg-[#F5F5F5] transition-opacity duration-200 ease-out"
          style={{
            width: 15,
            height: 1,
            transform: "translate(-50%, -50%) rotate(-90deg)",
          }}
        />
      )}
    </div>
  );
}
