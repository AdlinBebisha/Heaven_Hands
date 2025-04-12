import React from "react";
import Header from "./Header";

const DonationHistoryPage = () => {
  const donationHistory = [
    {
      type: "Food",
      date: "2025-03-06",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header title="Donation History" />
      <main className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#990011] mb-6">Donation History</h2>
        {donationHistory.length > 0 ? (
          <table className="w-full border-collapse border border-[#990011] bg-white rounded shadow-lg">
            <thead>
              <tr className="bg-[#990011] text-white">
                <th className="border border-[#990011] px-4 py-2">Donation Type</th>
                <th className="border border-[#990011] px-4 py-2">Date</th>
                <th className="border border-[#990011] px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation, index) => (
                <tr key={index} className="hover:bg-[#FCF6F5] transition">
                  <td className="border border-[#990011] px-4 py-2 text-[#77000E]">{donation.type}</td>
                  <td className="border border-[#990011] px-4 py-2 text-[#77000E]">{donation.date}</td>
                  <td className="border border-[#990011] px-4 py-2 text-[#77000E]">{donation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-[#77000E]">No donation history available.</p>
        )}
      </main>
    </div>
  );
};

export default DonationHistoryPage;
