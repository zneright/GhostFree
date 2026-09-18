// ==============================================================================
// GhostFree — AntiGravityCanvas (Full-Screen Ambient 3D Backdrop)
// Fixed viewport, non-blocking pointer events, dual-theme sync, scroll tracking
// ==============================================================================

import React, { useState, useEffect, useRef, Suspense } from "react";
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

  // Smooth scroll progress ref (0 to 1) for 60fps useFrame camera interpolation
  const scrollProgressRef = useRef<number>(0);

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

  // Track window scroll progress without triggering React re-renders
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgressRef.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
          <FloatingGeometryScene
            isLightMode={isLightMode}
            scrollProgressRef={scrollProgressRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AntiGravityCanvas;
