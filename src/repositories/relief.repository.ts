// ============================================
// GhostFree — Relief Operation Repository
// Firestore CRUD for relief operations
// ============================================

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import type { ReliefOperation } from "../types";

const COLLECTION = "relief_operations";

/**
 * Create a new relief operation record in Firestore.
 */
export async function createReliefOperation(
  data: Omit<ReliefOperation, "id" | "claimedCount" | "createdAt">
): Promise<string> {
  const docRef = doc(collection(db, COLLECTION));
  const operation: ReliefOperation = {
    ...data,
    id: docRef.id,
    claimedCount: 0,
    createdAt: new Date().toISOString(),
  };

  await setDoc(docRef, {
    ...operation,
    _createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Get a relief operation by ID.
 */
export async function getReliefOperation(
  id: string
): Promise<ReliefOperation | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return docSnap.data() as ReliefOperation;
}

/**
 * Get all active relief operations.
 */
export async function getActiveOperations(): Promise<ReliefOperation[]> {
  const q = query(
    collection(db, COLLECTION),
    where("status", "in", ["active", "deploying"]),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as ReliefOperation);
}

/**
 * Get all relief operations for an admin.
 */
export async function getAdminOperations(
  adminUid: string
): Promise<ReliefOperation[]> {
  const q = query(
    collection(db, COLLECTION),
    where("adminUid", "==", adminUid),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as ReliefOperation);
}

/**
 * Update the status of a relief operation.
 */
export async function updateOperationStatus(
  id: string,
  status: ReliefOperation["status"],
  extra?: Partial<ReliefOperation>
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    status,
    ...extra,
    _updatedAt: serverTimestamp(),
  });
}

/**
 * Increment the claimed count for a relief operation.
 */
export async function incrementClaimedCount(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const current = snap.data() as ReliefOperation;
    await updateDoc(docRef, {
      claimedCount: current.claimedCount + 1,
      _updatedAt: serverTimestamp(),
    });
  }
}
