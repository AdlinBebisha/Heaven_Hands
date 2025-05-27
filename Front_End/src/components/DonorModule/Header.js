import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ title, showBackButton, onBack, user: initialUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedUser || {
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        address: "",
        profilePicture: null,
      }
    );
  });

  const defaultProfilePicture = "/assets/default-profile.jpg";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/donor-profile/${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (user.email) {
      fetchProfile();
    }
  }, [user.email]);

  return (
    <header className="p-4 bg-[#990011] text-white flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onBack || (() => navigate(-1))}
          aria-label="Go Back"
          className="mr-4 px-2 py-1 bg-white text-[#990011] rounded hover:bg-[#FCF6F5] transition"
        >
          Back
        </button>
      )}

      {/* Logo and Title */}
      <div className="flex items-center">
        <img
          src="/assets/Logo.png"
          alt="HeavenHands Logo"
          className="w-10 h-10 mr-3 rounded-full"
        />
        <h1 className="text-2xl font-bold">{title || "HeavenHands"}</h1>
      </div>

      {/* Navigation */}
      <nav className="flex items-center mt-2 sm:mt-0">
        <Link
          className="mx-2 hover:underline text-sm sm:text-base"
          to="/donor-dashboard"
          aria-label="Go to Home"
        >
          Home
        </Link>
        <Link to="/donor-profile" className="ml-3" aria-label="View Profile">
          <img
            src={initialUser?.profilePicture || user.profilePicture || defaultProfilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-[#990011]"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
