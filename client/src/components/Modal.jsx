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
      <nav
        onClick={openModal}
        className="cursor-pointer rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 mx-10"
      >
        {title}
      </nav>
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
