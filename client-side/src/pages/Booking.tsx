import { useState } from "react";
import { mockDoctors, mockAvailability } from "../data/mockData";

export default function Booking() {
  const [services] = useState([
    "General Consultation", "Pediatrics", "Cardiology", 
    "Dermatology", "Orthopedics", "Mental Health Counseling"
  ]);
  const [selectedService, setSelectedService] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  // Handle service selection and filter doctors
  const handleServiceChange = (service: string) => {
    setSelectedService(service);
    const filtered = mockDoctors.filter((doc) => doc.specialty === service);
    setFilteredDoctors(filtered);
    setSelectedDoctor(""); // Reset doctor selection
    setAvailableTimes([]); // Reset available times
  };

  // Handle doctor selection and show available times
  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setAvailableTimes(mockAvailability[doctorId] || []);
  };

  const handleSubmit = () => {
    if (!selectedService || !selectedDoctor || !selectedTime) {
      alert("Please select all fields.");
      return;
    }
    alert(`Appointment booked successfully with Doctor ${selectedDoctor} at ${selectedTime}`);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-accent bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Book an Appointment</h1>

        {/* Select Service */}
        <div className="mb-6">
          <label className="block text-secondary mb-2">Choose a Service:</label>
          <select 
            className="select select-bordered w-full rounded-full border-secondary text-secondary placeholder-secondary"
            value={selectedService} 
            onChange={(e) => handleServiceChange(e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Select Doctor */}
        {selectedService && (
          <div className="mb-6">
            <label className="block text-secondary mb-2">Choose a Doctor:</label>
            <select 
              className="select select-bordered w-full rounded-full border-secondary text-secondary placeholder-secondary"
              value={selectedDoctor} 
              onChange={(e) => handleDoctorChange(e.target.value)}
            >
              <option value="">Select a doctor</option>
              {filteredDoctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Select Available Time */}
        {selectedDoctor && (
          <div className="mb-6">
            <label className="block text-secondary mb-2">Choose an Available Time:</label>
            <select 
              className="select select-bordered w-full rounded-full border-secondary text-secondary placeholder-secondary"
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select a time</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button 
            className="btn btn-primary w-full mt-5 rounded-full text-lg"
            onClick={handleSubmit}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
