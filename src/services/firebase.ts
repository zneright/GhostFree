// ==============================================================================
// GHOSTFREE — FIREBASE CONFIGURATION & INITIALIZATION
// Connected Project: kapitbahay-33c2b
// ==============================================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// Loaded securely from environment variables with fallback
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAL_0xP974v8MSV0sQbpVV82dlbwMTyB50",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kapitbahay-33c2b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kapitbahay-33c2b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kapitbahay-33c2b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "439494188848",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:439494188848:web:2a20f7a05b6f58b0e5f2f5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TLDT6JPYBD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics safely for browser environments
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional in restricted or testing environments
  });
}

export default app;
