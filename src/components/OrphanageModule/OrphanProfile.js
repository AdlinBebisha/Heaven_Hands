import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const OrphanProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [orphanage, setOrphanage] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return savedUser || {
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    organizationName: "",
    address: "",
    organizationType:"",
    incharge:"",
    profilePicture: null,
  };
});

  const defaultProfilePicture = "/assets/default-orphan.jpg";

  const handleLogout = () => {
    localStorage.removeItem("orphanProfile");
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orphan-profile/${orphanage.email}`);
        if (response.ok) {
          const data = await response.json();
          setOrphanage(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    if (orphanage.email) {
      fetchProfile();
    }
  }, [orphanage.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrphanage((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setOrphanage((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/volunteer-profile/${orphanage.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orphanage),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        localStorage.setItem("userProfile", JSON.stringify(orphanage)); // Update localStorage
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div>
      <Header title="Orphanage Profile" user={orphanage} />
      <div className="bg-[#FCF6F5] flex justify-center">
        <div className="p-4 max-w-3xl w-full">
          <br />
          <br />
          <main className="p-6 bg-white rounded-lg shadow-md border border-[#990011]">
            <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
              Your Profile
            </h2>
            {isEditing ? (
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  <img
                    src={orphanage.profilePicture || defaultProfilePicture}
                    alt="Profile"
                    className="mt-4 w-32 h-32 rounded-full object-cover border border-[#990011] mx-auto"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Organization Name:
                    </label>
                    <input
                      type="text"
                      name="organizationname"
                      value={orphanage.organizationName}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Organization Type:
                    </label>
                    <input
                      type="text"
                      name="organizationtype"
                      value={orphanage.organizationType}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Incharge Name:
                    </label>
                    <input
                      type="text"
                      name="incharge"
                      value={orphanage.incharge}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={orphanage.email}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Contact:
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={orphanage.phone_number}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Address:
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={orphanage.address}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <button
                  onClick={saveProfile}
                  className="mt-6 px-6 py-2 bg-[#990011] text-white font-semibold rounded-lg hover:bg-[#77000E] transition"
                >
                  Save Profile
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={orphanage.profilePicture || defaultProfilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border border-[#990011] mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pl-8">
                  <p>
                    <strong>Organization Name:</strong>{" "}
                    {orphanage.organizationName}
                  </p>
                  <p>
                    <strong>Organization Type:</strong>{" "}
                    {orphanage.organizationType}
                  </p>
                  <p>
                    <strong>Incharge Name:</strong> {orphanage.incharge}
                  </p>
                  <p>
                    <strong>Email:</strong> {orphanage.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {orphanage.phone_number}
                  </p>
                  <p>
                    <strong>Address:</strong> {orphanage.address}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-[#990011] text-white font-semibold rounded-lg hover:bg-[#77000E] transition mr-3"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[#990011] text-white font-semibold rounded-lg hover:bg-[#77000E] transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrphanProfile;
