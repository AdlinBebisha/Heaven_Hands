// src/pages/RequestedDonationPage.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

const RequestedDonationPage = () => {
  const [requests, setRequests]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [sendingKey, setSendingKey] = useState(null);

  const [user] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("userProfile"));
    return saved || { firstname: "", contact: "" };
  });

  // Fetch outstanding requests once
  useEffect(() => {
    fetch("http://localhost:8080/api/requests/available")
      .then((res) => res.json())
      .then(setRequests)
      .catch((err) => {
        console.error("Error loading requests:", err);
        alert("Failed to load requests");
      })
      .finally(() => setLoading(false));
  }, []);

  // Notify one orphanage request
  const notify = async (req) => {
    // Composite key so identical numeric IDs don’t collide
    const key = `${req.type}-${req.id}`;
    setSendingKey(key);

    try {
      const payload = {
        donorName:  user.firstname,
        donorPhone: user.contact,
      };
      const type = req.type.toLowerCase(); // "item" | "food" | "money"
      const res = await fetch(
        `http://localhost:8080/api/requests/${type}/${req.id}/notify`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (res.ok) {
        alert(json.message);
        // Immediately mark locally as claimed
        setRequests((prev) =>
          prev.map((r) =>
            r.type === req.type && r.id === req.id
              ? { ...r, claimed: true }
              : r
          )
        );
      } else {
        alert("Error: " + (json.error || res.statusText));
      }
    } catch (err) {
      console.error("Notify request failed:", err);
      alert("Network error. Please try again.");
    } finally {
      setSendingKey(null);
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
        {/* New Title */}
    <h3 className="text-lg font-semibold text-[#77000E] mb-2 text-center">
      Requests from Orphanages
    </h3>
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg border-[#990011] border">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Outstanding Requests
          </h2>

          {requests.length === 0 ? (
            <p className="text-center text-[#77000E]">No open requests.</p>
          ) : (
            requests.map((req) => {
              const key = `${req.type}-${req.id}`;
              return (
                <div
                  key={key}
                  className="p-6 bg-[#FCF6F5] rounded-lg border-[#990011] border mb-4 flex justify-between"
                >
                  <div>
                    <p>
                      <strong>Orphanage:</strong> {req.orphanageName}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {req.type === "ITEM"
                        ? req.itemType
                        : req.type === "FOOD"
                        ? req.foodType
                        : `₹${req.amount.toFixed(2)}`}
                    </p>
                    {req.quantity != null && (
                      <p>
                        <strong>Qty:</strong> {req.quantity}
                      </p>
                    )}
                    <p>
                      <strong>Details:</strong> {req.description || "N/A"}
                    </p>
                    <p>
                      <strong>Requested At:</strong>{" "}
                      {new Date(req.requestedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                  <button
                    onClick={() => notify(req)}
                    disabled={req.claimed || sendingKey === key}
                    className="bg-[#990011] disabled:bg-gray-400 text-white px-4 py-2 rounded hover:bg-[#77000E] transition"
                  >
                    {sendingKey === key
                      ? "Notifying…"
                      : req.claimed
                        ? "Claimed"
                        : "Notify Orphanage"}
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

export default RequestedDonationPage;
