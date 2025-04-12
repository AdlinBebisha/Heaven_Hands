import React, { useState } from "react";
import Header from "./Header";

const DonateMoneyPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("");
  const [orphanage, setOrphanage] = useState("");
  const [orphanageDropdownOpen, setOrphanageDropdownOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);

  const orphanages = ["Hope Home", "Bright Future Orphanage", "Sunrise Shelter", "Helping Hands"];
  const paymentMethods = ["Credit/Debit Card", "Gpay", "PayPal"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !amount || !donationType || !paymentMethod || (donationType === "Donate directly to a specific orphanage" && !orphanage)) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      name,
      email,
      amount,
      donationType,
      orphanage: donationType === "Donate directly to a specific orphanage" ? orphanage : "All Orphanages",
      paymentMethod,
    };

    console.log("Donation Data:", formData);
    alert("Thank you for your generous donation!");
    // You can replace the above with an API call to your backend
  };

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header />
    <main className="max-w-3xl mx-auto p-6 bg-white border border-[#990011] rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">Donate Money</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#77000E] font-semibold mb-1">Name:</label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#990011] rounded p-2 focus:outline-none focus:ring focus:ring-[#990011]"
          />
        </div>

        <div>
          <label className="block text-[#77000E] font-semibold mb-1">Email:</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#990011] rounded p-2 focus:outline-none focus:ring focus:ring-[#990011]"
          />
        </div>

        <div>
          <label className="block text-[#77000E] font-semibold mb-1">Amount (₹):</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-[#990011] rounded p-2 focus:outline-none focus:ring focus:ring-[#990011]"
          />
        </div>

        <div>
          <label className="block text-[#77000E] font-semibold mb-1">Donation Type:</label>
          <div className="space-y-1">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="donationType"
                value="Make available to all orphanages"
                checked={donationType === "Make available to all orphanages"}
                onChange={(e) => setDonationType(e.target.value)}
              />
              All orphanages
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="donationType"
                value="Donate directly to a specific orphanage"
                checked={donationType === "Donate directly to a specific orphanage"}
                onChange={(e) => setDonationType(e.target.value)}
              />
              Specific orphanage
            </label>
          </div>
        </div>

        {donationType === "Donate directly to a specific orphanage" && (
          <div className="relative">
            <label className="block text-[#77000E] font-semibold mb-1">Select Orphanage:</label>
            <button
              type="button"
              className="w-full p-2 border border-[#990011] rounded text-left"
              onClick={() => setOrphanageDropdownOpen(!orphanageDropdownOpen)}
            >
              {orphanage || "Choose orphanage"} <span className="float-right">▼</span>
            </button>
            {orphanageDropdownOpen && (
              <ul className="absolute w-full bg-white border border-[#990011] rounded mt-1 shadow-lg z-10">
                {orphanages.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                    onClick={() => {
                      setOrphanage(option);
                      setOrphanageDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="relative">
          <label className="block text-[#77000E] font-semibold mb-1">Payment Method:</label>
          <button
            type="button"
            className="w-full p-2 border border-[#990011] rounded text-left"
            onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
          >
            {paymentMethod || "Select payment method"} <span className="float-right">▼</span>
          </button>
          {paymentDropdownOpen && (
            <ul className="absolute w-full bg-white border border-[#990011] rounded mt-1 shadow-lg z-10">
              {paymentMethods.map((method, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                  onClick={() => {
                    setPaymentMethod(method);
                    setPaymentDropdownOpen(false);
                  }}
                >
                  {method}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-[#990011] text-white px-6 py-2 rounded hover:bg-[#77000E] transition duration-200"
          >
            Donate Now
          </button>
        </div>
      </form>
    </main>
    </div>
  );
};

export default DonateMoneyPage;
