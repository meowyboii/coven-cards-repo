import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useSearch } from "../../context/search";
import { Link } from "react-router-dom";

export const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <LayoutMerch>
      <div className="min-h-[80vh] pt-20 justify content-center items-center ">
        <h1 className="text-4xl font-bold mb-10 text-white text-center">
          Search Results
        </h1>
        <h3 className="text-2xl text-white text-center mb-8">
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} Products`}
        </h3>

        <div className="grid grid-cols-4 gap-8 text-white px-40 ">
          {values?.results.map((product) => (
            <Link key={product._id} to={`/merch/product/${product.slug}`}>
              <div className="bg-purple p-4 rounded shadow-md h-[45vh] mb-4 flex justify-center items-center">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full max-h-full object-cover transition-transform transform scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-lg mt-2">{`$${product.price}.00`}</p>
            </Link>
          ))}
        </div>
      </div>
    </LayoutMerch>
  );
};
