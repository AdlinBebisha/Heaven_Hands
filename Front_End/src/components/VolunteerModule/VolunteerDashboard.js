import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "../Footer";

const VolunteerDashboard = () => {
  const actions = [
    {
      text: "Claim and help to transport donations in your vicinity.",
      link: "/available-tasks",
      buttonText: "Available Tasks",
    },
    {
      text: "Review tasks you have accepted and are currently in process.",
      link: "/claimed-task",
      buttonText: "Accepted Tasks",
    },
  ];

  return (
    <div className="bg-[#FCF6F5] min-h-screen flex flex-col">
      <Header title="Volunteer Dashboard" /><br/><br/><br/>
      <main className="flex-grow flex justify-center items-center mt-10">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Welcome to Heaven Hands
          </h2>

          {/* Inspirational Quote Section */}
          <div className="bg-[#FEECEB] p-6 rounded-lg shadow-md mb-8">
            <p className="text-center text-xl font-semibold text-[#990011]">
              "The best way to find yourself is to lose yourself in the service of others." – Mahatma Gandhi
            </p>
          </div>

          {/* Quick Actions Section */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Take action to support our mission and help the community:
          </h3>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {actions.map((action, index) => (
              <div
                key={index}
                className="bg-[#FCF6F5] p-6 rounded-lg shadow-md border border-[#990011] transition-transform transform hover:scale-105"
              >
                <p className="text-gray-700 mb-4">{action.text}</p>
                <Link
                  to={action.link}
                  className="block w-full text-center bg-[#990011] text-white font-semibold py-3 rounded-lg hover:bg-[#77000E] transition"
                >
                  {action.buttonText}
                </Link>
              </div>
            ))}
          </section>
        </div>
      </main><br/>
      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
