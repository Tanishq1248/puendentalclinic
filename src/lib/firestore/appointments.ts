/**
 * Firestore service helpers for the `/appointments` collection.
 */
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  getDocs,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  treatment: string;
  status: "Upcoming" | "In Progress" | "Completed" | "Canceled";
  dentist: string;
  avatarUrl?: string;
  initials?: string;
  date: string;
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

/**
 * Subscribe to real-time updates for all appointments.
 * Returns an unsubscribe function to clean up the listener.
 */
export function subscribeToAppointments(
  callback: (appointments: Appointment[]) => void
): Unsubscribe {
  const appointmentsRef = collection(db, "appointments");
  return onSnapshot(appointmentsRef, (snapshot) => {
    const appointments: Appointment[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Appointment, "id">),
    }));
    callback(appointments);
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Update the status of an appointment.
 */
export async function updateAppointmentStatus(
  appointmentId: string,
  status: Appointment["status"]
): Promise<void> {
  const appointmentRef = doc(db, "appointments", appointmentId);
  await updateDoc(appointmentRef, { status });
}

/**
 * Add a new appointment to Firestore (used by the seed script).
 */
export async function addAppointment(
  appointment: Omit<Appointment, "id">
): Promise<string> {
  const ref = collection(db, "appointments");
  const docRef = await addDoc(ref, {
    ...appointment,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * One-time fetch (for seed checks).
 */
export async function fetchAllAppointments(): Promise<Appointment[]> {
  const snapshot = await getDocs(collection(db, "appointments"));
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Appointment, "id">),
  }));
}
