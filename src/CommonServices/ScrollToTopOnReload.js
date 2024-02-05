import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnReload = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // The component doesn't render anything
};

export default ScrollToTopOnReload;
