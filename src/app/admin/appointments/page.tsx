"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/admin/Header";
import {
  subscribeToAppointments,
  updateAppointmentStatus,
  type Appointment,
} from "@/lib/firestore/appointments";

export default function AppointmentsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dentistFilter, setDentistFilter] = useState<string>("All");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeToAppointments((data) => {
      setAppointments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Appointment["status"]) => {
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Filtered appointments list
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesSearch =
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.patientId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDentist = dentistFilter === "All" || app.dentist === dentistFilter;

      return matchesSearch && matchesDentist;
    });
  }, [appointments, searchQuery, dentistFilter]);

  // Extract unique dentists dynamically
  const uniqueDentists = useMemo(() => {
    const dentists = new Set<string>();
    appointments.forEach((app) => {
      if (app.dentist) dentists.add(app.dentist);
    });
    return ["All", ...Array.from(dentists)];
  }, [appointments]);

  // Statistics computed from all loaded appointments for this dentist
  const stats = useMemo(() => {
    const list = dentistFilter === "All" 
      ? appointments 
      : appointments.filter(a => a.dentist === dentistFilter);

    const total = list.length;
    const upcoming = list.filter((a) => a.status === "Upcoming").length;
    const inProgress = list.filter((a) => a.status === "In Progress").length;
    const completed = list.filter((a) => a.status === "Completed").length;
    const canceled = list.filter((a) => a.status === "Canceled").length;

    return { total, upcoming, inProgress, completed, canceled };
  }, [appointments, dentistFilter]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="p-margin-mobile md:p-md lg:p-lg flex-grow">
        <div className="flex justify-between items-end mb-lg">
          <div>
            <h2 className="font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface mb-xs">
              Today's Appointments
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Tuesday, October 24, 2023</p>
          </div>
          <div className="hidden sm:flex gap-sm">
            <button
              onClick={handlePrint}
              className="px-md py-sm rounded-lg border-2 border-primary text-primary font-label-md text-label-md hover:bg-primary-container/10 transition-colors"
            >
              Print Schedule
            </button>
          </div>
        </div>

        {/* Metric Cards Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
          {/* Total Card */}
          <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:shadow-[0_15px_40px_rgba(15,110,86,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-display-lg" style={{ fontSize: "64px" }}>
                event
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm relative z-10">Total Active</p>
            <p className="font-display-lg text-display-lg text-primary relative z-10">{stats.total}</p>
          </div>

          {/* Upcoming Card */}
          <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:shadow-[0_15px_40px_rgba(15,110,86,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-display-lg text-secondary" style={{ fontSize: "64px" }}>
                schedule
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm relative z-10">Upcoming</p>
            <p className="font-display-lg text-display-lg text-secondary relative z-10">{stats.upcoming}</p>
          </div>

          {/* Completed Card */}
          <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:shadow-[0_15px_40px_rgba(15,110,86,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span
                className="material-symbols-outlined text-display-lg text-primary-container"
                style={{ fontSize: "64px" }}
              >
                check_circle
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm relative z-10">Completed</p>
            <p className="font-display-lg text-display-lg text-primary-container relative z-10">{stats.completed}</p>
          </div>

          {/* Canceled Card */}
          <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:shadow-[0_15px_40px_rgba(15,110,86,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-display-lg text-error" style={{ fontSize: "64px" }}>
                cancel
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm relative z-10">Canceled</p>
            <p className="font-display-lg text-display-lg text-error relative z-10">{stats.canceled}</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(15,110,86,0.05)] overflow-hidden">
          <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-title-lg text-title-lg text-on-surface">Schedule Overview</h3>
            <div className="flex gap-sm">
              {uniqueDentists.map((dentist) => (
                <span
                  key={dentist}
                  onClick={() => setDentistFilter(dentist)}
                  className={`px-sm py-xs rounded-full font-caption text-caption cursor-pointer transition-colors ${
                    dentistFilter === dentist
                      ? "bg-primary-container/10 text-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {dentist}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-xl flex flex-col items-center justify-center gap-sm">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-body-md text-on-surface-variant">Loading schedule...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-xl">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-xs">
                  search_off
                </span>
                <p className="font-body-lg text-body-lg text-on-surface-variant">No appointments found matching filters.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md border-b border-outline-variant">
                    <th className="p-md font-semibold">Patient</th>
                    <th className="p-md font-semibold">Time</th>
                    <th className="p-md font-semibold">Treatment</th>
                    <th className="p-md font-semibold">Status</th>
                    <th className="p-md font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md divide-y divide-outline-variant/50">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container relative flex items-center justify-center">
                            {app.avatarUrl ? (
                              <Image
                                alt="Patient photo"
                                className="object-cover"
                                src={app.avatarUrl}
                                fill
                                sizes="40px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-tertiary-container text-on-tertiary-container font-bold text-label-md">
                                {app.initials}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{app.patientName}</p>
                            <p className="text-caption text-on-surface-variant">ID: {app.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`p-md text-on-surface ${
                          app.status === "In Progress" ? "font-bold text-primary" : ""
                        }`}
                      >
                        {app.time}
                      </td>
                      <td className="p-md text-on-surface">{app.treatment}</td>
                      <td className="p-md">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                          className={`inline-flex items-center gap-xs px-sm py-xs rounded-full font-caption text-caption border outline-none cursor-pointer font-bold transition-colors ${
                            app.status === "Upcoming"
                              ? "bg-secondary-fixed text-on-secondary-fixed border-secondary/20"
                              : app.status === "In Progress"
                              ? "bg-primary-container/10 text-primary-container border-primary-container/20"
                              : app.status === "Completed"
                              ? "bg-surface-container-high text-on-surface-variant border-outline-variant/30"
                              : "bg-error-container text-on-error-container border-error/10"
                          }`}
                        >
                          <option value="Upcoming" className="bg-surface text-on-surface">Upcoming</option>
                          <option value="In Progress" className="bg-surface text-on-surface">In Progress</option>
                          <option value="Completed" className="bg-surface text-on-surface">Completed</option>
                          <option value="Canceled" className="bg-surface text-on-surface">Canceled</option>
                        </select>
                      </td>
                      <td className="p-md text-right">
                        <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          {app.status !== "Completed" ? (
                            <>
                              <button
                                className="p-xs text-primary hover:bg-primary-container/10 rounded-full transition-colors"
                                title="Contact Patient"
                              >
                                <span className="material-symbols-outlined text-[20px]">call</span>
                              </button>
                              <button
                                className="p-xs text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
                                title="Edit Appointment"
                              >
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                              </button>
                            </>
                          ) : (
                            <button className="px-sm py-xs text-primary hover:bg-primary-container/10 rounded-lg transition-colors font-label-md text-caption">
                              View Notes
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
