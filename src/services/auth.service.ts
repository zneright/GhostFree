// ============================================
// GhostFree — Auth Service
// Admin-only authentication and account management
// ============================================


import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { AdminProfile } from "../types";

export const authService = {
  /**
   * Create a new LGU Administrator account.
   * Creates the Firebase Auth credential and provisions the admin profile in Firestore.
   */
  async signUp(params: {
    email: string;
    password: string;
    name: string;
    municipality?: string;
    province?: string;
  }): Promise<AdminProfile> {
    const { email, password, name, municipality, province } = params;

    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (firebaseErr: unknown) {
      const err = firebaseErr as { code?: string; message?: string };
      if (err.code === "auth/email-already-in-use") {
        throw new Error("This email is already registered in kapitbahay-33c2b. Please switch to the 'Sign In' tab.");
      }
      if (err.code === "auth/operation-not-allowed") {
        throw new Error("Email/Password sign-in is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.");
      }
      if (err.code === "auth/weak-password") {
        throw new Error("Password must be at least 6 characters.");
      }
      if (err.code === "auth/invalid-email") {
        throw new Error("Please enter a valid email address.");
      }
      if (err.code === "auth/network-request-failed") {
        throw new Error("Network connection failed. Please check your internet connection and try again.");
      }
      throw new Error(err.message || "Failed to create administrator account. Please check your details.");
    }

    const newProfile: AdminProfile = {
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      name: name.trim(),
      role: "lgu_admin",
      status: "active",
      municipality: municipality?.trim() || "Unassigned Municipality",
      province: province?.trim() || "Unassigned Province",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    // Save profile to admin_profiles collection (with graceful fallback if Firestore rules block write)
    try {
      await setDoc(doc(db, "admin_profiles", userCredential.user.uid), newProfile);
    } catch (firestoreErr) {
      console.warn("[AuthService] Warning: Could not write to admin_profiles in Firestore:", firestoreErr);
      // Still return the profile so the session works even if Firestore permissions are currently restrictive
    }

    return newProfile;
  },


  /**
   * Sign in an LGU admin with email and password.
   * Validates that the user has an admin profile in Firestore.
   * Auto-provisions admin profile if user exists in Firebase Auth for seamless dev/testing.
   */
  async signIn(email: string, password: string): Promise<AdminProfile> {
    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (firebaseErr: unknown) {
      const err = firebaseErr as { code?: string; message?: string };
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        throw new Error("Invalid email or password. Please check your credentials and try again.");
      }
      if (err.code === "auth/invalid-email") {
        throw new Error("Please enter a valid email address.");
      }
      if (err.code === "auth/user-disabled") {
        throw new Error("This account has been disabled. Contact system administration.");
      }
      if (err.code === "auth/too-many-requests") {
        throw new Error(
          "Access temporarily disabled due to multiple failed login attempts. Please try again later."
        );
      }
      throw firebaseErr;
    }

    // Load admin profile from Firestore
    const profileDoc = await getDoc(doc(db, "admin_profiles", userCredential.user.uid));

    if (!profileDoc.exists()) {
      // Auto-provision basic admin profile if registered via Firebase Auth
      const autoProfile: AdminProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        name: email.split("@")[0].toUpperCase(),
        role: "lgu_admin",
        status: "active",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "admin_profiles", userCredential.user.uid), autoProfile);
      return autoProfile;
    }

    const profile = profileDoc.data() as AdminProfile;

    if (profile.status === "suspended") {
      await firebaseSignOut(auth);
      throw new Error("Your administrator account has been suspended.");
    }

    return {
      ...profile,
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      lastLoginAt: new Date().toISOString(),
    };
  },

  /**
   * Sign out the current admin user.
   */
  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },
};

