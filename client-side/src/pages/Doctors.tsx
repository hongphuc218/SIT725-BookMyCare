import { useEffect, useState } from "react";
import axios from "axios";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialty: string;
  profileImage: string; // This should store the image URL
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Our Doctors</h1>

      {loading ? (
        <p className="text-center text-secondary">Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div key={doctor._id} className="card shadow-lg bg-white rounded-lg p-6">
              <img 
                src={doctor.profileImage} 
                alt={doctor.name} 
                className="w-24 h-24 mx-auto rounded-full border-4 border-accent"
              />
              <h2 className="text-2xl font-semibold text-center mt-4">{doctor.name}</h2>
              <p className="text-center text-secondary">{doctor.specialty}</p>
              <p className="text-center text-sm text-gray-500">{doctor.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
