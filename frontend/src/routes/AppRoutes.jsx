import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../components/auth/UserLogin";
import UserRegister from "../components/auth/UserRegister";
import FoodPartnerLogin from "../components/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../components/auth/FoodPartnerRegister";
import Home from "../components/general/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        {/* Food Partner Routes */}
        <Route path="/partner/login" element={<FoodPartnerLogin />} />
        <Route path="/partner/register" element={<FoodPartnerRegister />} />

        {/* Default Route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
