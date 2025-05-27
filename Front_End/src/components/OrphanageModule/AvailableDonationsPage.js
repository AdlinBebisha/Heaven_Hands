import React, { useState, useEffect } from "react";
import Header from "./Header";

const AvailableDonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);

  const [user] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedUser || {
        id: "",
        email: "",
        phone_number: "",
        address: "",
        profilePicture: null,
        organizationname: "",
      }
    );
  });

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const itemDonations = await fetch("http://localhost:8080/api/item-donations/available").then((res) => res.json());
        const foodDonations = await fetch("http://localhost:8080/api/food-donations/available").then((res) => res.json());
        const moneyDonations = await fetch("http://localhost:8080/api/money-donations/available").then((res) => res.json());

        setDonations([...itemDonations, ...foodDonations, ...moneyDonations]);
      } catch (error) {
        console.error("Error fetching donations:", error);
        alert("Failed to load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  function getDonationType(d) {
    if (d.itemType !== undefined) return "item";
    if (d.foodType !== undefined) return "food";
    return "money";
  }

  const handleClaim = async (id, type) => {
    const orphanageName = user.organizationname;
    setClaimingId(id);

    let endpoint;
    switch (type) {
      case "item":
        endpoint = `http://localhost:8080/api/item-donations/${id}/claim`;
        break;
      case "food":
        endpoint = `http://localhost:8080/api/food-donations/${id}/claim`;
        break;
      case "money":
        endpoint = `http://localhost:8080/api/money-donations/${id}/claim`;
        break;
      default:
        alert("Invalid donation type.");
        setClaimingId(null);
        return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orphanageName }),
      });

      const updatedDonation = await res.json();
      if (res.ok) {
        alert("You have successfully claimed this donation!");
        setDonations((prev) =>
          prev.map((don) =>
            don.id === updatedDonation.id ? updatedDonation : don
          )
        );
      } else {
        alert("Error: " + (updatedDonation.error || res.statusText));
      }
    } catch (err) {
      console.error("Claim failed:", err);
      alert("Network error while claiming donation.");
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF6F5]">
        <Header />
        <main className="pt-24 text-center">Loading…</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF6F5] flex flex-col">
      <Header />
      <main className="flex-grow pt-24 px-4">
        <h3 className="text-lg font-semibold text-[#77000E] mb-2 text-center">
          Donations Available for Claim
        </h3>

        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg border-[#990011] border">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Available Donations
          </h2>

          {donations.length === 0 ? (
            <p className="text-center text-[#77000E]">
              No donations available at the moment.
            </p>
          ) : (
            donations.map((donation) => {
              const type = getDonationType(donation);
              return (
                <div
                  key={`${type}-${donation.id}`}
                  className="p-6 bg-[#FCF6F5] rounded-lg border-[#990011] border mb-4 flex justify-between"
                >
                  <div>
                    <p>
                      <strong>Type:</strong>{" "}
                      {type === "item"
                        ? donation.itemType
                        : type === "food"
                        ? donation.foodType
                        : `₹${donation.amount.toFixed(2)}`}
                    </p>
                    {donation.quantity != null && (
                      <p>
                        <strong>Qty:</strong> {donation.quantity}
                      </p>
                    )}
                    <p>
                      <strong>Donor:</strong> {donation.donorName}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleClaim(donation.id, type)}
                      disabled={donation.claimed || claimingId === donation.id}
                      className="bg-[#990011] disabled:bg-gray-400 text-white px-4 py-2 rounded hover:bg-[#77000E] transition"
                    >
                      {claimingId === donation.id
                        ? "Claiming…"
                        : donation.claimed
                        ? "Claimed"
                        : "Claim"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default AvailableDonationPage;
