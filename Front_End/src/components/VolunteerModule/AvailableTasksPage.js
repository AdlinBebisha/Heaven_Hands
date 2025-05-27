// src/pages/AvailableTasksPage.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function AvailableTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("userProfile")) || {};
  const volunteerEmail = user.email;
  const volunteerName = user.firstname;

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks/available")
      .then((r) => r.json())
      .then(setTasks)
      .catch(() => alert("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  const claim = async (task) => {
    setClaimingId(task.donationId);

    let endpoint;
    switch (task.donationType.toLowerCase()) {
      case "food":
        endpoint = `http://localhost:8080/api/tasks/food/${task.donationId}/claim`;
        break;
      case "item":
        endpoint = `http://localhost:8080/api/tasks/item/${task.donationId}/claim`;
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
        body: JSON.stringify({ volunteerEmail, volunteerName }),
      });

      let payload;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        payload = await res.json();
      } else {
        const txt = await res.text();
        payload = { message: txt };
      }

      if (!res.ok) {
        throw new Error(payload.error || payload.message);
      }

      alert(payload.message);
      setTasks((ts) => ts.filter((t) => t.donationId !== task.donationId));
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header />
      <main className="pt-24 px-4 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow border border-[#990011]">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Available Volunteer Tasks
          </h2>

          {loading ? (
            <p className="text-center">Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-[#77000E]">No tasks available.</p>
          ) : (
            tasks.map((t) => (
              <div
                key={t.donationId}
                className="bg-[#FCF6F5] p-6 mb-4 rounded-lg border border-[#990011] flex flex-col"
              >
                <p className="font-semibold text-[#77000E] mb-1">{t.summary}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(t.timestamp).toLocaleString()}
                </p>
                <button
                  onClick={() => claim(t)}
                  disabled={claimingId === t.donationId}
                  className="mt-2 bg-[#990011] disabled:bg-gray-400 text-white px-4 py-2 rounded hover:bg-[#77000E] transition"
                >
                  {claimingId === t.donationId ? "Accepting…" : "Accept Task"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
