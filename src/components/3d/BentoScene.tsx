// ==============================================================================
// GhostFree — BentoScene Component (Section 03: Architecture Bento)
// Meaningful 3D Storytelling: The Merkle Inclusion Tree & Cryptographic Lattice
// 4 Sibling Hash Crystals branching in 3D space with laser-thin data splines,
// visualizing local WASM proof verification from witness leaf to official Merkle root
// ==============================================================================

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import SceneContainer from "./shared/SceneContainer";

interface BentoSceneContentProps {
  isLightMode: boolean;
}

const BentoSceneContent: React.FC<BentoSceneContentProps> = ({ isLightMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const rootNodeRef = useRef<THREE.Mesh>(null);
  const node1Ref = useRef<THREE.Mesh>(null);
  const node2Ref = useRef<THREE.Mesh>(null);
  const node3Ref = useRef<THREE.Mesh>(null);
  const node4Ref = useRef<THREE.Mesh>(null);

  const link1Ref = useRef<THREE.Mesh>(null);
  const link2Ref = useRef<THREE.Mesh>(null);
  const link3Ref = useRef<THREE.Mesh>(null);
  const link4Ref = useRef<THREE.Mesh>(null);

  // Sibling Hash Node Material (Electric Cyan)
  const nodeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.2 : 0.14,
      metalness: isLightMode ? 0.65 : 0.75,
      color: new THREE.Color(isLightMode ? "#0ea5e9" : "#38bdf8"),
      emissive: new THREE.Color(isLightMode ? "#38bdf8" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.3 : 0.55,
    });
  }, [isLightMode]);

  // Root Merkle Hash Material (Golden Commitment)
  const rootMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.22 : 0.16,
      metalness: isLightMode ? 0.75 : 0.85,
      color: new THREE.Color(isLightMode ? "#f59e0b" : "#f59e0b"),
      emissive: new THREE.Color(isLightMode ? "#fbbf24" : "#d97706"),
      emissiveIntensity: isLightMode ? 0.35 : 0.6,
    });
  }, [isLightMode]);

  // Laser Spline Links Material (Glowing Data Line)
  const splineMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(isLightMode ? "#0284c7" : "#38bdf8"),
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.65,
    });
  }, [isLightMode]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.25) * 0.08;
    }

    if (rootNodeRef.current) {
      rootNodeRef.current.rotation.y += delta * 0.2;
      rootNodeRef.current.position.y = 1.4 + Math.sin(t * 0.8) * 0.1;
    }

    // Gentle orbital motion for sibling branches
    if (node1Ref.current) {
      node1Ref.current.rotation.x += delta * 0.25;
      node1Ref.current.rotation.y += delta * 0.3;
      node1Ref.current.position.y = -1.0 + Math.sin(t * 0.7 + 0.5) * 0.12;
    }
    if (node2Ref.current) {
      node2Ref.current.rotation.x += delta * 0.2;
      node2Ref.current.rotation.z += delta * 0.25;
      node2Ref.current.position.y = -1.4 + Math.cos(t * 0.6 + 1.0) * 0.12;
    }
    if (node3Ref.current) {
      node3Ref.current.rotation.y += delta * 0.22;
      node3Ref.current.position.y = 0.2 + Math.sin(t * 0.9 + 1.5) * 0.1;
    }
    if (node4Ref.current) {
      node4Ref.current.rotation.z += delta * 0.28;
      node4Ref.current.position.y = 0.4 + Math.cos(t * 0.8 + 2.0) * 0.1;
    }
  });

  return (
    <>
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0c1d33"}
        intensity={isLightMode ? 1.8 : 0.8}
      />
      <directionalLight
        position={[8, 12, 6]}
        color={isLightMode ? "#fffbeb" : "#38bdf8"}
        intensity={isLightMode ? 2.2 : 1.8}
      />
      <pointLight
        position={[-6, 0, 4]}
        color="#10b981"
        intensity={isLightMode ? 1.8 : 2.6}
        distance={20}
      />
      <pointLight
        position={[6, -2, -2]}
        color="#f59e0b"
        intensity={isLightMode ? 1.4 : 2.2}
        distance={20}
      />

      <group ref={groupRef} position={[-2.4, 0, -0.5]}>
        <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
          {/* Root Merkle Hash Commitment (Top Node) */}
          <mesh ref={rootNodeRef} position={[0, 1.4, 0]} material={rootMaterial} scale={[0.7, 0.7, 0.7]}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>

          {/* Sibling 1 (PhilSys ID Leaf - Lower Left) */}
          <mesh ref={node1Ref} position={[-1.6, -1.0, 0.3]} material={nodeMaterial} scale={[0.55, 0.55, 0.55]}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>

          {/* Sibling 2 (Secret PIN witness - Lower Right) */}
          <mesh ref={node2Ref} position={[1.4, -1.4, -0.2]} material={nodeMaterial} scale={[0.5, 0.5, 0.5]}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>

          {/* Sibling 3 (Registry Branch - Mid Left) */}
          <mesh ref={node3Ref} position={[-1.0, 0.2, -0.4]} material={nodeMaterial} scale={[0.52, 0.52, 0.52]}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>

          {/* Sibling 4 (Contract Salt - Mid Right) */}
          <mesh ref={node4Ref} position={[1.1, 0.4, 0.4]} material={nodeMaterial} scale={[0.48, 0.48, 0.48]}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>

          {/* Holographic Laser Splines */}
          <mesh ref={link1Ref} position={[-0.5, 0.8, -0.2]} rotation={[0, 0, 0.6]} material={splineMaterial}>
            <cylinderGeometry args={[0.018, 0.018, 1.6, 8]} />
          </mesh>
          <mesh ref={link2Ref} position={[0.55, 0.9, 0.2]} rotation={[0, 0, -0.5]} material={splineMaterial}>
            <cylinderGeometry args={[0.018, 0.018, 1.5, 8]} />
          </mesh>
          <mesh ref={link3Ref} position={[-1.3, -0.4, 0]} rotation={[0, 0, 0.4]} material={splineMaterial}>
            <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
          </mesh>
          <mesh ref={link4Ref} position={[1.25, -0.5, 0.1]} rotation={[0, 0, -0.3]} material={splineMaterial}>
            <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
          </mesh>
        </Float>
      </group>
    </>
  );
};

export const BentoScene: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <SceneContainer
      className={`absolute inset-0 w-full h-full pointer-events-none -z-0 overflow-hidden ${className}`}
      cameraPosition={[-0.8, 0, 6.4]}
      cameraFov={45}
    >
      {({ isLightMode }) => <BentoSceneContent isLightMode={isLightMode} />}
    </SceneContainer>
  );
};

export default BentoScene;
