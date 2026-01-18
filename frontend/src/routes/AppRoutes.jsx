import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import FoodPartnerLogin from "./FoodPartnerLogin";
import FoodPartnerRegister from "./FoodPartnerRegister";

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
        <Route path="/" element={<UserLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
