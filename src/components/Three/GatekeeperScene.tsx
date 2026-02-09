"use client";

import dynamic from "next/dynamic";
import MountainWireframe from "./MountainWireframe";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

type Props = { className?: string };

export default function GatekeeperScene({ className = "" }: Props) {
  return (
    <div className={`absolute inset-0 h-full w-full ${className}`}>
      {/* Fallback: solid black if Canvas fails to load */}
      <div className="absolute inset-0 bg-[#000]" aria-hidden />
      <Canvas
        className="!absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <MountainWireframe />
      </Canvas>
    </div>
  );
}
