import React, { useState } from "react";
import Header from "./Header";

const RequestMoneyDonationPage = () => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !purpose || !address) {
      alert("Please fill all required fields (Amount, Purpose, and Address).");
      return;
    }

    // Simulate sending the money donation request to a backend
    console.log("Money Donation Request Submitted:", {
      amount,
      purpose,
      address,
      description,
    });
    alert("Your request for money donations has been submitted!");

    // Reset form fields after submission
    setAmount("");
    setPurpose("");
    setAddress("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header title="Request Money Donations" />
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-[#990011] my-6">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
          Request Money Donations
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Donation Amount */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Donation Amount (in Rupees):
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the amount needed"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Purpose of Donation:
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Education, Medical Aid, Orphanage Renovation"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Orphanage Address */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Orphanage Gpay Number:
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the orphanage address"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Additional Details (Optional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional details about your request"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#990011] text-white px-6 py-2 rounded hover:bg-[#77000E] transition"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RequestMoneyDonationPage;
