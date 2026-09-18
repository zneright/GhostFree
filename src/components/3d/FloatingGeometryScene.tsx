// ==============================================================================
// GhostFree — FloatingGeometryScene Component
// 3D Procedural "Anti-Gravity" Mesh Scene with Dual-Theme Lighting (R3F)
// ==============================================================================

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingGeometrySceneProps {
  isLightMode: boolean;
}

export const FloatingGeometryScene: React.FC<FloatingGeometrySceneProps> = ({ isLightMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  // Mouse tracking state for subtle parallax
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalized coordinates (-1 to 1)
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!prefersReducedMotion) {
      // Smoothly interpolate mouse coordinates for silky parallax
      currentMouse.current.x = THREE.MathUtils.lerp(
        currentMouse.current.x,
        targetMouse.current.x,
        0.05
      );
      currentMouse.current.y = THREE.MathUtils.lerp(
        currentMouse.current.y,
        targetMouse.current.y,
        0.05
      );

      if (groupRef.current) {
        groupRef.current.rotation.y = currentMouse.current.x * 0.25;
        groupRef.current.rotation.x = -currentMouse.current.y * 0.2;
      }

      // Continuous slow rotation for the central anti-gravity knot
      if (knotRef.current) {
        knotRef.current.rotation.x += delta * 0.15;
        knotRef.current.rotation.y += delta * 0.2;
        knotRef.current.rotation.z += delta * 0.05;
      }

      // Slow satellite rotations
      if (icosahedronRef.current) {
        icosahedronRef.current.rotation.x += delta * 0.3;
        icosahedronRef.current.rotation.y -= delta * 0.25;
      }
      if (octahedronRef.current) {
        octahedronRef.current.rotation.z += delta * 0.2;
        octahedronRef.current.rotation.y += delta * 0.35;
      }
      if (torusRef.current) {
        torusRef.current.rotation.x -= delta * 0.25;
        torusRef.current.rotation.z += delta * 0.3;
      }
    }
  });

  // Dynamic theme-reactive physical glass materials
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.12 : 0.08,
      transmission: 0.92,
      thickness: 1.8,
      ior: 1.48,
      reflectivity: 0.85,
      transparent: true,
      opacity: 0.95,
      color: new THREE.Color(isLightMode ? "#ffffff" : "#0f172a"),
      attenuationColor: new THREE.Color(isLightMode ? "#fef3c7" : "#38bdf8"),
      attenuationDistance: isLightMode ? 3.0 : 1.2,
      emissive: new THREE.Color(isLightMode ? "#000000" : "#022c22"),
      emissiveIntensity: isLightMode ? 0.0 : 0.4,
    });
  }, [isLightMode]);

  // Accent ring / iridescent satellite material
  const accentMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.18 : 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.55,
      reflectivity: 0.9,
      transparent: true,
      color: new THREE.Color(isLightMode ? "#fffbeb" : "#0a1628"),
      attenuationColor: new THREE.Color(isLightMode ? "#f59e0b" : "#10b981"),
      attenuationDistance: isLightMode ? 2.5 : 0.8,
      emissive: new THREE.Color(isLightMode ? "#fef3c7" : "#064e3b"),
      emissiveIntensity: isLightMode ? 0.1 : 0.6,
    });
  }, [isLightMode]);

  return (
    <>
      {/* ========================================================
          DYNAMIC DUAL-THEME LIGHTING RIG
         ======================================================== */}
      {/* 1. Ambient Fill Light */}
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0f172a"}
        intensity={isLightMode ? 1.5 : 0.6}
      />

      {/* 2. Key Directional Sun / Spotlight */}
      <directionalLight
        position={[8, 12, 6]}
        color={isLightMode ? "#fffdf5" : "#38bdf8"}
        intensity={isLightMode ? 2.0 : 1.6}
      />

      {/* 3. Rim Accent Light 1 (Warm Amber / Sunlight Glow) */}
      <pointLight
        position={[-7, -4, 4]}
        color={isLightMode ? "#f59e0b" : "#10b981"}
        intensity={isLightMode ? 1.8 : 3.0}
        distance={25}
      />

      {/* 4. Rim Accent Light 2 (Sky / Cyan Fill) */}
      <pointLight
        position={[7, -5, -4]}
        color={isLightMode ? "#0284c7" : "#f59e0b"}
        intensity={isLightMode ? 1.4 : 2.5}
        distance={25}
      />

      {/* ========================================================
          FLOATING "ANTI-GRAVITY" GEOMETRIC MESH GROUP
         ======================================================== */}
      <group ref={groupRef}>
        {/* Central Weightless Torus Knot */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.8}
          rotationIntensity={prefersReducedMotion ? 0 : 0.8}
          floatIntensity={prefersReducedMotion ? 0 : 1.2}
          floatingRange={[-0.2, 0.2]}
        >
          <mesh
            ref={knotRef}
            position={[0, 0.4, 0]}
            scale={[1.1, 1.1, 1.1]}
            material={glassMaterial}
          >
            <torusKnotGeometry args={[1.2, 0.36, 128, 32, 2, 3]} />
          </mesh>
        </Float>

        {/* Satellite 1: Floating Icosahedron (Top Right) */}
        <Float
          speed={prefersReducedMotion ? 0 : 2.2}
          rotationIntensity={prefersReducedMotion ? 0 : 1.5}
          floatIntensity={prefersReducedMotion ? 0 : 1.8}
          floatingRange={[-0.3, 0.3]}
        >
          <mesh
            ref={icosahedronRef}
            position={[3.2, 1.8, -1.0]}
            scale={[0.65, 0.65, 0.65]}
            material={accentMaterial}
          >
            <icosahedronGeometry args={[1, 0]} />
          </mesh>
        </Float>

        {/* Satellite 2: Refractive Sphere (Top Left) */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.6}
          rotationIntensity={prefersReducedMotion ? 0 : 1.2}
          floatIntensity={prefersReducedMotion ? 0 : 2.0}
          floatingRange={[-0.25, 0.25]}
        >
          <mesh
            ref={sphereRef}
            position={[-3.4, 1.5, -0.8]}
            scale={[0.55, 0.55, 0.55]}
            material={glassMaterial}
          >
            <sphereGeometry args={[1, 32, 32]} />
          </mesh>
        </Float>

        {/* Satellite 3: Floating Octahedron (Bottom Left) */}
        <Float
          speed={prefersReducedMotion ? 0 : 2.4}
          rotationIntensity={prefersReducedMotion ? 0 : 1.8}
          floatIntensity={prefersReducedMotion ? 0 : 1.6}
          floatingRange={[-0.2, 0.2]}
        >
          <mesh
            ref={octahedronRef}
            position={[-2.8, -1.8, -0.5]}
            scale={[0.6, 0.6, 0.6]}
            material={accentMaterial}
          >
            <octahedronGeometry args={[1, 0]} />
          </mesh>
        </Float>

        {/* Satellite 4: Floating Torus Ring (Bottom Right) */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.9}
          rotationIntensity={prefersReducedMotion ? 0 : 1.6}
          floatIntensity={prefersReducedMotion ? 0 : 1.8}
          floatingRange={[-0.3, 0.3]}
        >
          <mesh
            ref={torusRef}
            position={[2.9, -1.7, -0.6]}
            scale={[0.7, 0.7, 0.7]}
            material={glassMaterial}
          >
            <torusGeometry args={[0.7, 0.22, 24, 48]} />
          </mesh>
        </Float>
      </group>
    </>
  );
};

export default FloatingGeometryScene;
