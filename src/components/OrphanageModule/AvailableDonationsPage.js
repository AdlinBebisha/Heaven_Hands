import React, { useState, useEffect } from "react";
import Header from "./Header";

const AvailableDonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate fetching donations from an API on component mount
  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      // Dummy data representing donated items from various donors
      const data = [
        { id: 1, itemType: "Clothes", quantity: 10, donorName: "John Doe", claimed: false },
        { id: 2, itemType: "Books", quantity: 5, donorName: "Jane Smith", claimed: false },
        { id: 3, itemType: "Toys", quantity: 3, donorName: "Alice Johnson", claimed: false },
      ];
      // Simulate network delay
      setTimeout(() => {
        setDonations(data);
        setLoading(false);
      }, 1000);
    };

    fetchDonations();
  }, []);

  // Handler to mark a donation as claimed
  const handleClaim = (id) => {
    // In a real app, you'd call your API to mark the donation as claimed
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === id ? { ...donation, claimed: true } : donation
      )
    );
    alert("You have successfully claimed this donation!");
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header title="Claim Donated Items" />
      <main className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
          Available Donations
        </h2>
        {loading ? (
          <p className="text-center">Loading donations...</p>
        ) : donations.length === 0 ? (
          <p className="text-center">No donations available at the moment.</p>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white p-4 rounded shadow border border-[#990011]"
              >
                <p className="text-[#77000E] font-semibold">
                  Item: {donation.itemType}
                </p>
                <p className="text-[#77000E]">
                  Quantity: {donation.quantity}
                </p>
                <p className="text-[#77000E]">
                  Donor: {donation.donorName}
                </p>
                <div className="mt-2">
                  {donation.claimed ? (
                    <button className="bg-gray-400 text-white px-4 py-2 rounded" disabled>
                      Claimed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaim(donation.id)}
                      className="bg-[#990011] text-white px-4 py-2 rounded hover:bg-[#77000E] transition"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AvailableDonationPage;
