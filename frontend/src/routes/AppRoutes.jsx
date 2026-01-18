import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../components/auth/UserLogin";
import UserRegister from "../components/auth/UserRegister";
import FoodPartnerLogin from "../components/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../components/auth/FoodPartnerRegister";
import Home from "../components/general/Home";
import CreateFood from "../components/food-partner/CreateFood";
import Profile from "../components/food-partner/Profile";

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
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
