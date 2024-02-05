import React, { useState, useEffect } from "react";
import "./preloader.css"; // Import your preloader styles

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set the duration of the preloader in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearTimeout(delay); // Cleanup the timeout on component unmount
  }, []);

  return (
    loading && (
      <div className="preloader-container">
        {/* Customize the preloader content and styles */}
        <div className="preloader-spinner"></div>
        {/* <p>Loading...</p> */}
      </div>
    )
  );
};

export default Preloader;
