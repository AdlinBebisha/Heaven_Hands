import React, { useState } from "react";
import Header from "./Header";

const RequestFoodDonationPage = () => {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodType || !quantity || !address) {
      alert("Please fill all required fields (Food Type, Quantity, and Address).");
      return;
    }

    // Simulate sending the food donation request to a backend
    console.log("Food Donation Request Submitted:", {
      foodType,
      quantity,
      address,
      description,
    });
    alert("Your request for food donations has been submitted!");

    // Reset form fields after submission
    setFoodType("");
    setQuantity("");
    setAddress("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header title="Request Food Donations" />
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-[#990011] my-6">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
          Request Food Donations
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Food Type */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Food Type:
              </label>
              <input
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                placeholder="e.g., Vegetables, Snacks, Canned Goods"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Quantity Needed (in kg):
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter the quantity needed"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Orphanage Address */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Orphanage Address:
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the orphanage address"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Additional Details (Optional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional details about your request (e.g., delivery preferences)"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#990011] text-white px-6 py-2 rounded hover:bg-[#77000E] transition"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RequestFoodDonationPage;
