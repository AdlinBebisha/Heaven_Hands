import React, { useState } from "react";
import Header from "./Header";

const DonateItemsPage = () => {
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [donationType, setDonationType] = useState(""); // Donation type: specific/all
  const [selectedOrphanage, setSelectedOrphanage] = useState("");
  const [otherItemType, setOtherItemType] = useState(""); // For "Others" item type
  const [deliveryMode, setDeliveryMode] = useState(""); // Mode of delivery
  const [isItemTypeDropdownOpen, setIsItemTypeDropdownOpen] = useState(false);
  const [isDonationTypeDropdownOpen, setIsDonationTypeDropdownOpen] = useState(false);
  const [isOrphanageDropdownOpen, setIsOrphanageDropdownOpen] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [isDeliveryModeDropdownOpen, setIsDeliveryModeDropdownOpen] = useState(false);

  const orphanages = [
    "Hope Home",
    "Bright Future Orphanage",
    "Sunrise Shelter",
    "Helping Hands",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (donationType === "specific" && !selectedOrphanage) {
      alert("Please select an orphanage before submitting.");
      return;
    }
    if (itemType === "Others" && !otherItemType) {
      alert("Please specify the item type.");
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
    console.log("Item Donation:", {
      itemType: itemType === "Others" ? otherItemType : itemType,
      quantity,
      donationType,
      selectedOrphanage,
      deliveryMode,
      pickupAddress: deliveryMode === "Need Volunteers" ? pickupAddress : "N/A",
      pickupTime: deliveryMode === "Need Volunteers" ? pickupTime : "N/A",
    });
    alert("Item donation submitted!");
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header />
      <br />
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-[#990011]">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">Donate Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            {/* Item Type Dropdown */}
            <div className="col-span-2 md:col-span-1 relative">
              <label className="block text-[#77000E] font-semibold mb-2">Item Type:</label>
              <button
                type="button"
                onClick={() => setIsItemTypeDropdownOpen(!isItemTypeDropdownOpen)}
                className="block w-full p-2 border border-[#990011] rounded text-left focus:outline-none focus:ring focus:ring-[#990011]"
              >
                <span>{itemType || "Select an item type"}</span>
                <span className="float-right">▼</span>
              </button>
              {isItemTypeDropdownOpen && (
                <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded shadow-lg z-10">
                  {["Clothes", "Food", "Books", "Toys", "Others"].map((option) => (
                    <li
                      key={option}
                      className="p-2 hover:bg-[#990011] hover:text-[#FCF6F5] cursor-pointer"
                      onClick={() => {
                        setItemType(option);
                        setIsItemTypeDropdownOpen(false);
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

            {/* Other Item Type Field */}
            {itemType === "Others" && (
              <div className="col-span-2 relative">
                <label className="block text-[#77000E] font-semibold mb-2">Specify Item Type:</label>
                <input
                  type="text"
                  value={otherItemType}
                  placeholder="Enter the item type"
                  onChange={(e) => setOtherItemType(e.target.value)}
                  className="block w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                  required
                />
              </div>
            )}

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
                  {["Make available to all orphanages", "Donate directly to a specific orphanage"].map(
                    (option, index) => (
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
                    )
                  )}
                </ul>
              )}
            </div>

            {/* Select Orphanage Dropdown */}
            {donationType === "Donate directly to a specific orphanage" && (
              <div className="col-span-2 md:col-span-1 relative">
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

            {/* Mode of Delivery Dropdown */}
            <div className="col-span-2 md:col-span-1 relative">
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
                  {["Need Volunteers", "Delivered by Myself"].map((option) => (
                    <li
                      key={option}
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
            
            {/* Pickup Address and Time for Volunteers */}
            {deliveryMode === "Need Volunteers" && (
              <>
                <div className="col-span-2 md:col-span-1">
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
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[#77000E] font-semibold mb-2">Pickup Time:</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="block w-full p-2 border border-[#990011] rounded focus:outline-none focus:ring focus:ring-[#990011]"
                    required
                  />
                </div>
              </>
            )}
          </div>

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
      <br/>
    </div>
  );
};

export default DonateItemsPage;