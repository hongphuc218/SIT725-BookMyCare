import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/UserContext";
import axios from "axios";

// Define the structure of an appointment
interface Appointment {
  _id: string;
  doctorName: string;
  date: string;
  time: string;
}

export default function UserDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [appointments, setAppointments] = useState<Appointment[]>([]); // ✅ Set Correct Type

  // Redirect non-users away
  useEffect(() => {
    if (!user || user.role !== "user") {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [user]);

  // Fetch user's appointments
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/users/${user.email}/appointments`);
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Handle appointment cancellation
  const cancelAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId)); // ✅ Fixed Type Issue
      alert("Appointment canceled successfully!");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
        <ul>
          <li className={`cursor-pointer p-2 ${activeTab === "bookings" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("bookings")}>
            My Appointments
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
              <p>No upcoming appointments.</p>
            ) : (
              <ul>
                {appointments.map((appt) => (
                  <li key={appt._id} className="border p-4 rounded-lg mb-2 flex justify-between items-center">
                    <div>
                      <p><strong>Doctor:</strong> {appt.doctorName}</p>
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

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
