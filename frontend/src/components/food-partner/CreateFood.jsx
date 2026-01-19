import { useState, useRef } from "react";
import "../styles/create-food.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateFood = () => {
  const formDataRef = useRef({
    name: "",
    description: "",
    video: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formDataRef.current = {
      ...formDataRef.current,
      [name]: value,
    };
    setError("");
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate video file
      if (!file.type.startsWith("video/")) {
        setError("Please select a valid video file");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        // 100MB limit
        setError("Video size must be less than 100MB");
        return;
      }
      formDataRef.current = {
        ...formDataRef.current,
        video: file,
      };
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
      setError("");
      // Trigger re-render to show updated video
      setRenderTrigger((prev) => prev + 1);
    }
  };

  const handleVideoAreaClick = () => {
    document.getElementById("video-input")?.click();
  };

  const handleVideoRemove = () => {
    formDataRef.current = {
      ...formDataRef.current,
      video: null,
    };
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
    setRenderTrigger((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formDataRef.current.name.trim()) {
      setError("Please enter a food name");
      return;
    }
    if (!formDataRef.current.description.trim()) {
      setError("Please enter a description");
      return;
    }
    if (!formDataRef.current.video) {
      setError("Please upload a video");
      return;
    }

    // Handle form submission
    const formData = new FormData();
    formData.append("name", formDataRef.current.name);
    formData.append("description", formDataRef.current.description);
    formData.append("video", formDataRef.current.video);

    const response = await axios.post(
      "http://localhost:3000/api/food",
      formData,
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    navigate(`/food-partner/${response.data.food.foodPartner}`);
    setSuccess("Food item created successfully!");
    setError("");
    // Reset form
    formDataRef.current = {
      name: "",
      description: "",
      video: null,
    };
    setVideoPreviewUrl(null);
    setRenderTrigger((prev) => prev + 1);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleReset = () => {
    formDataRef.current = {
      name: "",
      description: "",
      video: null,
    };
    setError("");
    setSuccess("");
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
    setRenderTrigger((prev) => prev + 1);
  };

  return (
    <div className="create-food-container">
      <div className="create-food-wrapper">
        <div className="create-food-card">
          <div className="create-food-header">
            <h1 className="create-food-title">Create Food Item</h1>
            <p className="create-food-subtitle">
              Add a new delicious food to your menu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="create-food-form">
            {/* Food Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label required">
                Food Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={formDataRef.current.name}
                onChange={handleInputChange}
                placeholder="e.g., Butter Chicken, Biryani..."
                className="form-input"
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label required">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={formDataRef.current.description}
                onChange={handleInputChange}
                placeholder="Describe your food item, ingredients, preparation method, etc..."
                className="form-textarea"
                maxLength={500}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                  marginTop: "4px",
                }}
              >
                {formDataRef.current.description.length}/500 characters
              </p>
            </div>

            {/* Video Upload */}
            <div className="video-upload-group">
              <label className="form-label required">Upload Video</label>
              <div
                className={`video-upload-area ${formDataRef.current.video ? "active" : ""}`}
                onClick={handleVideoAreaClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleVideoAreaClick();
                  }
                }}
              >
                {!formDataRef.current.video ? (
                  <>
                    <div className="video-upload-icon">🎬</div>
                    <div className="video-upload-text">
                      <div className="video-upload-main">
                        Click to upload or drag and drop
                      </div>
                      <div className="video-upload-sub">
                        MP4, WebM or Ogg (Max 100MB)
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="video-upload-icon">✓</div>
                    <div className="video-upload-text">
                      <div className="video-upload-main">Video uploaded</div>
                      <div className="video-upload-sub">
                        {formDataRef.current.video.name}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <input
                type="file"
                id="video-input"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleVideoChange}
                className="file-input-hidden"
                aria-hidden="true"
              />

              {formDataRef.current.video && (
                <div className="video-preview">
                  <div className="video-player-container">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="video-player"
                    />
                  </div>
                  <div className="video-preview-item">
                    <div className="video-preview-info">
                      <div className="video-preview-icon">🎥</div>
                      <div className="video-preview-details">
                        <div className="video-preview-name">
                          {formDataRef.current.video.name}
                        </div>
                        <div className="video-preview-size">
                          {(
                            formDataRef.current.video.size /
                            (1024 * 1024)
                          ).toFixed(2)}{" "}
                          MB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="video-preview-remove"
                      onClick={handleVideoRemove}
                      aria-label="Remove video"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && <div className="error-message">⚠ {error}</div>}

            {/* Success Message */}
            {success && <div className="success-message">✓ {success}</div>}

            {/* Form Buttons */}
            <div className="form-buttons">
              <button
                type="reset"
                className="form-button button-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="form-button button-primary">
                Create Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
