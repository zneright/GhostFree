// ==============================================================================
// GHOSTFREE — FIREBASE CONFIGURATION & INITIALIZATION
// Connected Project: kapitbahay-33c2b
// ==============================================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAL_0xP974v8MSV0sQbpVV82dlbwMTyB50",
  authDomain: "kapitbahay-33c2b.firebaseapp.com",
  projectId: "kapitbahay-33c2b",
  storageBucket: "kapitbahay-33c2b.firebasestorage.app",
  messagingSenderId: "439494188848",
  appId: "1:439494188848:web:2a20f7a05b6f58b0e5f2f5",
  measurementId: "G-TLDT6JPYBD",
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
