/**
 * Firestore service helpers for the `/bookingRequests` collection.
 * Used by the public-facing booking form at /book.
 */
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BookingRequest {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  service: string;
  message: string;
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Submit a new booking request from the public /book page.
 * Documents are created with status "pending" and a server timestamp.
 */
export async function createBookingRequest(
  data: BookingRequest
): Promise<string> {
  const ref = collection(db, "bookingRequests");
  const docRef = await addDoc(ref, {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
