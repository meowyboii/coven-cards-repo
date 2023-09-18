import React, { useState } from "react";

export const Modal = ({ title, children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 mx-2"
        onClick={openModal}
      >
        {title}
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <span
            className="fixed inset-0 flex items-center justify-center bg-black opacity-50"
            onClick={closeModal}
          ></span>
          <div className="z-10 bg-white p-8 rounded-lg shadow-md w-96 w-full sm:w-96 ">
            <div className="flex justify-end">
              <button className="hover:text-gray-800" onClick={closeModal}>
                &#x2715;
              </button>
            </div>

            <h2 className="text-center text-2xl font-semibold mb-4">
              {children}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
