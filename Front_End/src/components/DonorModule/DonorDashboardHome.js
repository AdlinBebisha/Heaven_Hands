import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "../Footer";

const DonorDashboardHome = () => {
  const actions = [
    {
      text: "Provide clothes, daily essentials, and other items to help those in need.",
      link: "/donate-items",
      buttonText: "Donate Items",
    },
    {
      text: "Contribute fresh, packaged, or non-perishable food to fight hunger in your community.",
      link: "/donate-food",
      buttonText: "Donate Food",
    },
    {
      text: "Support charitable initiatives with financial contributions to make a difference.",
      link: "/donate-money",
      buttonText: "Donate Money",
    },
    {
      text: "Check requests from orphanages and help fulfill their needs.",
      link: "/requested-donation",
      buttonText: "View Requests and Donate",
    },
  ];

  return (
    <div className="bg-[#FCF6F5] min-h-screen flex flex-col">
      <Header title="Donor Dashboard" /><br/><br/><br/>
      <main className="flex-grow flex justify-center items-center mt-10">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg border border-[#990011]">
          <h2 className="text-2xl font-bold text-[#990011] mb-6 text-center">
            Welcome to Heaven Hands
          </h2>

          {/* Inspirational Quote Section */}
          <div className="bg-[#FEECEB] p-6 rounded-lg shadow-md mb-8">
            <p className="text-center text-xl font-semibold text-[#990011]">
              "No one has ever become poor by giving." – Anne Frank
            </p>
          </div>

          {/* Quick Actions Section */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Take action today to make a difference in someone's life:
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

export default DonorDashboardHome;
