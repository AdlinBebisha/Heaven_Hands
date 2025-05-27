import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/reset/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Reset link sent successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FCF6F5] min-h-screen">
      {/* Header with Back Button */}
      <Header showBackButton={true} /><br /><br /><br /><br /><br />

      {/* Main Content */}
      <main className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-[#990011]">
        <h2 className="text-2xl font-bold text-center text-[#990011] mb-6">
          Forgot Password
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Enter your registered email address, and we'll send you a link to reset your password.
        </p>

        {/* Success or Error Messages */}
        {message && (
          <div className="bg-green-100 text-[#990011] p-3 rounded mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border border-[#990011] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#D94E5D]"
            placeholder="Enter your email"
            required
          />

          {/* Send Reset Link Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-[#990011]"
            } w-full bg-[#990011] text-white py-3 rounded-lg font-semibold hover:bg-[#88000F] transition duration-200 disabled:opacity-50`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login Link */}
        <p className="mt-6 text-center">
          <Link
            to="/login"
            className="text-[#990011] font-medium hover:text-[#D94E5D] transition"
          >
            Back to Login
          </Link>
        </p>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
