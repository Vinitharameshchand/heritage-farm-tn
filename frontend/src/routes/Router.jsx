import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Discover from '../pages/Discover';
import ListingDetail from '../pages/ListingDetail';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/listings/:id" element={<ListingDetail />} />
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
