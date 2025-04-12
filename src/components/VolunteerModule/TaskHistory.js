// TaskHistory.js
import React from "react";

const TaskHistory = () => {
  const tasks = [
    { title: "Pickup from City Center", date: "2025-03-01", status: "Completed" },
    { title: "Delivery to East Side", date: "2025-03-03", status: "Completed" },
  ];

  return (
    <div className="p-4">
      <button className="mb-4" onClick={() => window.history.back()}>
        Back
      </button>
      <h1 className="text-xl font-bold">Task History</h1>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className="p-4 mb-2 border rounded">
            <p>Task: {task.title}</p>
            <p>Date: {task.date}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskHistory;

