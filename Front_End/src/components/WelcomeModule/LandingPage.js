import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import Footer from "../Footer";

const LandingPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="bg-[#FCF6F5] text-gray-900">
      {/* Header Section */}
      <header className="p-4 bg-[#990011] text-white flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="container flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img
              src="/assets/Logo.png"
              alt="HeavenHands Logo"
              className="w-10 h-10 mr-3 rounded-full"
            />
            <h1 className="text-2xl font-bold">HeavenHands</h1>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="#about"
              onClick={() => scroll.scrollTo(500)}
              className="px-4 hover:underline"
            >
              About
            </Link>
            <Link
              to="#how-it-works"
              onClick={() => scroll.scrollTo(900)}
              className="px-4 hover:underline"
            >
              How It Works
            </Link>
            <Link
              to="#donate"
              onClick={() => scroll.scrollTo(1200)}
              className="px-4 hover:underline"
            >
              Donate
            </Link>
            <Link
              to="#contact"
              onClick={() => scroll.scrollTo(1600)}
              className="px-4 hover:underline"
            >
              Contact
            </Link>
          </motion.nav>
        </div>
      </header>

      <br />

      {/* Hero Section */}
      <main
        id="about"
        className="bg-[#FCF6F5] py-20 text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container mx-auto"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl font-bold text-[#990011]"
          >
            Share Kindness, Transform Lives
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg mt-4 text-gray-800"
          >
            Join us in making a difference by sharing surplus food, clothes, and
            daily essentials with orphans and NGOs.
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="mt-8 flex justify-center gap-4"
          >
            <Link
              to="/login"
              className="bg-[#990011] text-white px-6 py-3 rounded-lg m-2 hover:bg-[#88000F]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#D94E5D] text-white px-6 py-3 rounded-lg m-2 hover:bg-[#C04050]"
            >
              Sign Up
            </Link>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="mt-8"
          >
            <img
              src="/assets/hero-image.png"
              alt="Helping hands"
              className="w-3/4 h-auto mx-auto rounded-full shadow-lg border-4 border-[#990011]"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </motion.div>
        </motion.div>
      </main>

      <hr className="border-t-4 border-[#990011] w-3/4 mx-auto my-8" />

      {/* About Section */}
      <motion.section
        id="about"
        className="py-16 text-center bg-[#FCF6F5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-6 text-[#990011]">About HeavenHands</h3>
        <p className="text-lg max-w-3xl mx-auto text-gray-800">
          HeavenHands is a platform built with a mission to reduce wastage and
          spread compassion. It serves as a bridge between donors and recipients,
          enabling individuals, families, and organizations to share surplus
          resources, such as food, clothes, and daily essentials, with orphanages,
          NGOs, and people in need.
        </p>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="bg-[#990011] py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-6 text-white">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={fadeIn}
            className="p-6 bg-[#FCF6F5] shadow-lg rounded-lg"
          >
            <h4 className="text-xl font-semibold mb-4 text-[#990011]">1. Register</h4>
            <p className="text-gray-800">
              Create an account to start contributing or receiving help.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="p-6 bg-[#FCF6F5] shadow-lg rounded-lg"
          >
            <h4 className="text-xl font-semibold mb-4 text-[#990011]">2. Choose</h4>
            <p className="text-gray-800">
              Select what you want to donate or claim from the available resources.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="p-6 bg-[#FCF6F5] shadow-lg rounded-lg"
          >
            <h4 className="text-xl font-semibold mb-4 text-[#990011]">3. Share</h4>
            <p className="text-gray-800">
              Coordinate with others to ensure timely distribution and impact.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Donate Section */}
      <motion.section
        id="donate"
        className="py-16 text-center bg-[#FCF6F5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-6 text-[#990011]">
          Make a Difference Today
        </h3>
        <div className="mt-8">
          <img
            src="/assets/donate-image.jpg"
            alt="Donate"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl border border-[#990011]"
            style={{ maxWidth: "200px", height: "auto" }}
          />
        </div>
        <br />
        <p className="text-lg mb-8 text-gray-800">
          Your generosity can change lives. Whether it’s a small contribution or a
          big one, every donation counts.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to=""
            className="bg-[#990011] text-white px-6 py-3 rounded-lg hover:bg-[#88000F]"
          >
            Donate Food
          </Link>
          <Link
            to=""
            className="bg-[#D94E5D] text-white px-6 py-3 rounded-lg hover:bg-[#C04050]"
          >
            Donate Clothes
          </Link>
          <Link
            to=""
            className="bg-[#990011] text-white px-6 py-3 rounded-lg hover:bg-[#88000F]"
          >
            Donate Money
          </Link>
        </div>
      </motion.section>

      <hr className="border-t-4 border-[#990011] w-3/4 mx-auto my-8" />

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="bg-[#FCF6F5] py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-6 text-[#990011]">Get in Touch</h3>
        <p className="text-lg mb-8 text-gray-800">
          Have questions or want to partner with us? Reach out, and we’ll be happy
          to assist!
        </p>
        <Link
          to="/login"
          className="bg-[#990011] text-white px-6 py-3 rounded-lg hover:bg-[#88000F]"
        >
          Join Us
        </Link>
      </motion.section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
