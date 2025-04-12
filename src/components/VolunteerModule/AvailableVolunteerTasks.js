import React, { useState, useEffect } from "react";
import Header from "./Header";

const AvailableVolunteerTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Simulating fetching tasks from an API
  useEffect(() => {
    const fetchTasks = async () => {
      const taskData = [
        {
          id: 1,
          taskName: "Deliver Food to Orphanage",
          description: "Pick up food donations and deliver them to Orphanage A.",
          deadline: "2025-04-15",
          contact: "John Doe, +1-234-567-890",
        },
        {
          id: 2,
          taskName: "Organize Donation Drive",
          description: "Coordinate a local donation drive for clothes and books.",
          deadline: "2025-04-20",
          contact: "Jane Smith, +1-345-678-901",
        },
        {
          id: 3,
          taskName: "Sort and Package Items",
          description: "Sort through donated items and prepare packages for delivery.",
          deadline: "2025-04-10",
          contact: "Mark Taylor, +1-456-789-012",
        },
      ];
      setTasks(taskData);
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header title="Available Volunteer Tasks" />
      <main className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-[#0056b3] my-6">
        <h2 className="text-2xl font-bold text-[#0056b3] mb-6 text-center">
          Volunteer Tasks
        </h2>
        {tasks.length > 0 ? (
          <table className="w-full border-collapse border border-[#0056b3]">
            <thead>
              <tr className="bg-[#0056b3] text-white">
                <th className="p-3 border border-white">Task Name</th>
                <th className="p-3 border border-white">Description</th>
                <th className="p-3 border border-white">Deadline</th>
                <th className="p-3 border border-white">Contact</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#e6f7ff]">
                  <td className="p-3 border border-[#0056b3]">{task.taskName}</td>
                  <td className="p-3 border border-[#0056b3]">{task.description}</td>
                  <td className="p-3 border border-[#0056b3]">{task.deadline}</td>
                  <td className="p-3 border border-[#0056b3]">{task.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-[#0056b3]">No tasks available at the moment.</p>
        )}
      </main>
    </div>
  );
};

export default AvailableVolunteerTasks;
