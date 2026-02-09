"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "list-the-mountain-sound-muted";

export default function PageTransitionSound() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true); // start true until we've read localStorage
  const prevPathRef = useRef<string | null>(null);

  // Read persisted mute preference on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setMuted(stored === "true");
    } catch {
      setMuted(false);
    }
  }, []);

  // Create audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const base = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_BASE_PATH || "") : "";
    const audio = new Audio(`${base}/sounds/snow-step.mp3`);
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Play on pathname change (skip initial mount to avoid sound on first load if desired; or play on every change)
  useEffect(() => {
    if (prevPathRef.current !== null && prevPathRef.current !== pathname && !muted && audioRef.current) {
      const a = audioRef.current;
      a.currentTime = 0;
      a.play().catch(() => {});
    }
    prevPathRef.current = pathname;
  }, [pathname, muted]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-[9998] rounded border border-brand-accent/50 bg-brand-background/80 px-3 py-1.5 text-[10px] uppercase tracking-widest text-brand-parchment transition-colors hover:bg-brand-accent/20"
        aria-label={muted ? "Enable navigation sounds" : "Mute navigation sounds"}
      >
        {muted ? "Sound off" : "Sound on"}
      </button>
    </>
  );
}
