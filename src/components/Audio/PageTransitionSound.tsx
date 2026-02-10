"use client";

import { useEffect, useRef } from "react";
import { useArchive } from "@/contexts/ArchiveContext";

const AMBIENT_VOLUME = 0.05;
const SNOW_CRUNCH_VOLUME = 0.12;

/**
 * Very low-frequency "wind" presence (barely audible rumble).
 * Starts only after user clicks "ENTER THE ARCHIVE".
 */
function useAmbientWind(hasEntered: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!hasEntered) return;

    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    ctxRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 80;
    filter.Q.value = 0.5;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 42;
    gain.gain.value = AMBIENT_VOLUME;
    osc.start(ctx.currentTime);

    return () => {
      osc.stop();
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
      ctx.close().catch(() => {});
      ctxRef.current = null;
    };
  }, [hasEntered]);
}

/**
 * Short "snow crunch" / transition tick. Call on route change or link click.
 */
export function playSnowCrunch() {
  if (typeof window === "undefined") return;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(SNOW_CRUNCH_VOLUME, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

export default function PageTransitionSound() {
  const { isEntered } = useArchive();
  useAmbientWind(isEntered);

  return null;
}
