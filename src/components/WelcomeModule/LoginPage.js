import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const {
        ID,
        role,
        message,
        firstname,
        lastname,
        useremail,
        phonenumber,
        organizationname,
        incharge,
        organizationtype,
        profilePicture,
      } = response.data;

      const user = {
        ID,
        firstname,
        lastname,
        email: useremail,
        contact: phonenumber,
        organizationname,
        incharge,
        organizationtype,
        role,
        profilePicture,
      };

      localStorage.setItem("userProfile", JSON.stringify(user));
      setErrorMessage("");
      console.log("Login successful:", message);

      if (role?.toLowerCase() === "donor") {
        navigate("/donor-dashboard");
      } else if (role?.toLowerCase() === "volunteer") {
        navigate("/volunteer-dashboard");
      } else if (role?.toLowerCase() === "orphanage") {
        navigate("/orphans-dashboard");
      } else {
        setErrorMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An unexpected error occurred."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-[#FCF6F5] min-h-screen">
      <Header showBackButton={true} /><br/><br/><br/>
      <main className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-[#990011]">
        <h2 className="text-2xl font-bold text-center text-[#990011] mb-6">
          Login to HeavenHands
        </h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
            required
          />
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
            required
          />
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#990011] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#88000F] transition"
          >
            Login
          </button>
        </form>
        <Link
          to="/forgot-password"
          className="block mt-4 text-center text-[#990011] hover:text-[#D94E5D] transition"
        >
          Forgot Password?
        </Link>
        <p className="mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#990011] font-medium hover:text-[#D94E5D] transition"
          >
            Sign Up
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
