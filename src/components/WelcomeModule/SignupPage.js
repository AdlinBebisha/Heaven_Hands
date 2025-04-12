import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleplay: "",
    organizationName: "", // For Orphanage
    incharge: "", // For Orphanage
    organizationType: "", // For Orphanage
  });

  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, roleplay: value });
    setIsRoleSelected(true);
  };

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setFormData({
      ...formData,
      [name || id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        roleplay: formData.roleplay,
        organizationName: formData.roleplay === "Orphanage" ? formData.organizationName : null,
        incharge: formData.roleplay === "Orphanage" ? formData.incharge : null,
        organizationType: formData.roleplay === "Orphanage" ? formData.organizationType : null,
      };
  
      console.log("Payload being sent:", payload);
  
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Save the user profile or token to localStorage
        localStorage.setItem("userProfile", JSON.stringify(result.user || payload));
  
        alert(result.message || "Signup successful!");
  
        // Redirect based on roleplay
        if (formData.roleplay === "Donor") {
          navigate(`/donor-dashboard`);
        } else if (formData.roleplay === "Volunteer") {
          navigate("/volunteer-dashboard");
        } else if (formData.roleplay === "Orphanage") {
          navigate("/orphans-dashboard");
        } else {
          navigate("/welcome");
        }
      } else {
        const error = await response.json().catch(() => ({
          message: "An unknown error occurred",
        }));
        alert(error.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
      console.error("Error during signup:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="bg-[#FCF6F5] min-h-screen">
      <Header showBackButton={true} />
      <br />
      <br />
      <br />

      {/* Main Content */}
      <main className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-[#990011]">
        <h2 className="text-2xl font-bold text-center text-[#990011] mb-6">
          Create Your Account in HeavenHands
        </h2>

        {!isRoleSelected ? (
          // Role Selection Step
          <div>
            <h3 className="text-xl text-center text-gray-700 mb-4">Select Your Role</h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                className="bg-[#990011] text-white px-4 py-2 rounded-lg hover:bg-[#88000F] transition"
                onClick={() => handleRoleSelection({ target: { value: "Donor" } })}
              >
                Donor
              </button>
              <button
                className="bg-[#990011] text-white px-4 py-2 rounded-lg hover:bg-[#88000F] transition"
                onClick={() => handleRoleSelection({ target: { value: "Volunteer" } })}
              >
                Volunteer
              </button>
              <button
                className="bg-[#990011] text-white px-4 py-2 rounded-lg hover:bg-[#88000F] transition"
                onClick={() => handleRoleSelection({ target: { value: "Orphanage" } })}
              >
                Orphanage
              </button>
            </div>
          </div>
        ) : formData.roleplay === "Orphanage" ? (
          // Form for Orphanage
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="organizationName"
              className="block text-gray-700 font-medium mb-2"
            >
              Organization Name:
            </label>
            <input
              type="text"
              id="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your organization name"
              required
            />

            <label
              htmlFor="incharge"
              className="block text-gray-700 font-medium mb-2"
            >
              In-Charge Name:
            </label>
            <input
              type="text"
              id="incharge"
              value={formData.incharge}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter in-charge name"
              required
            />

            <label
              htmlFor="organizationType"
              className="block text-gray-700 font-medium mb-2"
            >
              Type of Organization:
            </label>
            <select
              id="organizationType"
              value={formData.organizationType}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              required
            >
              <option value="">Select Type</option>
              <option value="paternal orphans">Paternal Orphans (absence of the father)</option>
              <option value="maternal orphans">Maternal Orphans (absence of mother)</option>
              <option value="double orphans"> Double Orphans (absence of both the parents)</option>
              <option value="old age homes"> Old Age Homes</option>
            </select>

            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Mobile Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              required
            />

            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your password"
              required
            />

            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Confirm your password"
              required
            />

            <button
              type="submit"
              className={`w-full bg-[#990011] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#88000F] transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          // Form for Donor/Volunteer
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your first name"
              required
            />

            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your last name"
              required
            />

            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              required
            />

            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Enter your password"
              required
            />

            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
              placeholder="Confirm your password"
              required
            />

            <button
              type="submit"
              className={`w-full bg-[#990011] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#88000F] transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        )}

        {!isRoleSelected && (
          <p className="mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#990011] font-medium hover:text-[#D94E5D] transition"
            >
              Login
            </Link>
          </p>
        )}
      </main>
    </div>
  );
};

export default SignupPage;