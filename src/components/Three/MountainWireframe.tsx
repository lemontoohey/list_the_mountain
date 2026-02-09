"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const PARCHMENT = "#F4F1EA";
const VERMILION = "#D94A38";

const PEAK = 4;
const FALLOFF = 0.4;
const heightAt = (x: number, y: number) =>
  Math.max(0, PEAK - Math.sqrt(x * x + y * y) * FALLOFF);

function DisplacedPlane() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(12, 12, 100, 100);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, heightAt(x, y));
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color={PARCHMENT}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function PulsingDot({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color={VERMILION} />
    </mesh>
  );
}

export default function MountainWireframe() {
  const highPoints: [number, number, number][] = useMemo(
    () => [
      [0, 0, heightAt(0, 0)],
      [1.5, 1.2, heightAt(1.5, 1.2)],
      [-1.8, 0.8, heightAt(-1.8, 0.8)],
      [0.5, -2, heightAt(0.5, -2)],
    ],
    []
  );

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group rotation={[-Math.PI / 2.5, 0, 0]}>
        <DisplacedPlane />
        {highPoints.map((pos, i) => (
          <PulsingDot key={i} position={pos} />
        ))}
      </group>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
      />
    </>
  );
}
