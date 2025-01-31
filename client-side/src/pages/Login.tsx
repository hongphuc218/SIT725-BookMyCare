import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../auth/UserContext"; // Ensure this context is used for auth state

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access global user context
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Submit login request
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post("http://localhost:5000/api/login", credentials);
      const user = response.data.user;

      // Save user in localStorage & update global state
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      // Redirect based on user role
      if (user.role === "doctor") {
        navigate("/dashboard/doctor");
      } else {
        navigate("/dashboard/user");
      }
    } catch (err : any) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="shadow-lg rounded-lg p-8 max-w-lg w-full bg-white border border-accent">
        <h1 className="text-4xl font-bold text-primary text-center py-5">Login to Your Account</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border-secondary text-secondary placeholder-secondary"
            required
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-3 rounded-lg text-lg">
            Log In
          </button>
        </form>

        {/* Forgot Password & Sign Up Links */}
        <div className="flex justify-between text-sm mt-4">
          <a href="#" className="text-primary hover:underline">Forgot Password?</a>
          <a href="/signup" className="text-primary hover:underline">Create an account</a>
        </div>
      </div>
    </main>
  );
}
