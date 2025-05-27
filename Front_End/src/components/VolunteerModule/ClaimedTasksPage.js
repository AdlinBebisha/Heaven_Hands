import React, { useState, useEffect } from "react";
import Header from "./Header";

const STATUSES = ["Pending", "In Transit", "Delivered"];

export default function ClaimedTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userProfile")) || {};
  const volunteerEmail = user.email;

  useEffect(() => {
    fetch(`http://localhost:8080/api/tasks/claimed?volunteerEmail=${volunteerEmail}`)
      .then(res => res.json())
      .then(setTasks)
      .catch(() => alert("Failed to load claimed tasks"))
      .finally(() => setLoading(false));
  }, [volunteerEmail]);

  const updateStatus = async (taskId, type, newStatus) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${type}/${taskId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setTasks(prev =>
        prev.map(t => (t.donationId === taskId ? { ...t, status: newStatus } : t))
      );

      alert("Status updated to " + newStatus);
    } catch {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header />
      <main className="pt-24 px-4 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow border border-[#990011]">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Your Accepted Tasks
          </h2>

          {loading ? (
            <p className="text-center">Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-[#77000E]">You have no Accepted tasks.</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.donationId}
                className="bg-[#FCF6F5] p-6 mb-4 rounded-lg border border-[#990011] flex flex-col"
              >
                <p className="font-semibold text-[#77000E] mb-1">{task.summary}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(task.timestamp).toLocaleString()}
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status:
                  </label>
                  <select
                    value={task.status}
                    onChange={e =>
                      updateStatus(task.donationId, task.donationType, e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded w-full max-w-xs"
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
