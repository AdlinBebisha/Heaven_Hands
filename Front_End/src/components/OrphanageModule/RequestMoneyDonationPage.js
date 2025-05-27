import React, { useState} from "react";
import Header from "./Header";

const RequestMoneyDonationPage = () => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [gpayNumber, setGpayNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!amount || !purpose || !gpayNumber || isNaN(amount) || amount <= 0) {
      alert("Please fill all required fields and ensure the amount is a positive number.");
      return;
    }

    const payload = {
      amount: Number(amount),
      purpose,
      gpayNumber,
      description,
      user_id: user.id,
    };

    try {
      const res = await fetch("http://localhost:8080/api/money-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }

      alert("Request submitted successfully!");
      setAmount("");
      setPurpose("");
      setGpayNumber("");
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

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
        <section className="bg-[#F8E9E9] p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-[#990011] mb-4">
            Request Money Donations
          </h1>
          <p className="text-gray-700">
            At HeavenHands, we strive to connect individuals and organizations with those who are willing to help. Fill out the form below to request financial support. Ensure accurate details for smoother assistance.
          </p>
        </section>
          <h2 className="text-2xl font-semibold text-[#990011] mb-6 text-center">
            Submit Your Request
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Donation Amount */}
              <div>
                <label className="block text-[#77000E] font-semibold mb-2">
                  Donation Amount (in Rupees):
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter the amount needed"
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-[#77000E] font-semibold mb-2">
                  Purpose of Donation:
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g., Education, Medical Aid, Orphanage Renovation"
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                  required
                />
              </div>

              {/* GPay Number */}
              <div className="md:col-span-2">
                <label className="block text-[#77000E] font-semibold mb-2">
                  Orphanage GPay Number:
                </label>
                <input
                  type="text"
                  value={gpayNumber}
                  onChange={(e) => setGpayNumber(e.target.value)}
                  placeholder="Enter the GPay number"
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
                  placeholder="Provide any additional details about your request"
                  className="w-full p-3 border border-[#990011] rounded-lg focus:outline-none focus:ring focus:ring-[#D94E5D]"
                />
              </div>
            </div>

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
        </div><br/><br/>
      </main>
    </div>
  );
};

export default RequestMoneyDonationPage;
