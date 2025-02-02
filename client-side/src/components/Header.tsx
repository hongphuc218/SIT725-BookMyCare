import { useState } from "react";
import { useUser } from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useUser(); // Get user info and logout function
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-transparent">
      {/* Logo */}
      <a href="/" className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Book My Care
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-6">
        <a className="btn btn-ghost normal-case text-lg" href="/">
          Home
        </a>
        <a className="btn btn-ghost normal-case text-lg" href="/doctors">
          Doctor
        </a>
        <a className="btn btn-ghost normal-case text-lg" href="/services">
          Services
        </a>
        <a className="btn btn-ghost normal-case text-lg" href="#">
          Appointments
        </a>
      </nav>

      {/* Authentication Area */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Hi, {user.name}</span>
            <button onClick={logout} className="btn btn-outline btn-secondary">
              Log Out
            </button>
          </div>
        ) : (
          <>
            <a href="/login" className="btn btn-outline btn-primary">
              Log In
            </a>
            <a href="/signup" className="btn btn-primary">
              Sign Up
            </a>
          </>
        )}
      </div>

      {/* Mobile Menu (Hamburger Icon) */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 md:hidden">
          <a href="/" className="block px-4 py-2">
            Home
          </a>
          <a href="#" className="block px-4 py-2">
            Doctor
          </a>
          <a href="#" className="block px-4 py-2">
            Services
          </a>
          <a href="#" className="block px-4 py-2">
            Appointments
          </a>
          <div className="border-t my-2"></div>
          {user ? (
            <>
              <span className="block px-4 py-2 font-semibold">Hi, {user.name}</span>
              <button onClick={logout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                Log Out
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="block px-4 py-2 text-primary">
                Log In
              </a>
              <a href="/signup" className="block px-4 py-2 text-primary">
                Sign Up
              </a>
            </>
          )}
        </div>
      )}
    </header>
  );
}
