import React from "react";

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
            className=" bg-white px-4 py-2 border rounded-md text-[#343434] font-main w-[35vh] h-[4.5vh] mb-3"
            placeholder="Enter category name"
            value={value}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler h-[3.9vh]"
          >
            {buttonName}
          </button>
        </div>
      </form>
    </div>
  );
};
