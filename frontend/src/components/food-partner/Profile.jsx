import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";

const Profile = () => {
  const { id } = useParams();

  const [profileData, setProfileData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const partner = response.data.foodPartner || response.data || null;

        setProfileData(partner);

        if (Array.isArray(response.data.foodPartner.foodItems)) {
          setVideos(response.data.foodPartner.foodItems);
        } else {
          setVideos([]);
        }
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        setProfileData(null);
        setVideos([]);
      })
      .finally(() => {
        setLoading(false); // ✅ THIS IS THE KEY LINE
      });
  }, [id]); // ✅ id dependency REQUIRED

  /* ---------------- LOADING STATES ---------------- */

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profileData) {
    return <div className="error">Unable to load profile</div>;
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-pic-section">
          <img
            src={
              profileData.profilePicture ||
              "https://via.placeholder.com/150?text=Restaurant"
            }
            alt="Profile"
            className="profile-picture"
          />
        </div>

        <div className="profile-info-section">
          <h1 className="owner-name">{profileData.name || "Owner Name"}</h1>

          <h2 className="restaurant-name">
            {profileData.contactName || "Restaurant Name"}
          </h2>

          <p className="address">
            {profileData.address || "Address not provided"}
          </p>

          <div className="stats-container">
            <div className="stat">
              <span className="stat-number">{videos.length}</span>
              <span className="stat-label">Videos</span>
            </div>
            <div className="stat">
              <span className="stat-number">{profileData.totalMeals || 0}</span>
              <span className="stat-label">Meals Served</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {profileData.customersServed || 0}
              </span>
              <span className="stat-label">Customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="videos-section">
        <h3 className="videos-title">Videos</h3>

        <div className="videos-grid">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} className="video-card">
                <video
                  className="video-thumbnail"
                  src={video.video}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />
                <p className="video-description">{video.description}</p>
              </div>
            ))
          ) : (
            <p className="no-videos">No videos yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
