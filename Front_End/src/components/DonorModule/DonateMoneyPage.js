import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);

  const [orphanages, setOrphanages] = useState([]);
  const paymentMethods = ["GPay"];

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/orphanages/list"
        );
        if (response.ok) {
          setOrphanages(await response.json());
        } else {
          console.error("Failed to fetch orphanages");
        }
      } catch (err) {
        console.error("Error fetching orphanages:", err);
      }
    };
    fetchOrphanages();
  }, []);

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  if (
    !name ||
    !email ||
    !amount ||
    !donationType ||
    !paymentMethod ||
    (donationType === "Donate directly to a specific orphanage" && !orphanage)
  ) {
    alert("Please fill in all required fields.");
    setLoading(false); // Ensure loading is turned off on validation failure
    return;
  }

  const formData = {
    name,
    email,
    amount: Number(amount),
    donationType,
    orphanage:
      donationType === "Donate directly to a specific orphanage"
        ? orphanage
        : "All Orphanages",
    paymentMethod,
    userId: JSON.parse(localStorage.getItem("userProfile"))?.id || null,
  };

  fetch("http://localhost:8080/api/money-donations/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to submit donation");
      return res.json();
    })
    .then(() => {
      alert("Thank you for your generous donation!");
      // Reset form
      setName("");
      setEmail("");
      setAmount("");
      setDonationType("");
      setOrphanage("");
      setPaymentMethod("");
    })
    .catch((err) => {
      console.error(err);
      alert("Error submitting donation. Please try again later.");
    })
    .finally(() => setLoading(false));
};

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header />

      <main className="pt-28 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
          {/* Intro Section */}
          <section className="bg-[#F8E9E9] p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold text-[#990011] mb-4">
              Donate Money to Orphanages
            </h1>
            <p className="text-gray-700">
              Your contribution helps us provide food, clothing, and care for
              children in need. Choose how and where you’d like your donation
              to make an impact.
            </p>
          </section>

          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-[#990011] mb-6 text-center">
            Money Donation Form
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Name */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Amount */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Amount (₹):
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Donation Type */}
              <div className="col-span-2">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Donation Type:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="donationType"
                      value="Make available to all orphanages"
                      checked={
                        donationType === "Make available to all orphanages"
                      }
                      onChange={(e) => setDonationType(e.target.value)}
                    />
                    All orphanages
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="donationType"
                      value="Donate directly to a specific orphanage"
                      checked={
                        donationType ===
                        "Donate directly to a specific orphanage"
                      }
                      onChange={(e) => setDonationType(e.target.value)}
                    />
                    Specific orphanage
                  </label>
                </div>
              </div>

              {/* Orphanage Dropdown */}
              {donationType === "Donate directly to a specific orphanage" && (
                <div className="col-span-2 md:col-span-1 relative">
                  <label className="block text-[#77000E] font-semibold mb-2">
                    Select Orphanage:
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setOrphanageDropdownOpen(!orphanageDropdownOpen)
                    }
                    className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                  >
                    {orphanage || "Choose orphanage"}
                  </button>
                  {orphanageDropdownOpen && (
                    <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                      {orphanages.map((opt, idx) => (
                        <li
                          key={idx}
                          className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                          onClick={() => {
                            setOrphanage(opt);
                            setOrphanageDropdownOpen(false);
                          }}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Payment Method */}
              <div className="col-span-2 md:col-span-1 relative">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Payment Method:
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setPaymentDropdownOpen(!paymentDropdownOpen)
                  }
                  className="block w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D] text-left"
                >
                  {paymentMethod || "Select payment method"}
                </button>
                {paymentDropdownOpen && (
                  <ul className="absolute w-full bg-[#FCF6F5] border border-[#990011] rounded-lg shadow-lg z-10">
                    {paymentMethods.map((m, idx) => (
                      <li
                        key={idx}
                        className="p-2 hover:bg-[#990011] hover:text-white cursor-pointer"
                        onClick={() => {
                          setPaymentMethod(m);
                          setPaymentDropdownOpen(false);
                        }}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

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
export default DonateMoneyPage;
