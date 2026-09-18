// ==============================================================================
// GhostFree — HeroScene Component (Section 01: Hero)
// Meaningful 3D Storytelling: The Sovereign Witness Ingestion
// Faceted Crystal Core (citizen's private witness) protected in zero-gravity suspension
// encircled by the golden Anti-Ghost Nullifier Gyroscope Ring
// ==============================================================================

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import SceneContainer from "./shared/SceneContainer";

interface HeroSceneContentProps {
  isLightMode: boolean;
}

const HeroSceneContent: React.FC<HeroSceneContentProps> = ({ isLightMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Mouse tracking state for subtle viewport parallax
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Ambient stardust particles
  const particlePositions = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = 1 - Math.random() * 6;
    }
    return positions;
  }, []);

  // Luminous Private Witness Crystal Material
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
      emissiveIntensity: isLightMode ? 0.22 : 0.44,
    });
  }, [isLightMode]);

  // Metallic Anti-Ghost Nullifier Ring Material
  const ringMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.25 : 0.18,
      metalness: isLightMode ? 0.75 : 0.85,
      color: new THREE.Color(isLightMode ? "#f59e0b" : "#f59e0b"),
      emissive: new THREE.Color(isLightMode ? "#fbbf24" : "#d97706"),
      emissiveIntensity: isLightMode ? 0.35 : 0.55,
    });
  }, [isLightMode]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (!prefersReducedMotion) {
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

      // Core rotation & harmonic oscillation
      if (coreRef.current) {
        coreRef.current.rotation.x += delta * 0.14;
        coreRef.current.rotation.y += delta * 0.18;
      }

      // Nullifier gyroscope ring orbital spin
      if (ringRef.current) {
        ringRef.current.rotation.x += delta * 0.22;
        ringRef.current.rotation.z += delta * 0.16;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = t * 0.015;
      }
    }
  });

  return (
    <>
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0f2942"}
        intensity={isLightMode ? 2.0 : 0.9}
      />
      <directionalLight
        position={[10, 14, 8]}
        color={isLightMode ? "#fffbeb" : "#7dd3fc"}
        intensity={isLightMode ? 2.5 : 2.0}
      />
      <pointLight
        position={[-8, -4, 4]}
        color="#f59e0b"
        intensity={isLightMode ? 2.0 : 3.2}
        distance={25}
      />
      <pointLight
        position={[8, -5, -2]}
        color={isLightMode ? "#0284c7" : "#10b981"}
        intensity={isLightMode ? 1.6 : 2.5}
        distance={25}
      />

      <group ref={groupRef}>
        <Float
          speed={prefersReducedMotion ? 0 : 1.4}
          rotationIntensity={prefersReducedMotion ? 0 : 0.4}
          floatIntensity={prefersReducedMotion ? 0 : 0.8}
        >
          {/* Positioned slightly offset to complement hero headline */}
          <group position={[0, 0, 0]}>
            {/* Luminous Private Witness Core */}
            <mesh ref={coreRef} scale={[1.3, 1.3, 1.3]} material={crystalMaterial}>
              <icosahedronGeometry args={[1.2, 1]} />
            </mesh>

            {/* Orbital Anti-Ghost Gyroscope Ring */}
            <mesh
              ref={ringRef}
              rotation={[Math.PI / 4, 0, 0]}
              material={ringMaterial}
            >
              <torusGeometry args={[1.85, 0.055, 16, 64]} />
            </mesh>
          </group>
        </Float>

        {/* Ambient Stardust Field */}
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
            size={0.07}
            color={isLightMode ? "#94a3b8" : "#38bdf8"}
            transparent
            opacity={isLightMode ? 0.5 : 0.7}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
};

export const HeroScene: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <SceneContainer
      className={`absolute inset-0 w-full h-full pointer-events-none -z-0 overflow-hidden ${className}`}
      cameraPosition={[0, 0, 6.8]}
      cameraFov={45}
    >
      {({ isLightMode }) => <HeroSceneContent isLightMode={isLightMode} />}
    </SceneContainer>
  );
};

export default HeroScene;
