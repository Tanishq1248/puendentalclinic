/**
 * Firebase initialization for DentalPro.
 * Exports the Firestore `db` instance for use across the app.
 *
 * Configuration is read from NEXT_PUBLIC_FIREBASE_* environment variables.
 * Copy .env.local.template to .env.local and fill in your project values.
 */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDIu8m6lEgmkedP2F2e1Huo85agDHv8sE",
  authDomain: "dentalclinic3-dd4b6.firebaseapp.com",
  projectId: "dentalclinic3-dd4b6",
  storageBucket: "dentalclinic3-dd4b6.firebasestorage.app",
  messagingSenderId: "31997999834",
  appId: "1:31997999834:web:cf89820fe029ca101143e3",
  measurementId: "G-1920TVJZ38"
};

// Prevent re-initializing if module is hot-reloaded in development
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
