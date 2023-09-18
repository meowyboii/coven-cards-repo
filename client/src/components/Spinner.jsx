import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate(`/${path}`, {
        state: location.pathname,
      }); // Redirect to the desired route after 5 seconds
    }, 5000);

    return () => {
      clearTimeout(timer); // Clean up the timer if the component unmounts
    };
  }, [navigate, location, path]);

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading ? (
        <div className="flex items-center flex-col justify-center">
          <div className="animate-spin rounded-full border-t-4 border-white-500 border-opacity-50 h-16 w-16"></div>
          <p className="text-white text-center">
            {" "}
            You do not have access to this page
            <br />
            Redirecting...
          </p>
        </div>
      ) : (
        <p className="text-white">Redirecting...</p>
      )}
    </div>
  );
};
