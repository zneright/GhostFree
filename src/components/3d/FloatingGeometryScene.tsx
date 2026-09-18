// ==============================================================================
// GhostFree — FloatingGeometryScene Component
// Cinematic Full-Screen Ambient 3D Backdrop (React Three Fiber)
// Weightless Frosted Glass Orb + Undulating Möbius Ribbon + Atmospheric Fog
// ==============================================================================

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingGeometrySceneProps {
  isLightMode: boolean;
}

export const FloatingGeometryScene: React.FC<FloatingGeometrySceneProps> = ({ isLightMode }) => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Mouse tracking state for subtle viewport parallax
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Accessibility check for reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Sync atmospheric fog with active theme
  useEffect(() => {
    const fogColor = isLightMode ? "#F8FAFC" : "#0A1628";
    const fogDensity = isLightMode ? 0.045 : 0.055;
    scene.fog = new THREE.FogExp2(fogColor, fogDensity);
    return () => {
      scene.fog = null;
    };
  }, [scene, isLightMode]);

  // Pointer move handler for ambient parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Generate ambient stardust depth particles
  const particlePositions = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = -4 - Math.random() * 10;
    }
    return positions;
  }, []);

  // Frame animation loop with harmonic sine-wave anti-gravity math
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Smoothly interpolate mouse coordinates for gentle scene tilt
      currentMouse.current.x = THREE.MathUtils.lerp(
        currentMouse.current.x,
        targetMouse.current.x,
        0.03
      );
      currentMouse.current.y = THREE.MathUtils.lerp(
        currentMouse.current.y,
        targetMouse.current.y,
        0.03
      );

      if (groupRef.current) {
        groupRef.current.rotation.y = currentMouse.current.x * 0.12;
        groupRef.current.rotation.x = -currentMouse.current.y * 0.08;
      }

      // 1. Weightless Frosted Orb harmonic oscillation
      if (orbRef.current) {
        orbRef.current.position.y = 1.0 + Math.sin(t * 0.5) * 0.25;
        orbRef.current.position.x = 3.6 + Math.cos(t * 0.35) * 0.18;
        orbRef.current.rotation.y += delta * 0.06;
      }

      // 2. Undulating Fluid Möbius Ribbon motion
      if (ribbonRef.current) {
        ribbonRef.current.position.y = -1.6 + Math.sin(t * 0.4 + 1.2) * 0.22;
        ribbonRef.current.position.x = -3.4 + Math.cos(t * 0.3) * 0.15;
        ribbonRef.current.rotation.x += delta * 0.07;
        ribbonRef.current.rotation.y += delta * 0.1;
        ribbonRef.current.rotation.z += delta * 0.04;
      }

      // 3. Stardust particles subtle vertical drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = t * 0.015;
      }
    }
  });

  // Frosted physical glassmorphism material
  const frostedGlassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.28 : 0.22,
      transmission: 0.95,
      thickness: 2.2,
      ior: 1.42,
      reflectivity: 0.82,
      transparent: true,
      opacity: 0.92,
      color: new THREE.Color(isLightMode ? "#ffffff" : "#0c1729"),
      attenuationColor: new THREE.Color(isLightMode ? "#fef3c7" : "#38bdf8"),
      attenuationDistance: isLightMode ? 3.5 : 1.5,
      emissive: new THREE.Color(isLightMode ? "#000000" : "#022c22"),
      emissiveIntensity: isLightMode ? 0.0 : 0.3,
    });
  }, [isLightMode]);

  // Ethereal ribbon material with subtle metallic sheen
  const fluidRibbonMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.24 : 0.18,
      transmission: 0.9,
      thickness: 1.8,
      ior: 1.48,
      reflectivity: 0.88,
      transparent: true,
      opacity: 0.9,
      color: new THREE.Color(isLightMode ? "#f8fafc" : "#081326"),
      attenuationColor: new THREE.Color(isLightMode ? "#f59e0b" : "#10b981"),
      attenuationDistance: isLightMode ? 3.0 : 1.2,
      emissive: new THREE.Color(isLightMode ? "#fffbeb" : "#064e3b"),
      emissiveIntensity: isLightMode ? 0.05 : 0.45,
    });
  }, [isLightMode]);

  return (
    <>
      {/* ========================================================
          ATMOSPHERIC DUAL-THEME LIGHTING RIG
         ======================================================== */}
      {/* 1. Ambient Fill Light */}
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0f172a"}
        intensity={isLightMode ? 1.8 : 0.5}
      />

      {/* 2. Key Directional Sun / Spotlight */}
      <directionalLight
        position={[10, 15, 8]}
        color={isLightMode ? "#fffbeb" : "#38bdf8"}
        intensity={isLightMode ? 2.2 : 1.5}
      />

      {/* 3. Rim Accent Light 1 (Gold / Emerald Grazing) */}
      <pointLight
        position={[-8, -5, 4]}
        color={isLightMode ? "#f59e0b" : "#10b981"}
        intensity={isLightMode ? 1.4 : 2.8}
        distance={28}
      />

      {/* 4. Rim Accent Light 2 (Sky / Gold Fill) */}
      <pointLight
        position={[8, -6, -4]}
        color={isLightMode ? "#0284c7" : "#f59e0b"}
        intensity={isLightMode ? 1.0 : 2.2}
        distance={28}
      />

      {/* ========================================================
          FULL-SCREEN AMBIENT GEOMETRY GROUP
         ======================================================== */}
      <group ref={groupRef}>
        {/* 1. Upper Right Weightless Frosted Orb */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.4}
          rotationIntensity={prefersReducedMotion ? 0 : 0.4}
          floatIntensity={prefersReducedMotion ? 0 : 0.8}
        >
          <mesh
            ref={orbRef}
            position={[3.6, 1.0, -2.0]}
            scale={[1.6, 1.6, 1.6]}
            material={frostedGlassMaterial}
          >
            <sphereGeometry args={[1, 64, 64]} />
          </mesh>
        </Float>

        {/* 2. Lower Left Undulating Fluid Möbius Ribbon */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.6}
          rotationIntensity={prefersReducedMotion ? 0 : 0.6}
          floatIntensity={prefersReducedMotion ? 0 : 0.9}
        >
          <mesh
            ref={ribbonRef}
            position={[-3.4, -1.6, -2.5]}
            scale={[1.2, 1.2, 1.2]}
            material={fluidRibbonMaterial}
          >
            <torusKnotGeometry args={[1.5, 0.42, 128, 32, 2, 3]} />
          </mesh>
        </Float>

        {/* 3. Ambient Stardust Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlePositions.length / 3}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color={isLightMode ? "#cbd5e1" : "#38bdf8"}
            transparent
            opacity={isLightMode ? 0.4 : 0.6}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
};

export default FloatingGeometryScene;
