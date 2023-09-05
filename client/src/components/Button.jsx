import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ buttonProp }) => {
  return (
    <div className="m-5 lg:w-60 md:w-48 sm:w-40 w-1/2">
      <Link to="/download">
        <button>
          <img src={buttonProp} alt="button" />
        </button>
      </Link>
    </div>
  );
};
