import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const VolunteerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [volunteer, setVolunteer] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return savedUser || {
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    availability: "",
    address: "",
    profilePicture: null,
  };
});

  const defaultProfilePicture = "/assets/default-profile.jpg";

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/volunteer-profile/${volunteer.email}`);
        if (response.ok) {
          const data = await response.json();
          setVolunteer(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    if (volunteer.email) {
      fetchProfile();
    }
  }, [volunteer.email]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteer((prev) => ({ ...prev, [name]: value }));
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
      setVolunteer((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/volunteer-profile/${volunteer.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteer),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        localStorage.setItem("userProfile", JSON.stringify(volunteer)); // Update localStorage
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
      <Header title="Volunteer Profile" user={volunteer} />
      <div className="bg-[#FCF6F5] flex justify-center">
        <div className="p-4 max-w-3xl w-full">
          <br />
          <br />
          <main className="p-6 bg-white rounded-lg shadow-md border border-[#990011]">
            <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">Your Profile</h2>
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
                    src={volunteer.profilePicture || defaultProfilePicture}
                    alt="Profile"
                    className="mt-4 w-32 h-32 rounded-full object-cover border border-[#990011] mx-auto"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 ml-4">
                      First Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={volunteer.firstName}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={volunteer.lastName}
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
                      value={volunteer.email}
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
                      name="phone_number"
                      value={volunteer.phone_number}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Availability:
                    </label>
                    <select
                      name="availability"
                      value={volunteer.availability}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="" disabled>
                        Select your availability
                      </option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Address:
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={volunteer.address}
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
                  src={volunteer.profilePicture || defaultProfilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border border-[#990011] mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pl-8">
                  <p>
                    <strong>Name:</strong> {`${volunteer.firstName} ${volunteer.lastName}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {volunteer.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {volunteer.phone_number}
                  </p>
                  <p>
                    <strong>Availability:</strong> {volunteer.availability}
                  </p>
                  <p>
                    <strong>Address:</strong> {volunteer.address}
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

export default VolunteerProfile;
