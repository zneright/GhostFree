// ==============================================================================
// GhostFree — WorkflowScene Component (Section 05: How It Works Timeline)
// Meaningful 3D Storytelling: The 4-Stage Progressive Proof & Payout Pipeline
// 4 illuminated milestone stations connected along an undulating zero-gravity pipeline:
//   1. Input Witness -> 2. WASM Circuit -> 3. Nullifier Check -> 4. ₱5,000 Transfer
// ==============================================================================

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneContainer from "./shared/SceneContainer";

interface WorkflowSceneContentProps {
  isLightMode: boolean;
}

const WorkflowSceneContent: React.FC<WorkflowSceneContentProps> = ({ isLightMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const stationsRef = useRef<THREE.Group>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);

  // Station materials
  const activeStationMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.2 : 0.15,
      metalness: isLightMode ? 0.7 : 0.85,
      color: new THREE.Color(isLightMode ? "#0284c7" : "#38bdf8"),
      emissive: new THREE.Color(isLightMode ? "#38bdf8" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.35 : 0.6,
    });
  }, [isLightMode]);

  const goldStationMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.22 : 0.18,
      metalness: isLightMode ? 0.75 : 0.85,
      color: new THREE.Color(isLightMode ? "#f59e0b" : "#f59e0b"),
      emissive: new THREE.Color(isLightMode ? "#fbbf24" : "#d97706"),
      emissiveIntensity: isLightMode ? 0.4 : 0.65,
    });
  }, [isLightMode]);

  const emeraldStationMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.2 : 0.15,
      metalness: isLightMode ? 0.7 : 0.8,
      color: new THREE.Color(isLightMode ? "#10b981" : "#10b981"),
      emissive: new THREE.Color(isLightMode ? "#34d399" : "#059669"),
      emissiveIntensity: isLightMode ? 0.35 : 0.6,
    });
  }, [isLightMode]);

  // Fluid connecting pipeline ribbon
  const pipelineRibbonMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.25 : 0.18,
      metalness: isLightMode ? 0.2 : 0.35,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: isLightMode ? 0.65 : 0.75,
      color: new THREE.Color(isLightMode ? "#94a3b8" : "#0d9488"),
      emissive: new THREE.Color(isLightMode ? "#38bdf8" : "#065f46"),
      emissiveIntensity: isLightMode ? 0.2 : 0.4,
    });
  }, [isLightMode]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }

    if (ribbonRef.current) {
      ribbonRef.current.rotation.x += delta * 0.08;
      ribbonRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight
        color={isLightMode ? "#ffffff" : "#0b1a2d"}
        intensity={isLightMode ? 1.9 : 0.85}
      />
      <directionalLight
        position={[6, 10, 8]}
        color={isLightMode ? "#fffbeb" : "#7dd3fc"}
        intensity={isLightMode ? 2.2 : 1.8}
      />
      <pointLight
        position={[-6, 0, 4]}
        color="#38bdf8"
        intensity={isLightMode ? 1.8 : 2.5}
        distance={22}
      />
      <pointLight
        position={[6, 0, -2]}
        color="#10b981"
        intensity={isLightMode ? 1.6 : 2.4}
        distance={22}
      />

      <group ref={groupRef} position={[0, -0.4, -1.0]}>
        {/* Central Fluid Pipeline Ribbon connecting the 4 milestones */}
        <mesh
          ref={ribbonRef}
          position={[0, 0, -0.5]}
          scale={[1.1, 1.1, 1.1]}
          material={pipelineRibbonMaterial}
        >
          <torusKnotGeometry args={[1.6, 0.22, 128, 32, 2, 3]} />
        </mesh>

        {/* 4 Sequential Stations */}
        <group ref={stationsRef}>
          {/* Station 1: Input Witness (Left) */}
          <group position={[-3.6, 0.4, 0]}>
            <mesh material={activeStationMaterial} scale={[0.5, 0.5, 0.5]}>
              <octahedronGeometry args={[1, 0]} />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]} material={activeStationMaterial}>
              <torusGeometry args={[0.75, 0.03, 16, 32]} />
            </mesh>
          </group>

          {/* Station 2: WASM Prover (Center-Left) */}
          <group position={[-1.2, -0.4, 0.4]}>
            <mesh material={goldStationMaterial} scale={[0.55, 0.55, 0.55]}>
              <icosahedronGeometry args={[1, 0]} />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]} material={goldStationMaterial}>
              <torusGeometry args={[0.85, 0.03, 16, 32]} />
            </mesh>
          </group>

          {/* Station 3: Anti-Ghost Nullifier (Center-Right) */}
          <group position={[1.2, 0.5, 0.2]}>
            <mesh material={goldStationMaterial} scale={[0.55, 0.55, 0.55]}>
              <icosahedronGeometry args={[1, 0]} />
            </mesh>
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} material={goldStationMaterial}>
              <torusGeometry args={[0.85, 0.035, 16, 32]} />
            </mesh>
          </group>

          {/* Station 4: ₱5,000 Cash Aid Settlement (Right) */}
          <group position={[3.6, -0.3, 0]}>
            <mesh material={emeraldStationMaterial} scale={[0.6, 0.6, 0.6]}>
              <octahedronGeometry args={[1, 0]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={emeraldStationMaterial}>
              <torusGeometry args={[0.9, 0.04, 16, 32]} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
};

export const WorkflowScene: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <SceneContainer
      className={`absolute inset-0 w-full h-full pointer-events-none -z-0 overflow-hidden ${className}`}
      cameraPosition={[0, 0, 6.8]}
      cameraFov={45}
    >
      {({ isLightMode }) => <WorkflowSceneContent isLightMode={isLightMode} />}
    </SceneContainer>
  );
};

export default WorkflowScene;
