import React, { useState, useEffect } from "react";
import Header from "./Header";

const TaskHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    fetch(`http://localhost:8080/api/tasks/history?volunteerId=${user.id}`)
      .then(res => res.json())
      .then(setHistory);
  }, [user.id]);

  if (!history.length) return <p>No completed tasks yet.</p>;

  return (
    <div>
      <Header title="Task History"/>
      {history.map(t => (
        <div key={t.taskId} className="task-card completed">
          <p><strong>Type:</strong> {t.donationType}</p>
          <p><strong>From:</strong> {t.donorName}</p>
          <p><strong>Orphanage:</strong> {t.orphanageName}</p>
          <p><strong>Pickup:</strong> {t.pickupAddress}</p>
          <p><em>Completed</em></p>
        </div>
      ))}
    </div>
  );
};

export default TaskHistoryPage;
