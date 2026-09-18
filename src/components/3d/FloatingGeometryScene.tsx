// ==============================================================================
// GhostFree — FloatingGeometryScene Component
// Cinematic Full-Screen Ambient 3D Backdrop (React Three Fiber)
// Luminous Anti-Gravity Artifacts: Faceted Crystal Gyroscope + Fluid Möbius Ribbon +
// Orbital Satellite Prisms + Ambient Stardust Field
// Fully visible, responsive mouse parallax, dynamic Sunlight & Dark Mode synergy
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
  const crystalRef = useRef<THREE.Mesh>(null);
  const gyroRingRef = useRef<THREE.Mesh>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Mouse tracking state for dynamic viewport parallax
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Accessibility check for reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Sync subtle atmospheric fog with active theme (low density so objects remain crisp)
  useEffect(() => {
    const fogColor = isLightMode ? "#F8FAFC" : "#0A1628";
    const fogDensity = isLightMode ? 0.015 : 0.018;
    scene.fog = new THREE.FogExp2(fogColor, fogDensity);
    return () => {
      scene.fog = null;
    };
  }, [scene, isLightMode]);

  // Pointer move handler for interactive parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Generate 80 ambient stardust depth particles
  const particlePositions = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = 1 - Math.random() * 8;
    }
    return positions;
  }, []);

  // Frame animation loop with harmonic anti-gravity floating math
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Smoothly interpolate mouse coordinates for organic scene tilting
      currentMouse.current.x = THREE.MathUtils.lerp(
        currentMouse.current.x,
        targetMouse.current.x,
        0.04
      );
      currentMouse.current.y = THREE.MathUtils.lerp(
        currentMouse.current.y,
        targetMouse.current.y,
        0.04
      );

      if (groupRef.current) {
        groupRef.current.rotation.y = currentMouse.current.x * 0.18;
        groupRef.current.rotation.x = -currentMouse.current.y * 0.12;
      }

      // 1. Faceted Crystal breathing oscillation
      if (crystalRef.current) {
        crystalRef.current.rotation.x += delta * 0.12;
        crystalRef.current.rotation.y += delta * 0.18;
      }

      // 2. Gyroscope Ring independent orbital spin
      if (gyroRingRef.current) {
        gyroRingRef.current.rotation.x += delta * 0.22;
        gyroRingRef.current.rotation.z += delta * 0.14;
      }

      // 3. Undulating Fluid Möbius Ribbon
      if (ribbonRef.current) {
        ribbonRef.current.position.y = -0.8 + Math.sin(t * 0.45 + 1.0) * 0.25;
        ribbonRef.current.position.x = -3.2 + Math.cos(t * 0.3) * 0.18;
        ribbonRef.current.rotation.x += delta * 0.08;
        ribbonRef.current.rotation.y += delta * 0.12;
        ribbonRef.current.rotation.z += delta * 0.06;
      }

      // 4. Satellite 1 (Octahedron prism)
      if (satellite1Ref.current) {
        satellite1Ref.current.position.y = -2.2 + Math.sin(t * 0.6 + 2.0) * 0.2;
        satellite1Ref.current.rotation.x += delta * 0.2;
        satellite1Ref.current.rotation.y += delta * 0.25;
      }

      // 5. Satellite 2 (Top Diamond)
      if (satellite2Ref.current) {
        satellite2Ref.current.position.y = 2.2 + Math.cos(t * 0.5) * 0.18;
        satellite2Ref.current.rotation.y += delta * 0.15;
        satellite2Ref.current.rotation.z += delta * 0.22;
      }

      // 6. Stardust particles subtle vertical drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = t * 0.02;
      }
    }
  });

  // Frosted Luminous Physical Crystal Material
  const crystalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.16 : 0.12,
      metalness: isLightMode ? 0.08 : 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      transparent: true,
      opacity: isLightMode ? 0.84 : 0.88,
      color: new THREE.Color(isLightMode ? "#ffffff" : "#132a4a"),
      emissive: new THREE.Color(isLightMode ? "#fef3c7" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.2 : 0.42,
    });
  }, [isLightMode]);

  // Glowing Metallic Gyroscope Ring Material
  const gyroRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.25 : 0.18,
      metalness: isLightMode ? 0.75 : 0.85,
      color: new THREE.Color(isLightMode ? "#f59e0b" : "#f59e0b"),
      emissive: new THREE.Color(isLightMode ? "#fbbf24" : "#d97706"),
      emissiveIntensity: isLightMode ? 0.3 : 0.55,
    });
  }, [isLightMode]);

  // Ethereal Emerald / Teal Ribbon Material
  const ribbonMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.22 : 0.16,
      metalness: isLightMode ? 0.15 : 0.28,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: isLightMode ? 0.82 : 0.86,
      color: new THREE.Color(isLightMode ? "#fde68a" : "#0d9488"),
      emissive: new THREE.Color(isLightMode ? "#f59e0b" : "#047857"),
      emissiveIntensity: isLightMode ? 0.25 : 0.48,
    });
  }, [isLightMode]);

  // Satellite Accent Material (Electric Sky Cyan / Gold)
  const satelliteMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.2 : 0.15,
      metalness: isLightMode ? 0.6 : 0.75,
      color: new THREE.Color(isLightMode ? "#0ea5e9" : "#38bdf8"),
      emissive: new THREE.Color(isLightMode ? "#38bdf8" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.25 : 0.5,
    });
  }, [isLightMode]);

  return (
    <>
      {/* ========================================================
          ATMOSPHERIC DUAL-THEME LIGHTING RIG
         ======================================================== */}
      {/* 1. Ambient Fill Light */}
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0f2942"}
        intensity={isLightMode ? 2.0 : 0.85}
      />

      {/* 2. Key Directional Sunlight */}
      <directionalLight
        position={[12, 16, 10]}
        color={isLightMode ? "#fffbeb" : "#7dd3fc"}
        intensity={isLightMode ? 2.6 : 2.0}
      />

      {/* 3. Rim Accent Light 1 (Gold / Amber Grazing Glow) */}
      <pointLight
        position={[-9, -4, 5]}
        color={isLightMode ? "#f59e0b" : "#f59e0b"}
        intensity={isLightMode ? 2.2 : 3.5}
        distance={30}
      />

      {/* 4. Rim Accent Light 2 (Sky / Emerald Fill) */}
      <pointLight
        position={[9, -5, -3]}
        color={isLightMode ? "#0284c7" : "#10b981"}
        intensity={isLightMode ? 1.8 : 2.8}
        distance={30}
      />

      {/* ========================================================
          FULL-SCREEN AMBIENT GEOMETRY GROUP
         ======================================================== */}
      <group ref={groupRef}>
        {/* ARTIFACT A: Right Flank Anti-Gravity Gyroscope */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.5}
          rotationIntensity={prefersReducedMotion ? 0 : 0.5}
          floatIntensity={prefersReducedMotion ? 0 : 0.9}
        >
          <group position={[3.3, 0.5, -1.0]}>
            {/* Core Faceted Icosahedron Crystal */}
            <mesh ref={crystalRef} scale={[1.35, 1.35, 1.35]} material={crystalMaterial}>
              <icosahedronGeometry args={[1, 1]} />
            </mesh>

            {/* Orbiting Gyroscope Ring */}
            <mesh ref={gyroRingRef} rotation={[Math.PI / 4, 0, 0]} material={gyroRingMaterial}>
              <torusGeometry args={[1.85, 0.055, 16, 64]} />
            </mesh>
          </group>
        </Float>

        {/* ARTIFACT B: Left Flank Undulating Fluid Möbius Ribbon */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.8}
          rotationIntensity={prefersReducedMotion ? 0 : 0.7}
          floatIntensity={prefersReducedMotion ? 0 : 1.0}
        >
          <mesh
            ref={ribbonRef}
            position={[-3.2, -0.8, -1.5]}
            scale={[1.3, 1.3, 1.3]}
            material={ribbonMaterial}
          >
            <torusKnotGeometry args={[1.4, 0.38, 128, 32, 2, 3]} />
          </mesh>
        </Float>

        {/* ARTIFACT C: Lower Right Floating Octahedron Satellite */}
        <Float
          speed={prefersReducedMotion ? 0 : 2.2}
          rotationIntensity={prefersReducedMotion ? 0 : 1.2}
          floatIntensity={prefersReducedMotion ? 0 : 1.4}
        >
          <mesh
            ref={satellite1Ref}
            position={[2.4, -2.2, -1.2]}
            scale={[0.7, 0.7, 0.7]}
            material={satelliteMaterial}
          >
            <octahedronGeometry args={[1, 0]} />
          </mesh>
        </Float>

        {/* ARTIFACT D: Top Center Weightless Diamond Satellite */}
        <Float
          speed={prefersReducedMotion ? 0 : 1.6}
          rotationIntensity={prefersReducedMotion ? 0 : 0.9}
          floatIntensity={prefersReducedMotion ? 0 : 1.1}
        >
          <mesh
            ref={satellite2Ref}
            position={[-2.0, 2.2, -1.8]}
            scale={[0.6, 0.6, 0.6]}
            material={crystalMaterial}
          >
            <icosahedronGeometry args={[1, 0]} />
          </mesh>
        </Float>

        {/* ARTIFACT E: Ambient Stardust Field */}
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
            size={0.08}
            color={isLightMode ? "#94a3b8" : "#38bdf8"}
            transparent
            opacity={isLightMode ? 0.6 : 0.75}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
};

export default FloatingGeometryScene;
