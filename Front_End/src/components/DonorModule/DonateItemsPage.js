import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const DonateItemsPage = () => {
  const { state } = useLocation();
  const prefill    = state?.prefill || {};

  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedOrphanage, setSelectedOrphanage] = useState("");
  const [donationType, setDonationType] = useState("");
  const [otherItemType, setOtherItemType] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [isItemTypeDropdownOpen, setIsItemTypeDropdownOpen] = useState(false);
  const [isDonationTypeDropdownOpen, setIsDonationTypeDropdownOpen] = useState(false);
  const [isOrphanageDropdownOpen, setIsOrphanageDropdownOpen] = useState(false);
  const [isDeliveryModeDropdownOpen, setIsDeliveryModeDropdownOpen] = useState(false);
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(false);

  // When navigation provides prefill, populate the form
  useEffect(() => {
    if (prefill.itemType) setItemType(prefill.itemType);
    if (prefill.quantity) setQuantity(prefill.quantity);
    if (prefill.selectedOrphanage) setSelectedOrphanage(prefill.selectedOrphanage);
  }, [prefill.itemType, prefill.quantity,prefill.selectedOrphanage]);

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
    setLoading(true);
    e.preventDefault();

    if (
      donationType === "Donate directly to a specific orphanage" &&
      !selectedOrphanage
    ) {
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
      itemType: itemType === "Others" ? otherItemType : itemType,
      quantity: Number(quantity),
      donationType,
      orphanage:
        donationType === "Donate directly to a specific orphanage"
          ? selectedOrphanage
          : null,
      deliveryMode,
      pickupAddress: deliveryMode === "Need Volunteers" ? pickupAddress : null,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/item-donations/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(donationData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit donation");

      alert("Donation submitted successfully!");
      // Reset form
      setItemType("");
      setQuantity("");
      setDonationType("");
      setSelectedOrphanage("");
      setOtherItemType("");
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
      <Header />

      <main className="pt-28 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
          {/* Intro Section */}
          <section className="bg-[#F8E9E9] p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold text-[#990011] mb-4">
              Donate Items to Orphanages
            </h1>
            <p className="text-gray-700">
              Your generosity can help bring essential items—clothes, books,
              toys, and more—to children who need them most. Fill out the form
              below to donate items and make a real difference today.
            </p>
          </section>

          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-[#990011] mb-6 text-center">
            Item Donation Form
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Item Type */}
              <div className="col-span-2 md:col-span-1 relative">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Item Type:
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setIsItemTypeDropdownOpen(!isItemTypeDropdownOpen)
                  }
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {itemType || "Select an item type"}
                </button>

                {isItemTypeDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {["Clothes", "Books", "Toys", "Others"].map((opt) => (
                      <li
                        key={opt}
                        className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                        onClick={() => {
                          setItemType(opt);
                          setIsItemTypeDropdownOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quantity */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Specify “Other” */}
              {itemType === "Others" && (
                <div className="col-span-2">
                  <label className="block text-[#77000E] font-semibold mb-2">
                    Specify Item Type:
                  </label>
                  <input
                    type="text"
                    value={otherItemType}
                    onChange={(e) => setOtherItemType(e.target.value)}
                    placeholder="Enter item type"
                    className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                    required
                  />
                </div>
              )}

              {/* Donation Type */}
              <div className="col-span-2 relative">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Donation Type:
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setIsDonationTypeDropdownOpen(!isDonationTypeDropdownOpen)
                  }
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {donationType || "Select donation type"}
                </button>

                {isDonationTypeDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {[
                      "Make available to all orphanages",
                      "Donate directly to a specific orphanage",
                    ].map((opt, i) => (
                      <li
                        key={i}
                        className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                        onClick={() => {
                          setDonationType(opt);
                          setIsDonationTypeDropdownOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Orphanage Selector */}
              {donationType ===
                "Donate directly to a specific orphanage" && (
                <div className="col-span-2 md:col-span-1 relative">
                  <label className="block text-[#77000E] font-semibold mb-2">
                    Select Orphanage:
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setIsOrphanageDropdownOpen(!isOrphanageDropdownOpen)
                    }
                    className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                  >
                    {selectedOrphanage || "Select an orphanage"}
                  </button>

                  {isOrphanageDropdownOpen && (
                    <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                      {orphanages.map((o, idx) => (
                        <li
                          key={idx}
                          className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                          onClick={() => {
                            setSelectedOrphanage(o);
                            setIsOrphanageDropdownOpen(false);
                          }}
                        >
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Delivery Mode */}
              <div className="col-span-2 md:col-span-1 relative">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Mode of Delivery:
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setIsDeliveryModeDropdownOpen(!isDeliveryModeDropdownOpen)
                  }
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {deliveryMode || "Select delivery mode"}
                </button>

                {isDeliveryModeDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {["Need Volunteers", "Delivered by Myself"].map(
                      (opt, i) => (
                        <li
                          key={i}
                          className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                          onClick={() => {
                            setDeliveryMode(opt);
                            setIsDeliveryModeDropdownOpen(false);
                          }}
                        >
                          {opt}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Pickup Address (if needed) */}
            {deliveryMode === "Need Volunteers" && (
              <div className="mt-6">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Pickup Address:
                </label>
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

            {/* Submit */}
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
        </div>

        <br />
        <br />
      </main>
    </div>
  );
};

export default DonateItemsPage;
