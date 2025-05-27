import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ showBackButton = false }) => {
  const navigate = useNavigate();

  return (
    <header className="p-4 bg-[#990011] text-white flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
          <img
            src="/assets/Logo.png"
            alt="HeavenHands Logo"
            className="w-10 h-10 mr-3 rounded-full"
          />
          <h1 className="text-2xl font-bold">HeavenHands</h1>
        </div>
      {/* Show Back Button*/}
      {showBackButton ? (
        <button
          onClick={() => navigate(-1)}
          className="text-white flex items-center text-lg hover:text-[#D94E5D] transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </button>
      ) : (
        <h1 className="text-xl font-bold tracking-wide">:-)</h1>
      )}
    </header>
  );
};

export default Header;
