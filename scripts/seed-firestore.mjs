import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Seeding Firestore database...");

  // 1. Seed Patients
  const patients = [
    {
      name: "Rajeev Menon",
      phone: "+91 98450 12345",
      email: "rajeev.menon@example.com",
      status: "HIGH RISK",
      medicalAlerts: [
        { text: "Lidocaine Allergy", type: "error" },
        { text: "Hypertension", type: "error" }
      ],
      reminders: { sms: true, email: false, whatsapp: true },
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUpsKxUegdgGF6TCZbUsfQcEM3dh2XnswnioT7XFKiFLFQiZavZwwomLoUOm1RfljzIJC5qhAirf3o3eT8j2gjT_H-a53ioIs1dBOhzvhavhENIQ9llDgaYRR9Gwc8gRtktnHUhiqiniUaq9lghuewC5kXRXaHe9tbJaiVKRl3kuS7A4pHmF0xvdBFdR_9SVOyKETb899kdUxF7bUN5uzsAcPT8ygv7bJZ0bn4vxh1w3QtRr0Dlq_-glipvRoKlbtlVseGecvBYOA",
      detailAvatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUpsKxUegdgGF6TCZbUsfQcEM3dh2XnswnioT7XFKiFLFQiZavZwwomLoUOm1RfljzIJC5qhAirf3o3eT8j2gjT_H-a53ioIs1dBOhzvhavhENIQ9llDgaYRR9Gwc8gRtktnHUhiqiniUaq9lghuewC5kXRXaHe9tbJaiVKRl3kuS7A4pHmF0xvdBFdR_9SVOyKETb899kdUxF7bUN5uzsAcPT8ygv7bJZ0bn4vxh1w3QtRr0Dlq_-glipvRoKlbtlVseGecvBYOA",
      since: "Feb 2021",
      lastVisit: "Oct 24",
    },
    {
      name: "Priya Desai",
      phone: "+91 91234 56789",
      email: "priya.desai@example.com",
      status: "ROUTINE",
      medicalAlerts: [],
      reminders: { sms: false, email: true, whatsapp: false },
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbDYPRho94VF8lJ4VnYzUMFDHZi4dQZQws0HClOyV2JzevoIW5RCaDAJYyehv0Sz6dOfcQyHeKMiVQeMLNyrlzC5O_5AzM9IHpKFqNzBRg1tvtk5MgYvlI-p9_3HsO2aAHqxepvprzTKscnuwY5cfC_plfbxpbOSuSiS5NduCD7y-6ys3GY2DBXVUlUP1-ukf_lAvzal4CU-cIqvMQFh1cvzS-YFua7Vc4zi_iyGAaWkYiB2DAfg08cofTnpif0v17AUPfxibJnp8",
      detailAvatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbDYPRho94VF8lJ4VnYzUMFDHZi4dQZQws0HClOyV2JzevoIW5RCaDAJYyehv0Sz6dOfcQyHeKMiVQeMLNyrlzC5O_5AzM9IHpKFqNzBRg1tvtk5MgYvlI-p9_3HsO2aAHqxepvprzTKscnuwY5cfC_plfbxpbOSuSiS5NduCD7y-6ys3GY2DBXVUlUP1-ukf_lAvzal4CU-cIqvMQFh1cvzS-YFua7Vc4zi_iyGAaWkYiB2DAfg08cofTnpif0v17AUPfxibJnp8",
      since: "Aug 2022",
      lastVisit: "Sep 12",
    },
    {
      name: "Amit Kumar",
      phone: "+91 98989 89898",
      email: "amit.kumar@example.com",
      status: "STABLE",
      medicalAlerts: [
        { text: "Penicillin Allergy", type: "error" }
      ],
      reminders: { sms: true, email: true, whatsapp: true },
      avatarUrl: "",
      detailAvatarUrl: "",
      since: "Jan 2023",
      lastVisit: "Aug 05",
    }
  ];

  const patientIds = [];
  for (const patient of patients) {
    const docRef = await addDoc(collection(db, "patients"), {
      ...patient,
      createdAt: serverTimestamp(),
    });
    console.log(`Added patient ${patient.name} with ID: ${docRef.id}`);
    patientIds.push({ name: patient.name, id: docRef.id });

    // Seed subcollections for the patient
    // Add History
    if (patient.name === "Rajeev Menon") {
      await addDoc(collection(db, "patients", docRef.id, "history"), {
        date: "Oct 24",
        treatment: "Root Canal Therapy",
        dentist: "Dr. Sharma",
        notes: "Initiated root canal. Temporary crown placed.",
        createdAt: serverTimestamp(),
      });
      await addDoc(collection(db, "patients", docRef.id, "history"), {
        date: "Sep 15",
        treatment: "Routine Cleaning",
        dentist: "Dr. Patel",
        notes: "Scaling and polishing completed.",
        createdAt: serverTimestamp(),
      });
    }

    // Add Sessions
    if (patient.name === "Rajeev Menon") {
      await addDoc(collection(db, "patients", docRef.id, "sessions"), {
        title: "Root Canal Therapy",
        date: "Oct 28",
        timeAndDentist: "10:30 AM - Dr. Sharma",
        borderColorClass: "border-primary",
      });
      await addDoc(collection(db, "patients", docRef.id, "sessions"), {
        title: "Crown Fitment",
        date: "Nov 05",
        timeAndDentist: "02:00 PM - Dr. Sharma",
        borderColorClass: "border-secondary",
      });
    }
  }

  // 2. Seed Appointments
  const appointments = [
    {
      patientName: "Rajeev Menon",
      patientId: "#PT-8492",
      time: "10:30 AM",
      treatment: "Root Canal Therapy",
      status: "Upcoming",
      dentist: "Dr. Sharma",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUpsKxUegdgGF6TCZbUsfQcEM3dh2XnswnioT7XFKiFLFQiZavZwwomLoUOm1RfljzIJC5qhAirf3o3eT8j2gjT_H-a53ioIs1dBOhzvhavhENIQ9llDgaYRR9Gwc8gRtktnHUhiqiniUaq9lghuewC5kXRXaHe9tbJaiVKRl3kuS7A4pHmF0xvdBFdR_9SVOyKETb899kdUxF7bUN5uzsAcPT8ygv7bJZ0bn4vxh1w3QtRr0Dlq_-glipvRoKlbtlVseGecvBYOA",
      date: "2023-10-24",
    },
    {
      patientName: "Priya Desai",
      patientId: "#PT-9011",
      time: "09:45 AM",
      treatment: "Routine Cleaning",
      status: "In Progress",
      dentist: "Dr. Patel",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbDYPRho94VF8lJ4VnYzUMFDHZi4dQZQws0HClOyV2JzevoIW5RCaDAJYyehv0Sz6dOfcQyHeKMiVQeMLNyrlzC5O_5AzM9IHpKFqNzBRg1tvtk5MgYvlI-p9_3HsO2aAHqxepvprzTKscnuwY5cfC_plfbxpbOSuSiS5NduCD7y-6ys3GY2DBXVUlUP1-ukf_lAvzal4CU-cIqvMQFh1cvzS-YFua7Vc4zi_iyGAaWkYiB2DAfg08cofTnpif0v17AUPfxibJnp8",
      date: "2023-10-24",
    },
    {
      patientName: "Amit Kumar",
      patientId: "#PT-3324",
      time: "08:30 AM",
      treatment: "Consultation",
      status: "Completed",
      dentist: "Dr. Sharma",
      initials: "AK",
      date: "2023-10-24",
    }
  ];

  for (const appt of appointments) {
    const matchedPatient = patientIds.find(p => p.name === appt.patientName);
    await addDoc(collection(db, "appointments"), {
      ...appt,
      patientId: matchedPatient ? matchedPatient.id : appt.patientId,
      createdAt: serverTimestamp(),
    });
    console.log(`Added appointment for ${appt.patientName}`);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
