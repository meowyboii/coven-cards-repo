import React from "react";
import { Layout } from "../../components/Layout";

export const CategoryForm = ({ handleSubmit, value, setValue, buttonName }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <input
            type="text"
            id="categoryName"
            className=" bg-slate-800 px-4 py-2 border rounded-md text-white w-3/4 "
            placeholder="Enter category name"
            value={value}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler"
          >
            {buttonName}
          </button>
        </div>
      </form>
    </div>
  );
};
