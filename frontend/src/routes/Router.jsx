import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import ListingDetail from "../pages/ListingDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreatorDashboard from "../pages/CreatorDashboard";
import CreateListing from "../pages/CreateListing";
import ProtectedRoute from "../components/ProtectedRoute";
import TripPlanner from "../pages/TripPlanner";
import HeritageVision from "../pages/HeritageVision";
import DiscoveryMap from "../pages/DiscoveryMap";
import JourneyBuilder from "../pages/JourneyBuilder";
import GovAnalytics from "../pages/GovAnalytics";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discovery-map" element={<DiscoveryMap />} />
        <Route path="/journey-builder" element={<JourneyBuilder />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/planner" element={<TripPlanner />} />
        <Route path="/heritage-vision/:id" element={<HeritageVision />} />
        <Route path="/analytics" element={<GovAnalytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Creator Routes */}
        <Route
          path="/creator/dashboard"
          element={
            <ProtectedRoute allowedRoles={["creator", "admin"]}>
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/create"
          element={
            <ProtectedRoute allowedRoles={["creator", "admin"]}>
              <CreateListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["creator", "admin"]}>
              <CreateListing />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
