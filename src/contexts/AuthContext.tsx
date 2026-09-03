// ============================================
// GhostFree — AuthContext
// Minimal LGU Admin authentication state management
// ============================================

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { authService } from "../services/auth.service";
import type { AdminProfile } from "../types";

interface AuthContextType {
  user: User | null;
  profile: AdminProfile | null;
  loading: boolean;
  authError: string | null;
  isLGUAdmin: boolean;
  signIn: (email: string, password: string) => Promise<AdminProfile>;
  signUp: (params: {
    email: string;
    password: string;
    name: string;
    municipality?: string;
    province?: string;
  }) => Promise<AdminProfile>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Firebase auth state listener
  useEffect(() => {

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            const profileDoc = await getDoc(doc(db, "admin_profiles", firebaseUser.uid));
            if (profileDoc.exists()) {
              setProfile({
                ...(profileDoc.data() as AdminProfile),
                uid: firebaseUser.uid,
                email: firebaseUser.email || "",
              });
            } else {
              setProfile(null);
            }
          } catch (err) {
            console.error("[AuthContext] Failed to load admin profile:", err);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }

        setLoading(false);
      }, (error) => {
        console.warn("[AuthContext] onAuthStateChanged error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("[AuthContext] Firebase auth listener could not be registered:", e);
      setLoading(false);
    }
  }, []);


  const signIn = async (email: string, password: string): Promise<AdminProfile> => {
    setAuthError(null);
    try {
      const adminProfile = await authService.signIn(email, password);
      setProfile(adminProfile);
      return adminProfile;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      setAuthError(message);
      throw err;
    }
  };

  const signUp = async (params: {
    email: string;
    password: string;
    name: string;
    municipality?: string;
    province?: string;
  }): Promise<AdminProfile> => {
    setAuthError(null);
    try {
      const adminProfile = await authService.signUp(params);
      setProfile(adminProfile);
      return adminProfile;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Account creation failed. Please try again.";
      setAuthError(message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
      setAuthError(null);
    } catch (err) {
      console.error("[AuthContext] Sign out failed:", err);
    }
  };

  const clearAuthError = () => setAuthError(null);

  const isLGUAdmin = !!(
    profile &&
    (profile.role === "lgu_admin" || profile.role === "system_admin") &&
    profile.status === "active"
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        authError,
        isLGUAdmin,
        signIn,
        signUp,
        signOut,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
