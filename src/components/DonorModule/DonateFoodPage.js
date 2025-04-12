import React, { useState, useEffect } from "react";
import Header from "./Header";

const DonateFoodPage = () => {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [donationType, setDonationType] = useState("");
  const [selectedOrphanage, setSelectedOrphanage] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const [isFoodTypeDropdownOpen, setIsFoodTypeDropdownOpen] = useState(false);
  const [isDonationTypeDropdownOpen, setIsDonationTypeDropdownOpen] = useState(false);
  const [isOrphanageDropdownOpen, setIsOrphanageDropdownOpen] = useState(false);
  const [isDeliveryModeDropdownOpen, setIsDeliveryModeDropdownOpen] = useState(false);
  const [orphanages, setOrphanages] = useState([]);

  const foodTypes = ["Fruits (in kg)", "Vegetables (in kg)", "Rice (in kg)", "Veg Meals (count)", "Non-Veg Meals (count)"];
  const donationTypes = ["Make available to all orphanages", "Donate directly to a specific orphanage"];
  const deliveryModes = ["Need Volunteers", "Delivered by Myself"];

  const storedUser = JSON.parse(localStorage.getItem("userProfile"));
  const currentUserId = storedUser ? storedUser.ID : null;

  useEffect(() => {
    // Fetch orphanages on mount
    const fetchOrphanages = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orphanages/list");
        if (response.ok) {
          const data = await response.json();
          setOrphanages(data);
        } else {
          console.error("Failed to fetch orphanages");
        }
      } catch (error) {
        console.error("Error fetching orphanages:", error);
      }
    };

    fetchOrphanages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (donationType === "Donate directly to a specific orphanage" && !selectedOrphanage) {
      alert("Please select an orphanage before submitting.");
      return;
    }
    if (!deliveryMode) {
      alert("Please select a mode of delivery.");
      return;
    }
    if (deliveryMode === "Need Volunteers" && (!pickupAddress || !pickupTime)) {
      alert("Please provide pickup address and time.");
      return;
    }

    const donationData = {
      userId: currentUserId, // Make sure currentUserId is defined (from props, context, or state)
      foodType,
      quantity: Number(quantity),
      donationType,
      orphanage: donationType === "Donate directly to a specific orphanage" ? selectedOrphanage : null,
      deliveryMode,
      pickupAddress: deliveryMode === "Need Volunteers" ? pickupAddress : null,
      pickupTime: deliveryMode === "Need Volunteers" ? pickupTime : null,
    };

    
    
    try {
      const response = await fetch(`http://localhost:8080/api/food-donations/submit?userId=${currentUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });
      
      if (response.ok) {
        alert("Donation submitted successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error submitting donation:", err);
    }
  };


  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header />
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-[#990011] my-6">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">Donate Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            {/* Food Type Dropdown */}
            <div className="col-span-2 md:col-span-1 relative">
              <label className="block text-[#77000E] font-semibold mb-2">Food Type:</label>
              <button
                type="button"
                onClick={() => setIsFoodTypeDropdownOpen(!isFoodTypeDropdownOpen)}
                className="block w-full p-2 border border-[#990011] rounded text-left focus:outline-none focus:ring focus:ring-[#990011]"
              >
                <span>{foodType || "Select a food type"}</span>
                <span className="float-right">▼</span>
              </button>
              {isFoodTypeDropdownOpen && (
                <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded shadow-lg z-10">
                  {foodTypes.map((option, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-[#990011] hover:text-[#FCF6F5] cursor-pointer"
                      onClick={() => {
                        setFoodType(option);
                        setIsFoodTypeDropdownOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quantity */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[#77000E] font-semibold mb-2">Quantity:</label>
              <input
                type="number"
                value={quantity}
                placeholder="Enter the quantity"
                onChange={(e) => setQuantity(e.target.value)}
                className="block w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                required
              />
            </div>

            {/* Donation Type Dropdown */}
            <div className="col-span-2 relative">
              <label className="block text-[#77000E] font-semibold mb-2">Donation Type:</label>
              <button
                type="button"
                onClick={() => setIsDonationTypeDropdownOpen(!isDonationTypeDropdownOpen)}
                className="block w-full p-2 border border-[#990011] rounded text-left focus:outline-none focus:ring focus:ring-[#990011]"
              >
                <span>{donationType || "Select donation type"}</span>
                <span className="float-right">▼</span>
              </button>
              {isDonationTypeDropdownOpen && (
                <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded shadow-lg z-10">
                  {donationTypes.map((option, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-[#990011] hover:text-[#FCF6F5] cursor-pointer"
                      onClick={() => {
                        setDonationType(option);
                        setIsDonationTypeDropdownOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Orphanage Dropdown */}
            {donationType === "Donate directly to a specific orphanage" && (
              <div className="col-span-2 relative">
                <label className="block text-[#77000E] font-semibold mb-2">Select Orphanage:</label>
                <button
                  type="button"
                  onClick={() => setIsOrphanageDropdownOpen(!isOrphanageDropdownOpen)}
                  className="block w-full p-2 border border-[#990011] rounded text-left focus:outline-none focus:ring focus:ring-[#990011]"
                >
                  <span>{selectedOrphanage || "Select an orphanage"}</span>
                  <span className="float-right">▼</span>
                </button>
                {isOrphanageDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded shadow-lg z-10">
                    {orphanages.map((orphanage, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-[#990011] hover:text-[#FCF6F5] cursor-pointer"
                        onClick={() => {
                          setSelectedOrphanage(orphanage);
                          setIsOrphanageDropdownOpen(false);
                        }}
                      >
                        {orphanage}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Delivery Mode Dropdown */}
            <div className="col-span-2 relative">
              <label className="block text-[#77000E] font-semibold mb-2">Mode of Delivery:</label>
              <button
                type="button"
                onClick={() => setIsDeliveryModeDropdownOpen(!isDeliveryModeDropdownOpen)}
                className="block w-full p-2 border border-[#990011] rounded text-left focus:outline-none focus:ring focus:ring-[#990011]"
              >
                <span>{deliveryMode || "Select a delivery mode"}</span>
                <span className="float-right">▼</span>
              </button>
              {isDeliveryModeDropdownOpen && (
                <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded shadow-lg z-10">
                  {deliveryModes.map((option, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-[#990011] hover:text-[#FCF6F5] cursor-pointer"
                      onClick={() => {
                        setDeliveryMode(option);
                        setIsDeliveryModeDropdownOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Pickup Address and Time for Volunteers */}
          {deliveryMode === "Need Volunteers" && (
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div>
                <label className="block text-[#77000E] font-semibold mb-2">Pickup Address:</label>
                <input
                  type="text"
                  value={pickupAddress}
                  placeholder="Enter pickup address"
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="block w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#77000E] font-semibold mb-2">Pickup Time:</label>
                
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="block w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#990011] text-white font-semibold rounded-lg hover:bg-[#77000E] transition"
            >
              Submit Donation
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DonateFoodPage;
