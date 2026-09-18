// ==============================================================================
// GhostFree — SceneContainer Component
// Reusable, lightweight, section-isolated WebGL Canvas container
// Handles WebGL capability, dual-theme sync, DPR scaling, and non-blocking interaction
// ==============================================================================

import React, { useState, useEffect, Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface SceneContainerProps {
  children: (props: { isLightMode: boolean }) => ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  children,
  className = "absolute inset-0 w-full h-full pointer-events-none -z-0 overflow-hidden",
  cameraPosition = [0, 0, 7.5],
  cameraFov = 45,
}) => {
  // Synchronized theme detection
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof document === "undefined") return false;
    return (
      document.documentElement.classList.contains("light-mode") ||
      document.documentElement.classList.contains("sunlight-mode") ||
      document.body.classList.contains("light-mode") ||
      document.body.classList.contains("sunlight-mode")
    );
  });

  // Check WebGL availability
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsLightMode(
        document.documentElement.classList.contains("light-mode") ||
        document.documentElement.classList.contains("sunlight-mode") ||
        document.body.classList.contains("light-mode") ||
        document.body.classList.contains("sunlight-mode")
      );
    };

    window.addEventListener("ghostfree_theme_change", handleThemeChange);
    return () => window.removeEventListener("ghostfree_theme_change", handleThemeChange);
  }, []);

  if (!hasWebGL) {
    return null;
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          {children({ isLightMode })}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneContainer;
