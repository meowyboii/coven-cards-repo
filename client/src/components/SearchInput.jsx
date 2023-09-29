import React from "react";
import { useSearch } from "../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, keyword: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate(`/merch/search/${values.keyword}`);
    } catch (error) {
      console.log(error);
      toast.error("Error in searching");
    }
  };

  return (
    <div className="flex justify-center items-center mx-2 sm:mx-4 lg:mx-6">
      <form onSubmit={handleSearch} role="search">
        <input
          type="search"
          placeholder="Search..."
          className="py-2 px-3 w-40 sm:w-48 lg:w-80 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 mr-5 w-3/4 font-normal text-black"
          value={values.keyword}
          onChange={handleInputChange}
        />
        <button
          className="mt-2 mr-3 sm:mt-3 lg:mt-2 sm:mr-4 lg:mr-3 bg-purple text-white hover:bg-purpler my-2 py-2 px-4 rounded-full cursor-pointer focus:outline-none"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};
