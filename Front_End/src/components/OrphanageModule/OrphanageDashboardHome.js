import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "../Footer";

const OrphanageDashboardHome = () => {
  const actions = [
    {
      text: "View and claim donations available in your vicinity.",
      link: "/available-donation",
      buttonText: "Available Donations",
    },
    {
      text: "Request daily essentials, and other items if needed.",
      link: "/claim-item",
      buttonText: "Request Items",
    },
    {
      text: "Request food if needed.",
      link: "/claim-food",
      buttonText: "Request Food",
    },
    {
      text: "Request financial support for essential needs.",
      link: "/claim-money",
      buttonText: "Request Money",
    },
  ];


  return (
    <div className="bg-[#FCF6F5] min-h-screen flex flex-col">
      <Header title="Orphanage Dashboard" /><br/><br/><br/>
      <main className="flex-grow flex justify-center items-center mt-10">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Welcome to Heaven Hands
          </h2>

          {/* Inspirational Quote Section */}
          <div className="bg-[#FEECEB] p-6 rounded-lg shadow-md mb-8">
            <p className="text-center text-xl font-semibold text-[#990011]">
              "Alone, we can do so little; together, we can do so much." – Helen Keller
            </p>
          </div>

          {/* Quick Actions Section */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Take action to meet your needs and make a difference in your community:
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

export default OrphanageDashboardHome;
