import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // Default to 'user'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    dob: "",
  });
  const [error, setError] = useState("");

  // Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to backend
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || (role === "doctor" && !formData.specialty) || (role === "user" && !formData.dob)) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const userData = {
      role,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      ...(role === "doctor" ? { specialty: formData.specialty } : { dob: formData.dob }),
    };

    try {
      await axios.post("http://localhost:5000/api/signup", userData);
      navigate("/login"); // Redirect to login page after signup
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary text-center">Sign Up</h1>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 my-5">
          <button
            onClick={() => setRole("doctor")}
            className={`px-5 py-2 rounded-full ${role === "doctor" ? "bg-primary text-white" : "bg-gray-200 text-secondary"}`}
          >
            Doctor
          </button>
          <button
            onClick={() => setRole("user")}
            className={`px-5 py-2 rounded-full ${role === "user" ? "bg-primary text-white" : "bg-gray-200 text-secondary"}`}
          >
            Client
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
            required
          />
          
          {/* Conditional Fields for Doctor and Client */}
          {role === "doctor" ? (
            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
              required
            />
          ) : (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
            required
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-3 rounded-lg text-lg">
            Sign Up
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-secondary text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
