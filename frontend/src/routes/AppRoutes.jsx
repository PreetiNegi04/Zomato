import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<h1>User Router</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
