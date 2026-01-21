import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Discover from '../pages/Discover';
import ListingDetail from '../pages/ListingDetail';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import CreatorDashboard from '../pages/CreatorDashboard';
import CreateListing from '../pages/CreateListing';
import ProtectedRoute from '../components/ProtectedRoute';
import TripPlanner from '../pages/TripPlanner';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/listings/:id" element={<ListingDetail />} />
                <Route path="/planner" element={<TripPlanner />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Creator Routes */}
                <Route path="/creator/dashboard" element={
                    <ProtectedRoute allowedRoles={['creator', 'admin']}>
                        <CreatorDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/creator/create" element={
                    <ProtectedRoute allowedRoles={['creator', 'admin']}>
                        <CreateListing />
                    </ProtectedRoute>
                } />
                <Route path="/creator/edit/:id" element={
                    <ProtectedRoute allowedRoles={['creator', 'admin']}>
                        <CreateListing />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
