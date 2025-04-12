import React from "react";
import Header from "./Header";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "Your donation was successfully received by the orphanage!" },
  ];

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header title="Notifications" />
      <main className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#990011] mb-6">Notifications</h2>
        {notifications.length ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 bg-white text-[#77000E] border border-[#990011] rounded-lg shadow hover:shadow-lg transition"
              >
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#77000E] text-center">No notifications available.</p>
        )}
      </main>
    </div>
  );
};

export default Notifications;
