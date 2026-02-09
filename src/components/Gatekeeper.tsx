"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const GatekeeperScene = dynamic(
  () => import("@/components/Three/GatekeeperScene").then((m) => m.default),
  { ssr: false }
);

type GatekeeperProps = {
  children: React.ReactNode;
};

export default function Gatekeeper({ children }: GatekeeperProps) {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <>
      {children}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* 3D wireframe mountain background — behind text */}
            <div className="absolute inset-0 z-[-1] h-full w-full">
              <GatekeeperScene />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <p className="font-display text-center text-3xl font-bold uppercase tracking-[0.3em] text-brand-parchment md:text-4xl">
                LIST THE MOUNTAIN
              </p>
              <button
                type="button"
                onClick={() => setIsEntered(true)}
                className="group relative mt-10 text-xs uppercase tracking-widest text-brand-accent transition-colors hover:text-brand-accent"
              >
                ENTER THE ARCHIVE
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-accent transition-all duration-200 group-hover:w-full" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
