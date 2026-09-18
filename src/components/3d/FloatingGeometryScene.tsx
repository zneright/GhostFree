// ==============================================================================
// GhostFree — FloatingGeometryScene Component
// System-Connected Scroll-Driven 3D Architecture (React Three Fiber)
// Visualizing the Cryptographic Merkle-Nullifier Vault across 4 Scroll Phases:
//   Phase 1: Private Witness Ingestion (Shielded Crystal Core + Orbiting Gyro Ring)
//   Phase 2: Local WASM Prover (Deconstructing into Merkle Inclusion Tree & Splines)
//   Phase 3: Escrow Telemetry & Gasless tDUST Flow (Cylindrical Orbital Ring + Fluid Ribbon)
//   Phase 4: Cryptographic Finality (Solidified Sealed Nullifier Nexus)
// ==============================================================================

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGeometrySceneProps {
  isLightMode: boolean;
  scrollProgressRef: React.RefObject<number>;
}

export const FloatingGeometryScene: React.FC<FloatingGeometrySceneProps> = ({
  isLightMode,
  scrollProgressRef,
}) => {
  const { scene, camera } = useThree();

  // Mesh & Group references
  const mainGroupRef = useRef<THREE.Group>(null);
  const witnessCoreRef = useRef<THREE.Mesh>(null);
  const gyroRingRef = useRef<THREE.Mesh>(null);
  const fluidRibbonRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Merkle Tree Nodes references (4 sibling hash crystals)
  const node1Ref = useRef<THREE.Mesh>(null);
  const node2Ref = useRef<THREE.Mesh>(null);
  const node3Ref = useRef<THREE.Mesh>(null);
  const node4Ref = useRef<THREE.Mesh>(null);

  // Laser Spline Links references
  const link1Ref = useRef<THREE.Mesh>(null);
  const link2Ref = useRef<THREE.Mesh>(null);
  const link3Ref = useRef<THREE.Mesh>(null);

  // Smooth scroll tracking state
  const currentScroll = useRef<number>(0);

  // Mouse tracking state for subtle viewport parallax
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Camera lookAt vector
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Accessibility check for reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Subtle atmospheric fog synced to active theme
  useEffect(() => {
    const fogColor = isLightMode ? "#F8FAFC" : "#0A1628";
    const fogDensity = isLightMode ? 0.015 : 0.018;
    scene.fog = new THREE.FogExp2(fogColor, fogDensity);
    return () => {
      scene.fog = null;
    };
  }, [scene, isLightMode]);

  // Pointer move handler for subtle parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Generate 80 ambient depth particles (representing gasless tDUST disbursement)
  const particlePositions = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = 2 - Math.random() * 9;
    }
    return positions;
  }, []);

  // ============================================================================
  // DUAL-THEME PHYSICAL MATERIALS
  // ============================================================================

  // 1. Private Witness Core Material (Translucent Sapphire / Pearlescent Opal)
  const witnessCoreMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.16 : 0.12,
      metalness: isLightMode ? 0.08 : 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      transparent: true,
      opacity: isLightMode ? 0.85 : 0.9,
      color: new THREE.Color(isLightMode ? "#ffffff" : "#132a4a"),
      emissive: new THREE.Color(isLightMode ? "#fef3c7" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.25 : 0.45,
    });
  }, [isLightMode]);

  // 2. Anti-Ghost Nullifier Gyroscope Ring (Metallic Gold / Amber)
  const gyroRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.25 : 0.18,
      metalness: isLightMode ? 0.75 : 0.85,
      color: new THREE.Color(isLightMode ? "#f59e0b" : "#f59e0b"),
      emissive: new THREE.Color(isLightMode ? "#fbbf24" : "#d97706"),
      emissiveIntensity: isLightMode ? 0.35 : 0.6,
    });
  }, [isLightMode]);

  // 3. Merkle Sibling Hash Nodes Material (Electric Sky Cyan / Emerald)
  const merkleNodeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: isLightMode ? 0.2 : 0.14,
      metalness: isLightMode ? 0.65 : 0.75,
      color: new THREE.Color(isLightMode ? "#0ea5e9" : "#38bdf8"),
      emissive: new THREE.Color(isLightMode ? "#38bdf8" : "#0284c7"),
      emissiveIntensity: isLightMode ? 0.3 : 0.55,
    });
  }, [isLightMode]);

  // 4. Laser Spline Link Material (Glowing Holographic Data Lines)
  const splineMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(isLightMode ? "#0284c7" : "#38bdf8"),
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.65,
    });
  }, [isLightMode]);

  // 5. Fluid Möbius Ribbon Material (Emerald / Teal Aid Stream)
  const fluidRibbonMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: isLightMode ? 0.22 : 0.16,
      metalness: isLightMode ? 0.15 : 0.28,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: isLightMode ? 0.82 : 0.86,
      color: new THREE.Color(isLightMode ? "#fde68a" : "#0d9488"),
      emissive: new THREE.Color(isLightMode ? "#f59e0b" : "#047857"),
      emissiveIntensity: isLightMode ? 0.25 : 0.5,
    });
  }, [isLightMode]);

  // ============================================================================
  // FRAME ANIMATION & SCROLL CHOREOGRAPHY LOOP
  // ============================================================================
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const rawScroll = scrollProgressRef.current ?? 0;

    // Smoothly interpolate scroll progress
    currentScroll.current = THREE.MathUtils.lerp(
      currentScroll.current,
      rawScroll,
      0.06
    );
    const scroll = currentScroll.current;

    // Parallax mouse tilt
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

      if (mainGroupRef.current) {
        mainGroupRef.current.rotation.y = currentMouse.current.x * 0.15;
        mainGroupRef.current.rotation.x = -currentMouse.current.y * 0.1;
      }
    }

    // --------------------------------------------------------------------------
    // 1. Camera Trajectory Interpolation Across 4 Phases
    // --------------------------------------------------------------------------
    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 7.5;
    let lookAtX = 0;
    let lookAtY = 0;
    let lookAtZ = 0;

    if (scroll < 0.25) {
      // Phase 1: Hero — Centered overview of Private Witness Core
      const p = scroll / 0.25;
      targetCamX = THREE.MathUtils.lerp(0, -0.4, p);
      targetCamY = THREE.MathUtils.lerp(0, 0.1, p);
      targetCamZ = 7.5;
      lookAtX = 0;
      lookAtY = 0;
    } else if (scroll < 0.55) {
      // Phase 2: Features / Bento — Glides to left flank to reveal Merkle Tree
      const p = (scroll - 0.25) / 0.3;
      targetCamX = THREE.MathUtils.lerp(-0.4, -2.0, p);
      targetCamY = THREE.MathUtils.lerp(0.1, 0.4, p);
      targetCamZ = THREE.MathUtils.lerp(7.5, 6.2, p);
      lookAtX = THREE.MathUtils.lerp(0, -1.8, p);
      lookAtY = THREE.MathUtils.lerp(0, 0.2, p);
    } else if (scroll < 0.8) {
      // Phase 3: Relief Basket & Telemetry — Glides across to right flank
      const p = (scroll - 0.55) / 0.25;
      targetCamX = THREE.MathUtils.lerp(-2.0, 2.0, p);
      targetCamY = THREE.MathUtils.lerp(0.4, -0.5, p);
      targetCamZ = THREE.MathUtils.lerp(6.2, 5.8, p);
      lookAtX = THREE.MathUtils.lerp(-1.8, 1.8, p);
      lookAtY = THREE.MathUtils.lerp(0.2, -0.3, p);
    } else {
      // Phase 4: CTA / Audit — Centered and sealed
      const p = (scroll - 0.8) / 0.2;
      targetCamX = THREE.MathUtils.lerp(2.0, 0, p);
      targetCamY = THREE.MathUtils.lerp(-0.5, -0.2, p);
      targetCamZ = THREE.MathUtils.lerp(5.8, 7.6, p);
      lookAtX = THREE.MathUtils.lerp(1.8, 0, p);
      lookAtY = THREE.MathUtils.lerp(-0.3, 0, p);
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.06);

    targetLookAt.current.set(lookAtX, lookAtY, lookAtZ);
    currentLookAt.current.lerp(targetLookAt.current, 0.06);
    camera.lookAt(currentLookAt.current);

    // --------------------------------------------------------------------------
    // 2. Private Witness Core Dynamics
    // --------------------------------------------------------------------------
    if (witnessCoreRef.current) {
      let coreTargetX = 0;
      let coreTargetY = Math.sin(t * 0.8) * 0.18;
      let coreTargetZ = 0;
      let coreScale = 1.35;

      if (scroll < 0.25) {
        coreTargetX = 0;
        coreScale = 1.35;
      } else if (scroll < 0.55) {
        // Anchoring root of Merkle tree on the left
        const p = (scroll - 0.25) / 0.3;
        coreTargetX = THREE.MathUtils.lerp(0, -2.0, p);
        coreTargetY += THREE.MathUtils.lerp(0, 0.6, p);
        coreScale = THREE.MathUtils.lerp(1.35, 1.1, p);
      } else if (scroll < 0.8) {
        // Shifts into right telemetry cylinder
        const p = (scroll - 0.55) / 0.25;
        coreTargetX = THREE.MathUtils.lerp(-2.0, 2.2, p);
        coreTargetY += THREE.MathUtils.lerp(0.6, 0.3, p);
        coreScale = THREE.MathUtils.lerp(1.1, 1.2, p);
      } else {
        // Reconverges to center seal
        const p = (scroll - 0.8) / 0.2;
        coreTargetX = THREE.MathUtils.lerp(2.2, 0, p);
        coreScale = THREE.MathUtils.lerp(1.2, 1.45, p);
      }

      witnessCoreRef.current.position.x = THREE.MathUtils.lerp(
        witnessCoreRef.current.position.x,
        coreTargetX,
        0.08
      );
      witnessCoreRef.current.position.y = coreTargetY;
      witnessCoreRef.current.position.z = coreTargetZ;

      witnessCoreRef.current.scale.setScalar(
        THREE.MathUtils.lerp(witnessCoreRef.current.scale.x, coreScale, 0.08)
      );

      witnessCoreRef.current.rotation.x += delta * 0.14;
      witnessCoreRef.current.rotation.y += delta * 0.18;
    }

    // --------------------------------------------------------------------------
    // 3. Anti-Ghost Nullifier Gyroscope Ring Dynamics
    // --------------------------------------------------------------------------
    if (gyroRingRef.current && witnessCoreRef.current) {
      gyroRingRef.current.position.copy(witnessCoreRef.current.position);

      if (scroll > 0.8) {
        // Locks down firmly around core at finality
        gyroRingRef.current.rotation.x += delta * 0.05;
        gyroRingRef.current.rotation.z = Math.PI / 4;
      } else {
        gyroRingRef.current.rotation.x += delta * 0.22;
        gyroRingRef.current.rotation.z += delta * 0.16;
      }
    }

    // --------------------------------------------------------------------------
    // 4. Merkle Tree Sibling Nodes & Splines Metamorphosis
    // --------------------------------------------------------------------------
    // In Phase 1: Cluster near core
    // In Phase 2: Branch into bottom-up Merkle proof lattice
    // In Phase 3: Align into orbital cylinder base
    // In Phase 4: Snap into lock ring
    const nodes = [node1Ref, node2Ref, node3Ref, node4Ref];
    const baseCoreX = witnessCoreRef.current?.position.x ?? 0;
    const baseCoreY = witnessCoreRef.current?.position.y ?? 0;

    // Target positions for Merkle branches in Phase 2
    const merkleOffsets = [
      { x: -1.6, y: -1.3, z: 0.4 }, // Node 1: Citizen PhilSys Leaf
      { x: -0.6, y: -1.7, z: -0.4 }, // Node 2: Secret PIN witness
      { x: 0.8, y: -0.8, z: 0.5 },  // Node 3: Sibling registry hash
      { x: 1.5, y: 0.7, z: -0.3 },   // Node 4: Contract salt sibling
    ];

    nodes.forEach((ref, index) => {
      if (!ref.current) return;
      const angle = (index / 4) * Math.PI * 2 + t * 0.4;
      let targetX = baseCoreX + Math.cos(angle) * 1.6;
      let targetY = baseCoreY + Math.sin(angle) * 1.6;
      let targetZ = Math.sin(angle * 2) * 0.5;

      if (scroll >= 0.25 && scroll < 0.55) {
        // Expanded Merkle tree lattice
        const p = (scroll - 0.25) / 0.3;
        targetX = THREE.MathUtils.lerp(
          targetX,
          baseCoreX + merkleOffsets[index].x,
          p
        );
        targetY = THREE.MathUtils.lerp(
          targetY,
          baseCoreY + merkleOffsets[index].y,
          p
        );
        targetZ = THREE.MathUtils.lerp(targetZ, merkleOffsets[index].z, p);
      } else if (scroll >= 0.55 && scroll < 0.8) {
        // Aligned into circular telemetry cylinder base
        const p = (scroll - 0.55) / 0.25;
        const ringAngle = (index / 4) * Math.PI * 2 + t * 0.6;
        targetX = THREE.MathUtils.lerp(
          targetX,
          baseCoreX + Math.cos(ringAngle) * 1.8,
          p
        );
        targetY = THREE.MathUtils.lerp(
          targetY,
          baseCoreY - 1.2 + Math.sin(t * 0.5) * 0.1,
          p
        );
        targetZ = THREE.MathUtils.lerp(targetZ, Math.sin(ringAngle) * 1.4, p);
      } else if (scroll >= 0.8) {
        // Sealed tightly around core
        const p = (scroll - 0.8) / 0.2;
        targetX = THREE.MathUtils.lerp(targetX, baseCoreX + Math.cos(angle) * 0.9, p);
        targetY = THREE.MathUtils.lerp(targetY, baseCoreY + Math.sin(angle) * 0.9, p);
        targetZ = THREE.MathUtils.lerp(targetZ, 0, p);
      }

      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.08);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.08);
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.08);

      ref.current.rotation.x += delta * (0.2 + index * 0.05);
      ref.current.rotation.y += delta * (0.25 + index * 0.05);
    });

    // Update laser spline links visibility and orientation during Merkle phase
    const splineOpacity = scroll >= 0.2 && scroll <= 0.6 ? 0.65 : 0.0;
    if (splineMaterial) {
      splineMaterial.opacity = THREE.MathUtils.lerp(
        splineMaterial.opacity,
        splineOpacity,
        0.08
      );
    }

    // --------------------------------------------------------------------------
    // 5. Fluid Möbius Ribbon Dynamics (tDUST Cash Aid Stream)
    // --------------------------------------------------------------------------
    if (fluidRibbonRef.current) {
      let ribbonX = -3.2;
      let ribbonY = -0.8 + Math.sin(t * 0.45) * 0.25;
      let ribbonZ = -1.5;
      let ribbonScale = 1.3;

      if (scroll >= 0.55 && scroll < 0.8) {
        // Moves into center of the escrow telemetry cylinder
        const p = (scroll - 0.55) / 0.25;
        ribbonX = THREE.MathUtils.lerp(-3.2, 2.2, p);
        ribbonY = THREE.MathUtils.lerp(-0.8, -0.6, p) + Math.sin(t * 0.6) * 0.2;
        ribbonZ = THREE.MathUtils.lerp(-1.5, -0.5, p);
        ribbonScale = THREE.MathUtils.lerp(1.3, 1.15, p);
      } else if (scroll >= 0.8) {
        // Encircles the sealed core
        const p = (scroll - 0.8) / 0.2;
        ribbonX = THREE.MathUtils.lerp(2.2, 0, p);
        ribbonY = THREE.MathUtils.lerp(-0.6, 0, p);
        ribbonScale = THREE.MathUtils.lerp(1.15, 1.6, p);
      }

      fluidRibbonRef.current.position.x = THREE.MathUtils.lerp(
        fluidRibbonRef.current.position.x,
        ribbonX,
        0.07
      );
      fluidRibbonRef.current.position.y = ribbonY;
      fluidRibbonRef.current.position.z = ribbonZ;
      fluidRibbonRef.current.scale.setScalar(
        THREE.MathUtils.lerp(fluidRibbonRef.current.scale.x, ribbonScale, 0.07)
      );

      fluidRibbonRef.current.rotation.x += delta * 0.08;
      fluidRibbonRef.current.rotation.y += delta * 0.12;
      fluidRibbonRef.current.rotation.z += delta * 0.06;
    }

    // --------------------------------------------------------------------------
    // 6. Stardust Depth Particles Drift
    // --------------------------------------------------------------------------
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
    }
  });

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
        color="#f59e0b"
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
          SYSTEM-CONNECTED 3D CONSTELLATION GROUP
         ======================================================== */}
      <group ref={mainGroupRef}>
        {/* ARTIFACT 1: Private Witness Crystal Core */}
        <mesh
          ref={witnessCoreRef}
          position={[0, 0, 0]}
          scale={[1.35, 1.35, 1.35]}
          material={witnessCoreMaterial}
        >
          <icosahedronGeometry args={[1.2, 1]} />
        </mesh>

        {/* ARTIFACT 2: Anti-Ghost Nullifier Gyroscope Ring */}
        <mesh
          ref={gyroRingRef}
          rotation={[Math.PI / 4, 0, 0]}
          material={gyroRingMaterial}
        >
          <torusGeometry args={[1.9, 0.065, 16, 64]} />
        </mesh>

        {/* ARTIFACT 3: Merkle Tree Sibling Hash Nodes (4 Nodes) */}
        <mesh ref={node1Ref} material={merkleNodeMaterial} scale={[0.55, 0.55, 0.55]}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>
        <mesh ref={node2Ref} material={merkleNodeMaterial} scale={[0.5, 0.5, 0.5]}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>
        <mesh ref={node3Ref} material={merkleNodeMaterial} scale={[0.55, 0.55, 0.55]}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>
        <mesh ref={node4Ref} material={merkleNodeMaterial} scale={[0.5, 0.5, 0.5]}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>

        {/* Laser Spline Links connecting Merkle Nodes to Core during Proof Phase */}
        <mesh ref={link1Ref} material={splineMaterial} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
        </mesh>
        <mesh ref={link2Ref} material={splineMaterial} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
        </mesh>
        <mesh ref={link3Ref} material={splineMaterial} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.0, 8]} />
        </mesh>

        {/* ARTIFACT 4: Undulating Fluid Möbius Ribbon (tDUST Aid Flow) */}
        <mesh
          ref={fluidRibbonRef}
          position={[-3.2, -0.8, -1.5]}
          scale={[1.3, 1.3, 1.3]}
          material={fluidRibbonMaterial}
        >
          <torusKnotGeometry args={[1.4, 0.38, 128, 32, 2, 3]} />
        </mesh>

        {/* ARTIFACT 5: Ambient Stardust Field (Gasless Flow) */}
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
