import React, { useState } from "react";
import Header from "./Header";

const ClaimItemsPage = () => {
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // User profile information is loaded from localStorage (if available)
  const [user] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedUser || {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        address: "",
        profilePicture: null,
      }
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!itemType || !quantity || !address || isNaN(quantity) || quantity <= 0) {
      alert("Please fill all required fields and ensure quantity is a positive number.");
      return;
    }

    const payload = {
      itemType,
      quantity: Number(quantity),
      address,
      description,
      user_id: user.id,
    };

    try {
      const res = await fetch("http://localhost:8080/api/item-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }
      alert("Request submitted successfully!");
      setItemType("");
      setQuantity("");
      setAddress("");
      setDescription("");
    } catch (e) {
      console.error(e);
      alert(`Error submitting request: ${e.message}`);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header /><br/><br/>
      <main className="pt-16 px-4">

        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
          {/* Page Introduction */}
        <section className="bg-[#F8E9E9] p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-[#990011] mb-4">
            Request Essential Items
          </h1>
          <p className="text-gray-700">
            At HeavenHands, we are committed to connecting those in need with generous donors. 
            Fill out the form below to request items for your orphanage or organization. 
            Provide accurate details to ensure timely support.
          </p>
        </section>
          <h2 className="text-2xl font-semibold text-[#990011] mb-6 text-center">
            Submit Your Request
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
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
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Orphanage Address */}
              <div className="md:col-span-2">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Orphanage Address:
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter the address"
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Additional Details */}
              <div className="md:col-span-2">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Additional Details (Optional):
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide any additional details about your need (e.g., sizes, specific requirements, etc.)"
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
        type="submit"
        className="px-6 py-3 bg-[#990011] text-white py-3 rounded-lg font-semibold hover:bg-[#88000F] transition duration-200 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Donation"}
                
              </button>
            </div>
          </form>
        </div><br/>
      </main>
    </div>
  );
};

export default ClaimItemsPage;
