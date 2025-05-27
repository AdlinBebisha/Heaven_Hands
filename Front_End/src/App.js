// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/WelcomeModule/LandingPage";
import LoginPage from "./components/WelcomeModule/LoginPage";
import SignupPage from "./components/WelcomeModule/SignupPage";
import ForgotPasswordPage from "./components/WelcomeModule/ForgotPasswordPage";
import ResetPasswordPage from "./components/WelcomeModule/ResetPasswordPage"

import DonorDashboardHome from "./components/DonorModule/DonorDashboardHome";
import RequestedDonationPage from "./components/DonorModule/RequestedDonationPage";
import DonateFoodPage from "./components/DonorModule/DonateFoodPage";
import DonateItemsPage from "./components/DonorModule/DonateItemsPage";
import DonorProfile from "./components/DonorModule/DonorProfile";
import DonateMoneyPage from "./components/DonorModule/DonateMoneyPage";

import OrphanageDashboardHome from "./components/OrphanageModule/OrphanageDashboardHome";
import AvailableDonationsPage from "./components/OrphanageModule/AvailableDonationsPage";
import ClaimItemsPage from "./components/OrphanageModule/ClaimedItemPage";
import OrphanProfile from "./components/OrphanageModule/OrphanProfile";
import RequestFoodDonationPage from "./components/OrphanageModule/RequestFoodDonationPage";
import RequestMoneyDonationPage from "./components/OrphanageModule/RequestMoneyDonationPage";

import VolunteerDashboard from "./components/VolunteerModule/VolunteerDashboard";
import VolunteerProfile from "./components/VolunteerModule/VolunteerProfile";
import AvailableTasksPage from "./components/VolunteerModule/AvailableTasksPage";
import ClaimedTasksPage from "./components/VolunteerModule/ClaimedTasksPage";


const App = () => (
  <Router>
    <Routes>

      {/*WelcomeModule*/}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/*DonorModule*/}
      <Route path="/donor-dashboard" element={<DonorDashboardHome />} />
      <Route path="/requested-donation" element={<RequestedDonationPage />} />
      <Route path="/donate-food" element={<DonateFoodPage />} />
      <Route path="/donate-items" element={<DonateItemsPage />} />
      <Route path="/donor-profile" element={<DonorProfile />} />
      <Route path="/donate-money" element={<DonateMoneyPage />} />
      
      {/*Orphange Module*/}
      <Route path="/orphans-dashboard" element={<OrphanageDashboardHome />} />
      <Route path="/available-donation" element={<AvailableDonationsPage />} />
      <Route path="/claim-item" element={<ClaimItemsPage />} />
      <Route path="/orphan-profile" element={<OrphanProfile />} />
      <Route path="/claim-food" element={<RequestFoodDonationPage />} />
      <Route path="/claim-money" element={<RequestMoneyDonationPage />} />

      {/*Volunteer Module*/}
      <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
      <Route path="/volunteer-profile" element={<VolunteerProfile />} />
      <Route path="/available-tasks" element={<AvailableTasksPage />} />
      <Route path="/claimed-task" element={<ClaimedTasksPage />} />
    </Routes>
  </Router>
);

export default App;
