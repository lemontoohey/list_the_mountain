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
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <MountainWireframe />
      </Canvas>
    </div>
  );
}
