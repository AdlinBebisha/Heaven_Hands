import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "../Footer";

const DonorDashboardHome = () => {  
  return (
    <div className="bg-[#FCF6F5] min-h-screen">
      <Header title="Donor Dashboard"/>
      <main className="max-w-custom-size mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-[#990011]">
        <h2 className="text-2xl text-[#990011] font-bold mb-6">Welcome to Heaven Hands</h2>

        {/* Quick Actions Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {[
            {
              text: "Reduce food waste and hunger by sharing excess edible food with those in need.",
              link: "/donate-surplus-food",
              buttonText: "Donate Surplus Food",
            },
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
          ].map((action, index) => (
            <div
              key={index}
              className="bg-[#FCF6F5] p-6 rounded-lg shadow-lg border border-[#990011]"
            >
              <p className="text-gray-700 mb-2">{action.text}</p>
              <Link
                to={action.link}
                className="block p-6 bg-[#990011] text-white text-center font-bold rounded-lg shadow-md hover:bg-[#77000E] transition"
              >
                {action.buttonText}
              </Link>
            </div>
          ))}
        </section>

        {/* Donation Status and History Section */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
          {[
            {
              title: "Donation History",
              text: "View your donation history",
              link: "/donation-history",
              buttonText: "View Donation History",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#990011]">{item.title}</h2>
              <div className="flex justify-center">
                <Link
                  to={item.link}
                  className="bg-[#990011] text-white px-6 py-3 rounded-lg shadow hover:bg-[#77000d] transition"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
      <br/>
      <Footer />
    </div>
  );
};

export default DonorDashboardHome;
