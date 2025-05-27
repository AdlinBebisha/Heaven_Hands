import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const DonateFoodPage = () => {
  const { state } = useLocation();
  const prefill    = state?.prefill || {};
  const [loading, setLoading] = useState(false);

  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [donationType, setDonationType] = useState("");
  const [selectedOrphanage, setSelectedOrphanage] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  
  const [isFoodTypeDropdownOpen, setIsFoodTypeDropdownOpen] = useState(false);
  const [isDonationTypeDropdownOpen, setIsDonationTypeDropdownOpen] = useState(false);
  const [isOrphanageDropdownOpen, setIsOrphanageDropdownOpen] = useState(false);
  const [isDeliveryModeDropdownOpen, setIsDeliveryModeDropdownOpen] = useState(false);
  
  const [orphanages, setOrphanages] = useState([]);

  useEffect(() => {
      if (prefill.foodType) setFoodType(prefill.foodType);
      if (prefill.quantity) setQuantity(prefill.quantity);
      if (prefill.selectedOrphanage) setSelectedOrphanage(prefill.selectedOrphanage);
    }, [prefill.foodType, prefill.quantity,prefill.selectedOrphanage]);
  
  const foodTypes = [
    "Fruits (in kg)",
    "Vegetables (in kg)",
    "Rice (in kg)",
    "Veg Meals (count)",
    "Non-Veg Meals (count)",
  ];
  const donationTypes = [
    "Make available to all orphanages",
    "Donate directly to a specific orphanage",
  ];
  const deliveryModes = ["Need Volunteers", "Delivered by Myself"];
  
  const [user] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return savedUser || {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      address: "",
      profilePicture: null,
    };
  });

  useEffect(() => {
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
    setLoading(true);

    if (donationType === "Donate directly to a specific orphanage" && !selectedOrphanage) {
      alert("Please select an orphanage before submitting.");
      return;
    }
    if (!deliveryMode) {
      alert("Please select a mode of delivery.");
      return;
    }
    if (deliveryMode === "Need Volunteers" && !pickupAddress) {
      alert("Please provide a pickup address.");
      return;
    }

    const donationData = {
      userId: user.id,
      foodType,
      quantity: Number(quantity),
      donationType,
      orphanage: donationType === "Donate directly to a specific orphanage" ? selectedOrphanage : null,
      deliveryMode,
      pickupAddress: deliveryMode === "Need Volunteers" ? pickupAddress : null,
    };

    try {
      const response = await fetch("http://localhost:8080/api/food-donations/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) throw new Error("Failed to submit donation");

      alert("Donation submitted successfully!");
      setFoodType("");
      setQuantity("");
      setDonationType("");
      setSelectedOrphanage("");
      setDeliveryMode("");
      setPickupAddress("");
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Error submitting donation. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header /><br/><br/>
      <main className="pt-16 px-4">

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
        <section className="bg-[#F8E9E9] p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-[#990011] mb-4">
            Donate Food to Orphanages
          </h1>
          <p className="text-gray-700">
            Your generosity can help bring smiles and nourishment to those in need. Fill out the form below to donate food items, and together, we can make a difference. Whether you're donating meals, groceries, or perishables, every contribution matters.
          </p>
        </section>
          <h2 className="text-2xl font-semibold text-[#990011] mb-6 text-center">
            Food Donation Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Food Type Dropdown */}
              <div className="col-span-2 md:col-span-1 relative">
                <label className="block text-[#77000E] font-semibold mb-2">Food Type:</label>
                <button
                  type="button"
                  onClick={() => setIsFoodTypeDropdownOpen(!isFoodTypeDropdownOpen)}
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {foodType || "Select a food type"}
                </button>
                {isFoodTypeDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {foodTypes.map((option, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
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
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Donation Type Dropdown */}
              <div className="col-span-2 relative">
                <label className="block text-[#77000E] font-semibold mb-2">Donation Type:</label>
                <button
                  type="button"
                  onClick={() => setIsDonationTypeDropdownOpen(!isDonationTypeDropdownOpen)}
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {donationType || "Select donation type"}
                </button>
                {isDonationTypeDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {donationTypes.map((option, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
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

              {/* Orphanage Selection */}
              {donationType === "Donate directly to a specific orphanage" && (
                <div className="col-span-2 relative">
                  <label className="block text-[#77000E] font-semibold mb-2">Select Orphanage:</label>
                  <button
                    type="button"
                    onClick={() => setIsOrphanageDropdownOpen(!isOrphanageDropdownOpen)}
                    className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                  >
                    {selectedOrphanage || "Select an orphanage"}
                  </button>
                  {isOrphanageDropdownOpen && (
                    <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                      {orphanages.map((orphanage, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
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
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {deliveryMode || "Select delivery mode"}
                </button>
                {isDeliveryModeDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {deliveryModes.map((option, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
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

            {/* Pickup Address */}
            {deliveryMode === "Need Volunteers" && (
              <div className="mt-6">
                <label className="block text-[#77000E] font-semibold mb-2">Pickup Address:</label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter pickup address"
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
        type="submit"
        className="px-6 py-3 bg-[#990011] text-white py-3 rounded-lg font-semibold hover:bg-[#88000F] transition duration-200 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Donation"}
                
              </button>
            </div>
          </form>
        </div><br/><br/>
      </main>
    </div>
  );
};

export default DonateFoodPage;
