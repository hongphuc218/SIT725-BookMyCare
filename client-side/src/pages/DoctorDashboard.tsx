import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import axios from "axios";

interface Appointment {
  _id: string;
  patientName: string;
  date: string;
  time: string;
}

interface Schedule {
  availableDays: string[];
  availableTimes: string[];
}

export default function DoctorDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [schedule, setSchedule] = useState<Schedule>({ availableDays: [], availableTimes: [] });

  // Redirect non-doctors away
  useEffect(() => {
    if (!user || user.role !== "doctor") {
      navigate("/login");
    } else {
      fetchDoctorData();
    }
  }, [user]);

  // Fetch doctor's bookings and schedule from the backend
  const fetchDoctorData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/doctors/${user?.email}/appointments`);
      setAppointments(data.appointments);
      setSchedule(data.schedule);
    } catch (error) {
      console.error("Failed to fetch doctor data:", error);
    }
  };

  // Handle schedule update
  const updateSchedule = async () => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${user?.email}/schedule`, schedule);
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  // Handle appointment cancellation
  const cancelAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
      alert("Appointment canceled successfully!");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
        <ul>
          <li className={`cursor-pointer p-2 ${activeTab === "bookings" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("bookings")}>
            My Bookings
          </li>
          <li className={`cursor-pointer p-2 ${activeTab === "schedule" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("schedule")}>
            My Schedule
          </li>
          <li className={`cursor-pointer p-2 ${activeTab === "settings" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("settings")}>
            Profile Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
            {appointments.length === 0 ? (
              <p>No appointments scheduled.</p>
            ) : (
              <ul>
                {appointments.map((appt) => (
                  <li key={appt._id} className="border p-4 rounded-lg mb-2 flex justify-between items-center">
                    <div>
                      <p><strong>Patient:</strong> {appt.patientName}</p>
                      <p><strong>Date:</strong> {appt.date}</p>
                      <p><strong>Time:</strong> {appt.time}</p>
                    </div>
                    <button onClick={() => cancelAppointment(appt._id)} className="btn btn-secondary">
                      Cancel
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "schedule" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage My Schedule</h2>
            <label className="block mb-2">Available Days</label>
            <input type="text" className="input input-bordered w-full mb-4" value={schedule.availableDays.join(", ")} onChange={(e) => setSchedule({ ...schedule, availableDays: e.target.value.split(", ") })} />

            <label className="block mb-2">Available Times</label>
            <input type="text" className="input input-bordered w-full mb-4" value={schedule.availableTimes.join(", ")} onChange={(e) => setSchedule({ ...schedule, availableTimes: e.target.value.split(", ") })} />

            <button onClick={updateSchedule} className="btn btn-primary w-full">Update Schedule</button>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Specialty:</strong> {user?.specialty}</p> {/* ✅ FIXED: `user?.specialty` */}
          </div>
        )}
      </div>
    </div>
  );
}
