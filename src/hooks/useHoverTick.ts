"use client";

import { useCallback, useRef } from "react";

const UI_VOLUME = 0.12;
const THROTTLE_MS = 120;

/**
 * Plays a very short, high-frequency "mechanical tick" (vintage shutter / compass latch)
 * for link hover feedback. Felt more than heard.
 */
function playTick() {
  if (typeof window === "undefined") return;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(2400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);
  gain.gain.setValueAtTime(UI_VOLUME, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
}

export function useHoverTick() {
  const lastPlayed = useRef(0);

  const onMouseEnter = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayed.current < THROTTLE_MS) return;
    lastPlayed.current = now;
    playTick();
  }, []);

  return { onMouseEnter, playTick };
}
