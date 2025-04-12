import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Header from "./Header";

const DonateSurplusFoodPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [orphanages, setOrphanages] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Fetch user's current location
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyOrphanages(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to access location. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Fetch nearby orphanages using Google Places API
  const fetchNearbyOrphanages = (lat, lng) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: 5000, // Search within 5km radius
      type: "orphanage",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const mappedOrphanages = results.map((place) => ({
          name: place.name,
          location: place.geometry.location,
        }));
        setOrphanages(mappedOrphanages);
      } else {
        setError("No nearby orphanages found.");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || !userLocation) {
      alert("Please fill all fields and allow location access.");
      return;
    }

    alert(
      `Donation successful! ${quantity} units of food will be donated to the nearest orphanage.`
    );
    
    console.log({
      quantity,
      userLocation,
      orphanages,
    });
  };

  if (!isLoaded) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <Header/><br/>
      <div className="max-w-3xl mx-auto bg-white border border-[#990011] shadow p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">Donate Surplus Food</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#77000E] font-semibold mb-1">
              Quantity (in units)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity of food"
              className="w-full border border-[#990011] rounded p-2 focus:outline-none focus:ring focus:ring-[#990011]"
              required
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={fetchUserLocation}
              className="w-full p-2 bg-[#990011] text-white rounded-md hover:bg-[#7B0010]"
            >
              Find Nearest Orphanage
            </button>
          </div>

          {userLocation && orphanages.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#990011]">
                Nearest Orphanages
              </h3>
              <ul className="list-disc pl-6">
                {orphanages.map((orphanage, index) => (
                  <li key={index}>
                    {orphanage.name} (Lat: {orphanage.location.lat()},
                    Lng: {orphanage.location.lng()})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <p className="text-[#990011]">{error}</p>}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full p-2 bg-[#990011] text-white rounded-md hover:bg-[#7B0010]"
            >
              Donate Now
            </button>
          </div>
        </form>

        {userLocation && (
          <div className="mt-6">
            <GoogleMap
              center={userLocation}
              zoom={14}
              mapContainerStyle={{ width: "100%", height: "400px" }}
            >
              <Marker position={userLocation} label="You" />
              {orphanages.map((orphanage, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: orphanage.location.lat(),
                    lng: orphanage.location.lng(),
                  }}
                  label={orphanage.name}
                />
              ))}
            </GoogleMap>
          </div>
        )}
      </div><br/>
    </div>
  );
};

export default DonateSurplusFoodPage;
