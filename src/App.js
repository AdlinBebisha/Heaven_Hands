// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/WelcomeModule/LandingPage";
import LoginPage from "./components/WelcomeModule/LoginPage";
import SignupPage from "./components/WelcomeModule/SignupPage";
import ForgotPasswordPage from "./components/WelcomeModule/ForgotPasswordPage";
import ResetPasswordPage from "./components/WelcomeModule/ResetPasswordPage"

import DonationHistoryPage from "./components/DonorModule/DonationHistoryPage";
import DonorDashboardHome from "./components/DonorModule/DonorDashboardHome";
import Notifications from "./components/DonorModule/Notifications";
import DonateFoodPage from "./components/DonorModule/DonateFoodPage";
import DonateItemsPage from "./components/DonorModule/DonateItemsPage";
import DonateSurplusFoodPage from "./components/DonorModule/DonateSurplusFoodPage";
import DonorProfile from "./components/DonorModule/DonorProfile";
import DonateMoneyPage from "./components/DonorModule/DonateMoneyPage";

import OrphanageDashboardHome from "./components/OrphanageModule/OrphanageDashboardHome";
import AvailableDonationsPage from "./components/OrphanageModule/AvailableDonationsPage";
import ClaimItemsPage from "./components/OrphanageModule/ClaimedItemPage";
import Reports from "./components/OrphanageModule/Reports";
import OrphanProfile from "./components/OrphanageModule/OrphanProfile";
import RequestFoodDonationPage from "./components/OrphanageModule/RequestFoodDonationPage";
import RequestMoneyDonationPage from "./components/OrphanageModule/RequestMoneyDonationPage";

import VolunteerDashboard from "./components/VolunteerModule/VolunteerDashboard";
import VolunteerTasks from "./components/VolunteerModule/VolunteerTasks";
import AvailableVolunteerTasks from "./components/VolunteerModule/AvailableVolunteerTasks";
import VolunteerProfile from "./components/VolunteerModule/VolunteerProfile";


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
      <Route path="/donor-notification" element={<Notifications />} />
      <Route path="/donation-history" element={<DonationHistoryPage />} />
      <Route path="/donate-food" element={<DonateFoodPage />} />
      <Route path="/donate-items" element={<DonateItemsPage />} />
      <Route path="/donate-surplus-food" element={<DonateSurplusFoodPage />} />
      <Route path="/donor-profile" element={<DonorProfile />} />
      <Route path="/donate-money" element={<DonateMoneyPage />} />
      
      {/*Orphange Module*/}
      <Route path="/orphans-dashboard" element={<OrphanageDashboardHome />} />
      <Route path="/available-donation" element={<AvailableDonationsPage />} />
      <Route path="/claim-item" element={<ClaimItemsPage />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/orphan-profile" element={<OrphanProfile />} />
      <Route path="/claim-food" element={<RequestFoodDonationPage />} />
      <Route path="/claim-money" element={<RequestMoneyDonationPage />} />

      {/*Volunteer Module*/}
      <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
      <Route path="/volunteer-tasks" element={<VolunteerTasks />} />
      <Route path="/available-tasks" element={<AvailableVolunteerTasks />} />
      <Route path="/volunteer-profile" element={<VolunteerProfile />} />
    </Routes>
  </Router>
);

export default App;
