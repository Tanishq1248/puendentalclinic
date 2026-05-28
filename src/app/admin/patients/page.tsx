"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/admin/Header";
import {
  subscribeToPatients,
  subscribeToPatientHistory,
  subscribeToPatientSessions,
  updatePatient,
  updateReminders,
  addHistoryEntry,
  type Patient,
  type HistoryEntry,
  type UpcomingSession,
} from "@/lib/firestore/patients";



export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  
  // Mobile responsive layout state: show registry list or patient details
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<"add-entry" | "view-history" | "edit-patient" | null>(null);
  
  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // ─── Firestore state ────────────────────────────────────────────────────
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [patientHistory, setPatientHistory] = useState<HistoryEntry[]>([]);
  const [patientSessions, setPatientSessions] = useState<UpcomingSession[]>([]);
  // ────────────────────────────────────────────────────────────────────────

  // Form states for adding entry
  const [newEntryTitle, setNewEntryTitle] = useState("Routine Cleaning");
  const [newEntryDate, setNewEntryDate] = useState("");
  const [newEntryTime, setNewEntryTime] = useState("10:30 AM");
  const [newEntryDentist, setNewEntryDentist] = useState("Dr. Mehta");

  // Form states for editing patient (fully built edit dialog)
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState<"HIGH RISK" | "ROUTINE" | "STABLE">("ROUTINE");
  const [editAlerts, setEditAlerts] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSince, setEditSince] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState("");


  // ─── Subscribe to all patients ──────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = subscribeToPatients((data) => {
      setPatients(data);
      setPatientsLoading(false);
      // Auto-select first patient when data first loads
      setSelectedPatientId((prev) => prev ?? (data[0]?.id || null));
    });
    return () => unsubscribe();
  }, []);

  // ─── Subscribe to selected patient's history + sessions ─────────────────
  useEffect(() => {
    if (!selectedPatientId) return;
    const unsubHistory = subscribeToPatientHistory(selectedPatientId, setPatientHistory);
    const unsubSessions = subscribeToPatientSessions(selectedPatientId, setPatientSessions);
    return () => {
      unsubHistory();
      unsubSessions();
    };
  }, [selectedPatientId]);


  // Find currently selected patient object
  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0];
  }, [patients, selectedPatientId]);

  // Filter patients by search query
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    });
  }, [patients, searchQuery]);

  // Setup form states when editing opens
  const openEditModal = () => {
    if (!selectedPatient) return;
    setEditName(selectedPatient.name);
    setEditStatus(selectedPatient.status);
    setEditAlerts(selectedPatient.medicalAlerts?.map(a => a.text).join(", ") || "");
    setEditPhone(selectedPatient.phone);
    setEditEmail(selectedPatient.email);
    setEditSince(selectedPatient.since);
    setEditAvatarUrl(selectedPatient.avatarUrl);
    setActiveModal("edit-patient");
  };

  // Save changes to patient profile — writes to Firestore
  const handleSavePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    const alertsList = editAlerts.split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .map(alertText => ({
        text: alertText,
        type: alertText.toLowerCase().includes("allergy") || alertText.toLowerCase().includes("hypertension") ? "error" as const : "primary" as const
      }));
    try {
      await updatePatient(selectedPatient.id, {
        name: editName,
        status: editStatus,
        medicalAlerts: alertsList,
        phone: editPhone,
        email: editEmail,
        since: editSince,
        ...(editAvatarUrl ? { avatarUrl: editAvatarUrl, detailAvatarUrl: editAvatarUrl } : {}),
      });
      showToast(`Updated profile details for ${editName}`);
      setActiveModal(null);
    } catch (err) {
      console.error("Failed to update patient:", err);
      showToast("Error saving changes. Please try again.");
    }
  };

  // Add a new session to the selected patient's upcoming session list — writes to Firestore
  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    if (!newEntryDate) {
      showToast("Please select a date for the new appointment");
      return;
    }

    // Format date string to "MMM DD" (e.g. "Oct 28")
    let formattedDate = newEntryDate;
    try {
      const dateObj = new Date(newEntryDate);
      formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch (err) {
      // Fallback to raw value
    }

    try {
      await addHistoryEntry(selectedPatient.id, {
        date: formattedDate,
        treatment: newEntryTitle,
        dentist: newEntryDentist,
        notes: `Scheduled for ${newEntryTime}`,
      });
      showToast(`Successfully added new session for ${selectedPatient.name}`);
      setActiveModal(null);
      setNewEntryDate("");
    } catch (err) {
      console.error("Failed to add session:", err);
      showToast("Error saving session. Please try again.");
    }
  };

  // Toggle dynamic checkboxes on the detail panel — writes to Firestore
  const handleReminderToggle = async (channel: "sms" | "email" | "whatsapp") => {
    if (!selectedPatient) return;
    const updatedReminders = {
      ...selectedPatient.reminders,
      [channel]: !selectedPatient.reminders[channel],
    };
    try {
      await updateReminders(selectedPatient.id, updatedReminders);
      const statusWord = !selectedPatient.reminders[channel] ? "Enabled" : "Disabled";
      const channelName = channel === "sms" ? "SMS" : channel === "email" ? "Email" : "WhatsApp";
      showToast(`${statusWord} ${channelName} reminders for ${selectedPatient.name}`);
    } catch (err) {
      console.error("Failed to update reminders:", err);
      showToast("Error updating reminders. Please try again.");
    }
  };

  // Sync reminders via WhatsApp — writes to Firestore
  const handleWhatsAppSync = async () => {
    if (isSyncing || !selectedPatient) return;
    setIsSyncing(true);
    showToast(`Syncing WhatsApp notifications for ${selectedPatient.name}...`);
    try {
      await updateReminders(selectedPatient.id, { ...selectedPatient.reminders, whatsapp: true });
      showToast(`WhatsApp synchronized successfully! SMS and templates updated.`);
    } catch (err) {
      console.error("WhatsApp sync failed:", err);
      showToast("Sync failed. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Toast manager helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen w-full overflow-hidden relative">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main split dashboard view */}
      <div className="flex-grow flex overflow-hidden min-h-0 relative">
        
        {/* Left Registry Panel (Always visible on desktop, hidden on mobile if detail is active) */}
        <section className={`flex-1 overflow-y-auto p-md space-y-md ${isMobileDetailOpen ? "hidden lg:block" : "block"}`}>
          <div className="flex justify-between items-end mb-sm">
            <div>
              <h2 className="font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md text-primary">
                Patient Registry
              </h2>
              <p className="text-on-surface-variant font-body-md">
                Managing {filteredPatients.length} active patient file{filteredPatients.length !== 1 ? "s" : ""}
              </p>
            </div>
          
          </div>

          {/* Patient Cards List */}
          <div className="grid grid-cols-1 gap-md">
            {patientsLoading ? (
              <div className="p-lg text-center font-body-md text-outline flex flex-col items-center justify-center gap-sm">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p>Loading patient records...</p>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="bg-surface-container-lowest p-lg rounded-xl text-center shadow-[0_10px_30px_rgba(15,110,86,0.05)] border border-outline-variant/30">
                <span className="material-symbols-outlined text-outline text-[48px] mb-sm block">search_off</span>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs">No Patients Found</h3>
                <p className="text-on-surface-variant font-body-md">
                  No matches for &ldquo;{searchQuery}&rdquo;. Try checking the spelling or searching another name.
                </p>
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const isSelected = patient.id === selectedPatientId;
                return (
                  <div
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatientId(patient.id);
                      setIsMobileDetailOpen(true);
                    }}
                    className={`p-md rounded-xl clinical-shadow transition-all duration-300 flex items-center justify-between cursor-pointer group hover:translate-x-1 border-2 ${
                      isSelected
                        ? "bg-surface-container-lowest border-primary"
                        : "bg-surface-container-lowest border-outline-variant/30 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-md">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container relative">
                        <Image
                          alt={`${patient.name} profile`}
                          className="object-cover"
                          src={patient.avatarUrl}
                          fill
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">
                          {patient.name}
                        </h3>
                        <p className="text-outline text-caption uppercase tracking-wider">ID: {patient.id}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-md sm:gap-lg">
                      <div className="hidden sm:block">
                        <p className="text-outline text-caption uppercase">Last Visit</p>
                        <p className="font-label-md text-label-md text-on-surface">{patient.lastVisit}</p>
                      </div>
                      
                      <div>
                        {patient.status === "HIGH RISK" && (
                          <div className="bg-error-container text-on-error-container px-sm py-xs rounded-full text-caption font-bold border border-error/10">
                            HIGH RISK
                          </div>
                        )}
                        {patient.status === "ROUTINE" && (
                          <div className="bg-surface-container-high text-on-surface-variant px-sm py-xs rounded-full text-caption font-bold">
                            ROUTINE
                          </div>
                        )}
                        {patient.status === "STABLE" && (
                          <div className="bg-whatsapp-green/10 text-whatsapp-green px-sm py-xs rounded-full text-caption font-bold border border-whatsapp-green/20">
                            STABLE
                          </div>
                        )}
                      </div>
                      <span className={`material-symbols-outlined text-outline transition-colors ${
                        isSelected ? "text-primary font-bold" : "group-hover:text-primary"
                      }`}>
                        chevron_right
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Right Patient Detail Panel */}
        <aside className={`w-full lg:w-[400px] bg-surface-container-lowest border-l border-outline-variant/30 flex flex-col overflow-y-auto shrink-0 z-40 transition-all ${
          isMobileDetailOpen ? "block fixed inset-y-16 right-0 lg:static lg:block" : "hidden lg:flex"
        }`}>
          {/* Mobile Back Button */}
          <div className="lg:hidden p-md border-b border-outline-variant/20 flex items-center gap-xs bg-surface-container-low text-primary">
            <button 
              onClick={() => setIsMobileDetailOpen(false)}
              className="flex items-center gap-xs font-bold text-label-md cursor-pointer hover:underline"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Back to Patient Registry
            </button>
          </div>

          {patientsLoading ? (
            <div className="p-md text-center py-xl flex-grow flex flex-col items-center justify-center text-outline">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-sm"></div>
              <p className="font-body-md">Loading details...</p>
            </div>
          ) : !selectedPatient ? (
            <div className="p-md text-center py-xl flex-grow flex flex-col items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-sm">person_off</span>
              <p className="font-body-md">No patient selected</p>
            </div>
          ) : (
            <>
              {/* Profile Header (Edit button is overlayed on profile image container) */}
              <div className="p-md text-center border-b border-outline-variant/20 relative">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-fixed ring-8 ring-primary-container/10 relative">
                    <Image
                      alt={`${selectedPatient.name} detail profile`}
                      className="object-cover"
                      src={selectedPatient.detailAvatarUrl}
                      fill
                      sizes="96px"
                      priority
                    />
                  </div>
                  
                  {/* Photo-Overlay Edit Icon Button matching Stitch Mockup exactly */}
                  <button 
                    onClick={openEditModal}
                    className="absolute bottom-0 right-0 bg-primary hover:opacity-90 text-on-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md cursor-pointer transition-transform active:scale-95 z-10"
                    title="Edit Patient Details"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
                
                <h2 className="font-headline-md text-[24px] text-primary mb-xs">
                  {selectedPatient.name}
                </h2>
                <p className="text-outline font-label-md mb-md">
                  Patient since {selectedPatient.since}
                </p>
                <div className="flex justify-center gap-md">
                  <button 
                    onClick={() => showToast(`Calling ${selectedPatient.name} at ${selectedPatient.phone}...`)}
                    className="p-sm rounded-full border border-outline hover:bg-primary-container/10 text-primary transition-colors cursor-pointer hover:scale-105 active:scale-95"
                    title={`Call: ${selectedPatient.phone}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </button>
                  <button 
                    onClick={() => showToast(`Opening email compose to ${selectedPatient.email}...`)}
                    className="p-sm rounded-full border border-outline hover:bg-primary-container/10 text-primary transition-colors cursor-pointer hover:scale-105 active:scale-95"
                    title={`Email: ${selectedPatient.email}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </button>
                  <button 
                    onClick={handleWhatsAppSync}
                    className="p-sm rounded-full border border-whatsapp-green text-whatsapp-green hover:bg-whatsapp-green/10 transition-colors cursor-pointer hover:scale-105 active:scale-95"
                    title="WhatsApp Direct Message"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                  </button>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-md space-y-md flex-grow">
                
                {/* Medical Alerts */}
                <section className="space-y-sm">
                  <h4 className="text-caption font-bold text-outline uppercase tracking-wider">Medical Alerts</h4>
                  {(!selectedPatient.medicalAlerts || selectedPatient.medicalAlerts.length === 0) ? (
                    <p className="text-on-surface-variant/80 font-body-md text-caption bg-surface-container-low p-sm rounded-lg border border-outline-variant/20 italic">
                      No active medical warnings or allergies reported.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-sm">
                      {selectedPatient.medicalAlerts.map((alert, index) => (
                        <div
                          key={index}
                          className={`px-sm py-sm rounded-lg flex items-center gap-xs text-caption font-bold shadow-sm ${
                            alert.type === "error"
                              ? "bg-error text-on-error"
                              : "bg-primary-container text-on-primary-container"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {alert.type === "error" ? "warning" : "info"}
                          </span>
                          {alert.text}
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Upcoming Sessions */}
                <section className="space-y-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="text-caption font-bold text-outline uppercase tracking-wider">Upcoming Sessions</h4>
                    <button 
                      onClick={() => showToast(`Total upcoming sessions for this patient: ${patientSessions.length}`)}
                      className="text-primary text-caption font-bold hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-sm">
                    {patientSessions.length === 0 ? (
                      <div className="p-md text-center rounded-lg bg-surface-container-low border border-dashed border-outline-variant/40">
                        <p className="text-outline font-body-md text-caption italic">No upcoming appointments scheduled.</p>
                      </div>
                    ) : (
                      patientSessions.map((session, index) => (
                        <div
                          key={index}
                          className={`bg-surface-container-low p-sm rounded-lg border-l-4 ${session.borderColorClass}`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-on-surface font-title-lg text-[15px]">{session.title}</p>
                            <p className="text-primary font-bold text-caption">{session.date}</p>
                          </div>
                          <p className="text-outline text-caption">{session.timeAndDentist}</p>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Reminders Checklist */}
                <section className="space-y-sm">
                  <h4 className="text-caption font-bold text-outline uppercase tracking-wider">Reminders</h4>
                  <div className="bg-surface-container-low/70 rounded-xl p-sm space-y-sm border border-outline-variant/10">
                    {/* SMS Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary shadow-sm">
                          <span className="material-symbols-outlined text-[18px]">sms</span>
                        </div>
                        <span className="text-label-md font-semibold">SMS Reminder</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked={selectedPatient.reminders?.sms || false}
                          onChange={() => handleReminderToggle("sms")}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* WhatsApp Sync Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-whatsapp-green shadow-sm">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                        </div>
                        <span className="text-label-md font-semibold">WhatsApp Sync</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked={selectedPatient.reminders?.whatsapp || false}
                          onChange={() => handleReminderToggle("whatsapp")}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-outline-variant/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-whatsapp-green"></div>
                      </label>
                    </div>
                  </div>
                </section>
              </div>

              {/* Panel Footer buttons */}
              <div className="p-md grid grid-cols-2 gap-sm border-t border-outline-variant/20 bg-surface-container-lowest">
                <button
                  onClick={() => setActiveModal("view-history")}
                  className="py-sm px-md rounded-lg bg-surface-container-high font-bold text-label-md transition-colors hover:bg-surface-container-highest cursor-pointer text-center text-on-surface"
                >
                  View History
                </button>
                <button
                  onClick={() => setActiveModal("add-entry")}
                  className="py-sm px-md rounded-lg bg-primary text-on-primary font-bold text-label-md transition-all shadow-sm hover:opacity-90 active:scale-95 cursor-pointer text-center"
                >
                  Add Entry
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

     

      {/* Floating Action success toast alert */}
      {toastMessage && (
        <div className="fixed bottom-24 right-8 bg-surface-container-highest text-primary border border-primary-container px-md py-sm rounded-lg shadow-xl flex items-center gap-xs font-label-md z-50 animate-fade-in-up">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal - Add Dental Entry */}
      {activeModal === "add-entry" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-sm md:p-md z-50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-xl max-w- w-full shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
            <form onSubmit={handleAddSession} className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-md border-b border-outline-variant/20 shrink-0">
                <h3 className="font-headline-md text-[20px] text-primary">Add Dental Record Entry</h3>
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-on-surface-variant hover:text-primary cursor-pointer p-xs rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {/* Scrollable body */}
              <div className="p-md space-y-md overflow-y-auto flex-grow min-h-0">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-xs">Treatment / Session Name</label>
                  <select
                    value={newEntryTitle}
                    onChange={(e) => setNewEntryTitle(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  >
                    <option value="Routine Cleaning">Routine Cleaning</option>
                    <option value="Deep Cleaning">Deep Cleaning</option>
                    <option value="Cavity Filling">Cavity Filling</option>
                    <option value="Root Canal Therapy">Root Canal Therapy</option>
                    <option value="Fluoride Treatment">Fluoride Treatment</option>
                    <option value="Crown Placement">Crown Placement</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <label className="block text-label-md font-semibold text-on-surface mb-xs">Date</label>
                    <input
                      type="date"
                      required
                      value={newEntryDate}
                      onChange={(e) => setNewEntryDate(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-semibold text-on-surface mb-xs">Time</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10:30 AM"
                      value={newEntryTime}
                      onChange={(e) => setNewEntryTime(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-xs">Dentist In Charge</label>
                  <select
                    value={newEntryDentist}
                    onChange={(e) => setNewEntryDentist(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  >
                    <option value="Dr. Mehta">Dr. Arjun Mehta</option>
                    <option value="Dr. Iyer">Dr. Raman Iyer</option>
                    <option value="Dr. Patel">Dr. Priya Patel</option>
                    <option value="Dr. Sharma">Dr. Kavita Sharma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-xs">Clinical Notes (Optional)</label>
                  <textarea
                    placeholder="Clinical assessment or scheduling notes..."
                    rows={3}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  ></textarea>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-sm p-md border-t border-outline-variant/20 bg-surface-container-low/30 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-md py-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer text-on-surface font-semibold text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-md py-sm rounded-lg bg-primary hover:opacity-90 transition-all cursor-pointer text-on-primary font-semibold text-label-md"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - View Patient History */}
      {activeModal === "view-history" && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-md z-50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-xl max-w w-full p-md shadow-2xl border border-outline-variant/30 animate-fade-in-up max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-md shrink-0">
              <div>
                <h3 className="font-headline-md text-[20px] text-primary">Treatment History</h3>
                <p className="text-outline text-caption uppercase tracking-wider">Patient: {selectedPatient.name}</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-on-surface-variant hover:text-primary cursor-pointer p-xs rounded-full hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="overflow-y-auto flex-grow space-y-md pr-xs">
              {patientHistory.length === 0 ? (
                <p className="text-outline italic text-center py-lg font-body-md">No historical dental entries found.</p>
              ) : (
                patientHistory.map((record, index) => (
                  <div key={index} className="p-md rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-xs">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-primary font-title-lg text-[16px]">{record.treatment}</p>
                      <p className="text-outline font-label-md text-caption">{record.date}</p>
                    </div>
                    <p className="text-on-surface-variant font-label-md text-caption">Dentist: {record.dentist}</p>
                    <p className="text-on-surface font-body-md text-caption mt-sm leading-relaxed">{record.notes}</p>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex justify-end pt-md border-t border-outline-variant/20 mt-md shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-md py-sm rounded-lg bg-primary text-on-primary font-semibold hover:opacity-90 transition-colors cursor-pointer"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Edit Patient Details (Fully Built Dialogue) */}
      {activeModal === "edit-patient" && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-sm md:p-md z-50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-xl max-w w-full shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
            <form onSubmit={handleSavePatient} className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-md border-b border-outline-variant/20 shrink-0">
                <div>
                  <h3 className="font-headline-md text-[20px] text-primary">Edit Patient Profile</h3>
                  <p className="text-outline text-caption uppercase tracking-wider">ID: {selectedPatient.id}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-on-surface-variant hover:text-primary cursor-pointer p-xs rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {/* Scrollable Form Fields */}
              <div className="p-md space-y-md overflow-y-auto flex-grow min-h-0">
                {/* Patient Name */}
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-xs">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  />
                </div>

                {/* Patient Since & Risk Classification */}
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <label className="block text-label-md font-semibold text-on-surface mb-xs">Patient Since</label>
                    <input
                      type="text"
                      required
                      value={editSince}
                      onChange={(e) => setEditSince(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                      placeholder="e.g. Feb 2021"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-semibold text-on-surface mb-xs">Risk Classification</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    >
                      <option value="HIGH RISK">HIGH RISK</option>
                      <option value="ROUTINE">ROUTINE</option>
                      <option value="STABLE">STABLE</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info (Phone & Email) */}
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <label className="block text-label-md font-semibold text-on-surface mb-xs">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-semibold text-on-surface mb-xs">Email Address</label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    />
                  </div>
                </div>

                {/* Medical Alerts & Allergies */}
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-xs">Medical Alerts & Allergies (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Lidocaine Allergy, Pregnancy, Penicillin Allergy"
                    value={editAlerts}
                    onChange={(e) => setEditAlerts(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  />
                  <p className="text-[11px] text-outline mt-xs">Items containing &ldquo;Allergy&rdquo; or &ldquo;Hypertension&rdquo; will color code red.</p>
                </div>

                {/* Profile Image URL */}
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-xs">Avatar Photo URL</label>
                  <input
                    type="text"
                    value={editAvatarUrl}
                    onChange={(e) => setEditAvatarUrl(e.target.value)}
                    placeholder="Paste profile photo URL..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm outline-none focus:ring-2 focus:ring-primary font-body-md text-on-surface text-[12px]"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-sm p-md border-t border-outline-variant/20 bg-surface-container-low/30 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-md py-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer text-on-surface font-semibold text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-md py-sm rounded-lg bg-primary hover:opacity-90 transition-all cursor-pointer text-on-primary font-semibold text-label-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
