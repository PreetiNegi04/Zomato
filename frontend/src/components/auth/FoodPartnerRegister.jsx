import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";

const FoodPartnerRegister = () => {
  /*const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    agreeTerms: false,
  });*/
  const navigate = useNavigate();
  const ownerName = useRef(null);
  const restaurantName = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const address = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/register",
      {
        name: ownerName.current.value,
        contactName: restaurantName.current.value,
        email: email.current.value,
        phone: phone.current.value,
        address: address.current.value,
        password: password.current.value,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response.data);
    navigate("/create-food");
  };

  /*const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };*/

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍕</div>
            <h1 className="auth-title">Join as Partner</h1>
            <p className="auth-subtitle">Register your restaurant</p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label className="form-label">Restaurant Name</label>
              <input
                type="text"
                ref={restaurantName}
                name="restaurantName"
                className="form-input"
                placeholder="Your Restaurant Name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Owner Name</label>
              <input
                type="text"
                ref={ownerName}
                name="ownerName"
                className="form-input"
                placeholder="Full Name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                ref={email}
                type="email"
                name="email"
                className="form-input"
                placeholder="partner@restaurant.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                ref={phone}
                name="phone"
                className="form-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Restaurant Address</label>
              <input
                type="text"
                ref={address}
                name="address"
                className="form-input"
                placeholder="Street address"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                ref={password}
                name="password"
                className="form-input"
                placeholder="Create a strong password"
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="auth-button"
            >
              Register Restaurant
            </button>
          </form>

          <div className="form-link">
            Already registered? <Link to="/partner/login">Sign in</Link>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">OR</div>
            <div className="divider-line"></div>
          </div>

          <div className="form-link">
            Are you a customer? <Link to="/user/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
