// ==============================================================================
// GhostFree — AntiGravityCanvas (Full-Screen Ambient 3D Backdrop)
// Fixed viewport, non-blocking pointer events, dual-theme sync
// ==============================================================================

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingGeometryScene from "./FloatingGeometryScene";

interface AntiGravityCanvasProps {
  className?: string;
}

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({
  className = "",
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
      className={`fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <FloatingGeometryScene isLightMode={isLightMode} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AntiGravityCanvas;
