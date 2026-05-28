/**
 * Firestore service helpers for the `/patients` collection.
 *
 * Collections:
 *   /patients/{patientId}
 *   /patients/{patientId}/history/{entryId}
 *   /patients/{patientId}/sessions/{sessionId}
 */
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MedicalAlert {
  text: string;
  type: "error" | "primary";
}

export interface Reminders {
  sms: boolean;
  email: boolean;
  whatsapp: boolean;
}

export interface Patient {
  id: string;
  name: string;
  avatarUrl: string;
  detailAvatarUrl: string;
  lastVisit: string;
  status: "HIGH RISK" | "ROUTINE" | "STABLE";
  since: string;
  medicalAlerts: MedicalAlert[];
  reminders: Reminders;
  phone: string;
  email: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  treatment: string;
  dentist: string;
  notes: string;
}

export interface UpcomingSession {
  id: string;
  title: string;
  date: string;
  timeAndDentist: string;
  borderColorClass: string;
}

// ─── Patients ─────────────────────────────────────────────────────────────────

/**
 * Subscribe to real-time updates for the full patients list.
 * Returns an unsubscribe function to clean up the listener.
 */
export function subscribeToPatients(
  callback: (patients: Patient[]) => void
): Unsubscribe {
  const patientsRef = collection(db, "patients");
  return onSnapshot(patientsRef, (snapshot) => {
    const patients: Patient[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Patient, "id">),
    }));
    callback(patients);
  });
}

/**
 * Update editable fields on a patient document.
 */
export async function updatePatient(
  patientId: string,
  data: Partial<Omit<Patient, "id">>
): Promise<void> {
  const patientRef = doc(db, "patients", patientId);
  await updateDoc(patientRef, data);
}

/**
 * Update reminder toggles for a patient.
 */
export async function updateReminders(
  patientId: string,
  reminders: Reminders
): Promise<void> {
  const patientRef = doc(db, "patients", patientId);
  await updateDoc(patientRef, { reminders });
}

// ─── History ──────────────────────────────────────────────────────────────────

/**
 * Subscribe to real-time updates for a patient's treatment history.
 * Ordered by date descending (newest first).
 */
export function subscribeToPatientHistory(
  patientId: string,
  callback: (history: HistoryEntry[]) => void
): Unsubscribe {
  const historyRef = collection(db, "patients", patientId, "history");
  const q = query(historyRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const history: HistoryEntry[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<HistoryEntry, "id">),
    }));
    callback(history);
  });
}

/**
 * Add a new treatment history entry to a patient's sub-collection.
 */
export async function addHistoryEntry(
  patientId: string,
  entry: Omit<HistoryEntry, "id">
): Promise<void> {
  const historyRef = collection(db, "patients", patientId, "history");
  await addDoc(historyRef, {
    ...entry,
    createdAt: serverTimestamp(),
  });
  // Also update lastVisit on the patient doc
  const patientRef = doc(db, "patients", patientId);
  await updateDoc(patientRef, { lastVisit: entry.date });
}

// ─── Upcoming Sessions ────────────────────────────────────────────────────────

/**
 * Subscribe to real-time updates for a patient's upcoming sessions.
 */
export function subscribeToPatientSessions(
  patientId: string,
  callback: (sessions: UpcomingSession[]) => void
): Unsubscribe {
  const sessionsRef = collection(db, "patients", patientId, "sessions");
  return onSnapshot(sessionsRef, (snapshot) => {
    const sessions: UpcomingSession[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<UpcomingSession, "id">),
    }));
    callback(sessions);
  });
}

/**
 * Add a patient to Firestore (used by the seed script).
 */
export async function addPatient(
  patient: Omit<Patient, "id">
): Promise<string> {
  const patientsRef = collection(db, "patients");
  const docRef = await addDoc(patientsRef, {
    ...patient,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * One-time fetch of all patients (for non-realtime needs like seed checks).
 */
export async function fetchAllPatients(): Promise<Patient[]> {
  const snapshot = await getDocs(collection(db, "patients"));
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Patient, "id">),
  }));
}
