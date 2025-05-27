import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const {
        id,
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
        id,
        firstname,
        lastname,
        email: useremail,
        contact: phonenumber,
        organizationName: organizationname,
        incharge,
        organizationtype,
        role,
        profilePicture,
      };

      localStorage.setItem("userProfile", JSON.stringify(user));
      console.log("User profile stored:", user);

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
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FCF6F5] min-h-screen">
      <Header showBackButton={true} />
      
      <main className="pt-32 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl border border-[#990011]">
          <h2 className="text-3xl font-bold text-center text-[#990011] mb-8">
            Login to HeavenHands
          </h2>
  
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
                required
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
                required
              />
            </div>
  
            {errorMessage && (
              <div className="text-red-500 text-center text-sm">{errorMessage}</div>
            )}
  
             <button
        type="submit"
        className="w-full bg-[#990011] text-white py-3 rounded-lg font-semibold hover:bg-[#88000F] transition duration-200 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
          </form>
  
          <Link
            to="/forgot-password"
            className="block mt-4 text-center text-sm text-[#990011] hover:text-[#D94E5D] transition"
          >
            Forgot Password?
          </Link>
  
          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#990011] font-semibold hover:text-[#D94E5D] transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}  
export default LoginPage;
