import React from "react";

const VolunteerTasks = () => {
  return (
    <div>
      <header>
        <button onClick={() => window.history.back()}>Back</button>
        <h2>Volunteer Tasks</h2>
      </header>
      <main>
        <section>
          <h3>Available Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Task Type</th>
                <th>Location</th>
                <th>Date/Time</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through tasks and display */}
            </tbody>
          </table>
        </section>
        <section>
          <h3>Claimed Tasks</h3>
          <div>
            <button>Pending</button>
            <button>Completed</button>
          </div>
          {/* Add claimed task logic here */}
        </section>
      </main>
    </div>
  );
};

export default VolunteerTasks;
