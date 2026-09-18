// ==============================================================================
// GhostFree — CtaScene Component (Section 08: Final CTA Resolution)
// Meaningful 3D Storytelling: The Solidified Anti-Ghost Seal of Finality
// The Nullifier Ring locks securely around the protected Core, emitting a radiant
// celebration halo, symbolizing immutable calamity protection & zero ghost claims
// ==============================================================================

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import SceneContainer from "./shared/SceneContainer";

interface CtaSceneContentProps {
  isLightMode: boolean;
}

const CtaSceneContent: React.FC<CtaSceneContentProps> = ({ isLightMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const lockRingRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Sealed Core Material (Deep Sapphire / Radiant Opal)
  const coreMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.14 : 0.1,
      metalness: isLightMode ? 0.1 : 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.96,
      transparent: true,
      opacity: isLightMode ? 0.88 : 0.92,
      color: new THREE.Color(isLightMode ? "#ffffff" : "#132a4a"),
      emissive: new THREE.Color(isLightMode ? "#fef3c7" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.3 : 0.55,
    });
  }, [isLightMode]);

  // Locked Anti-Ghost Ring Material (Metallic Gold)
  const ringMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.2 : 0.15,
      metalness: isLightMode ? 0.8 : 0.9,
      color: new THREE.Color("#f59e0b"),
      emissive: new THREE.Color(isLightMode ? "#fbbf24" : "#d97706"),
      emissiveIntensity: isLightMode ? 0.4 : 0.65,
    });
  }, [isLightMode]);

  // Radiant Celebration Halo Material (Emerald / Gold Glow)
  const haloMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.25 : 0.18,
      metalness: isLightMode ? 0.7 : 0.8,
      color: new THREE.Color("#10b981"),
      emissive: new THREE.Color("#34d399"),
      emissiveIntensity: isLightMode ? 0.45 : 0.75,
      transparent: true,
      opacity: 0.85,
    });
  }, [isLightMode]);

  // Expanding stardust particles
  const particlePositions = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = 1 - Math.random() * 5;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.12;
      coreRef.current.rotation.y += delta * 0.16;
    }

    if (lockRingRef.current) {
      lockRingRef.current.rotation.z += delta * 0.15;
    }

    if (outerHaloRef.current) {
      outerHaloRef.current.rotation.x += delta * 0.1;
      outerHaloRef.current.rotation.y += delta * 0.14;
      const pulse = 1 + Math.sin(t * 1.5) * 0.04;
      outerHaloRef.current.scale.set(pulse, pulse, pulse);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <>
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0d1b2a"}
        intensity={isLightMode ? 2.1 : 0.9}
      />
      <directionalLight
        position={[8, 12, 8]}
        color={isLightMode ? "#fffbeb" : "#7dd3fc"}
        intensity={isLightMode ? 2.6 : 2.2}
      />
      <pointLight
        position={[-6, 0, 5]}
        color="#f59e0b"
        intensity={isLightMode ? 2.2 : 3.5}
        distance={24}
      />
      <pointLight
        position={[6, 0, 5]}
        color="#10b981"
        intensity={isLightMode ? 2.0 : 3.2}
        distance={24}
      />

      <group ref={groupRef} position={[0, 0, 0]}>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          {/* Sealed Core Nucleus */}
          <mesh ref={coreRef} scale={[1.4, 1.4, 1.4]} material={coreMaterial}>
            <icosahedronGeometry args={[1.2, 1]} />
          </mesh>

          {/* Locked Anti-Ghost Ring */}
          <mesh
            ref={lockRingRef}
            rotation={[Math.PI / 4, 0, 0]}
            material={ringMaterial}
          >
            <torusGeometry args={[1.9, 0.065, 16, 64]} />
          </mesh>

          {/* Outer Radiant Finality Halo */}
          <mesh
            ref={outerHaloRef}
            rotation={[-Math.PI / 4, Math.PI / 4, 0]}
            material={haloMaterial}
          >
            <torusGeometry args={[2.3, 0.045, 16, 64]} />
          </mesh>
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
            color={isLightMode ? "#cbd5e1" : "#38bdf8"}
            transparent
            opacity={isLightMode ? 0.5 : 0.7}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
};

export const CtaScene: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <SceneContainer
      className={`absolute inset-0 w-full h-full pointer-events-none -z-0 overflow-hidden ${className}`}
      cameraPosition={[0, 0, 6.5]}
      cameraFov={45}
    >
      {({ isLightMode }) => <CtaSceneContent isLightMode={isLightMode} />}
    </SceneContainer>
  );
};

export default CtaScene;
