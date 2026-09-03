// ============================================
// GhostFree — App Routes
// 3-route architecture: Landing, Admin, Claim
// ============================================

import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Lazy load views for code splitting
const LandingPage = lazy(() => import("../views/LandingPage"));
const AdminLoginPage = lazy(() => import("../views/admin/AdminLoginPage"));
const AdminDashboard = lazy(() => import("../views/admin/AdminDashboard"));
const CitizenClaimPortal = lazy(() => import("../views/claim/CitizenClaimPortal"));
const Level2DemoPage = lazy(() => import("../views/Level2DemoPage"));

const PageLoader: React.FC = () => (
  <div className="min-h-dvh flex items-center justify-center bg-civic-navy">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-civic-sky/30 border-t-civic-sky rounded-full animate-spin" />
      <p className="text-shield-muted text-sm font-medium tracking-wide">
        Loading GhostFree...
      </p>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. PUBLIC LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. LEVEL 2 INTERACTIVE CIRCUIT DEMO */}
        <Route path="/demo" element={<Level2DemoPage />} />
        <Route path="/level2" element={<Level2DemoPage />} />

        {/* 3. LGU ADMIN PORTAL (Web2 Fortress) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["lgu_admin", "system_admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 4. CITIZEN CLAIM PORTAL (Web3 Public — NO Auth) */}
        <Route path="/claim" element={<CitizenClaimPortal />} />

        {/* 4. CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
