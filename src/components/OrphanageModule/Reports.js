import React, { useState } from "react";
import Header from "./Header";

const Reports = () => {
  const [filters, setFilters] = useState({ type: "", dateRange: "" });

  return (
    <div className="bg-[#FCF6F5] min-h-screen">
      <Header title="Reports" />
      <main className="p-4 text-[#990011]">
        <h2 className="text-2xl font-bold mb-6">Reports</h2>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Donation Type:</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="block w-full p-2 border rounded bg-white text-[#990011] border-[#990011]"
          >
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
          </select>
          <label className="block mt-4 mb-2 font-medium">Date Range:</label>
          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, dateRange: e.target.value })
            }
            className="block w-full p-2 border rounded bg-white text-[#990011] border-[#990011]"
          />
        </div>
        <button className="bg-[#990011] text-[#FCF6F5] px-4 py-2 rounded hover:bg-opacity-80">
          Generate Report
        </button>
      </main>
    </div>
  );
};

export default Reports;
