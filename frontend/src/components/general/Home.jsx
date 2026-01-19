import { useState, useRef, useEffect } from "react";
import "../styles/home-reels.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import { GoCommentDiscussion } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState([]);

  const reelsContainerRef = useRef(null);
  const isSnappingRef = useRef(false);
  const videoRefs = useRef([]);

  /* 🔹 Scroll index update */
  const handleScroll = (e) => {
    if (isSnappingRef.current || videos.length === 0) return;

    const container = e.target;
    const scrollHeight = container.scrollHeight / videos.length;
    const index = Math.round(container.scrollTop / scrollHeight);

    if (index !== currentIndex) {
      setCurrentIndex(Math.max(0, Math.min(index, videos.length - 1)));
    }
  };

  /* 🔹 Snap logic */
  const snapToVideo = (index) => {
    if (!reelsContainerRef.current || videos.length === 0) return;

    isSnappingRef.current = true;
    const scrollHeight = reelsContainerRef.current.scrollHeight / videos.length;

    reelsContainerRef.current.scrollTo({
      top: scrollHeight * index,
      behavior: "smooth",
    });

    setTimeout(() => {
      isSnappingRef.current = false;
      setCurrentIndex(index);
    }, 600);
  };

  /* 🔹 Wheel handler */
  useEffect(() => {
    const container = reelsContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isSnappingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(
        0,
        Math.min(currentIndex + direction, videos.length - 1),
      );

      if (nextIndex !== currentIndex) {
        snapToVideo(nextIndex);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentIndex, videos.length]);

  /* 🔹 VIDEO PLAY / PAUSE CONTROL (THIS FIXES IT) */
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentIndex, videos]);

  /* 🔹 FETCH FOOD DATA */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", {
        withCredentials: true,
      })
      .then((response) => {
        let food = response.data.foodItems;

        if (!Array.isArray(food)) {
          food = food ? [food] : [];
        }

        food = food.filter(
          (item) => item && typeof item === "object" && item.video,
        );

        setVideos(food);
      })
      .catch((error) => {
        console.error("Food fetch error:", error);
        setVideos([]);
      });
  }, []);

  return (
    <>
      <div
        className="reels-container"
        ref={reelsContainerRef}
        onScroll={handleScroll}
      >
        {videos.map((video, index) => (
          <div key={video._id} className="reel">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="reel-video"
              src={video.video}
              loop
              muted
              playsInline
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-content">
                <p className="reel-description">{video.description}</p>
                <Link
                  to={`/food-partner/${video.foodPartner}`}
                  className="visit-store-btn"
                >
                  Visit Store
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="reel-actions">
                <button className="reel-action-btn" title="Like">
                  <span className="action-icon"><IoIosHeartEmpty /></span>
                  <span className="action-text">Like</span>
                </button>
                <button className="reel-action-btn" title="Save">
                  <span className="action-icon"><IoBookmarkOutline /></span>
                  <span className="action-text">Save</span>
                </button>
                <button className="reel-action-btn" title="Comment">
                  <span className="action-icon"><GoCommentDiscussion /></span>
                  <span className="action-text">Comment</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNavigation />
    </>
  );
};

export default Home;
