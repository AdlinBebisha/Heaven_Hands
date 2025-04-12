import React, { useState } from "react";
import Header from "./Header";

const ClaimItemsPage = () => {
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemType || !quantity || !address) {
      alert("Please fill all required fields (Item Type, Quantity, and Address).");
      return;
    }

    // Simulate sending the need request to a backend
    console.log("Need Request Submitted:", {
      itemType,
      quantity,
      address,
      description,
    });
    alert("Your request for needed items has been submitted to all donors!");

    // Reset form fields after submission
    setItemType("");
    setQuantity("");
    setAddress("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header title="Request Needed Items" />
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-[#990011] my-6">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
          Request Needed Items
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Item Type */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Item Type:
              </label>
              <input
                type="text"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                placeholder="e.g., Clothes, Books, Toys"
                className="w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-[#77000E] font-semibold mb-2">
                Quantity Needed:
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
                placeholder="Enter the address"
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
                placeholder="Provide any additional details about your need (e.g., sizes, specific requirements, etc.)"
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

export default ClaimItemsPage;

