import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function ShowNavbar({ children }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/quiz" || location.pathname === "/profile") {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [location]);

  return <>{showNavbar && children}</>;
}

ShowNavbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ShowNavbar;
