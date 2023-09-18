import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Dropdown = ({ options, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {title}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <Link
                key={index}
                to={`/${option.route}`} // Specify the route for each option
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option.option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
