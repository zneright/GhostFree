// ============================================
// GhostFree — ProtectedRoute
// Role-based route guard for LGU Admin portal
// ============================================


import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-civic-navy">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-civic-sky/30 border-t-civic-sky rounded-full animate-spin" />
          <p className="text-shield-muted text-sm font-medium tracking-wide">
            Verifying credentials...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated — redirect to admin login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // No admin profile found
  if (!profile) {
    return <Navigate to="/admin/login" replace />;
  }

  // Role restriction check
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(profile.role)) {
      return <Navigate to="/admin/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
