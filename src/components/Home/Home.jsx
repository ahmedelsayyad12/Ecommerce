/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import SingleProduct from "../SingleProduct/SingleProduct";
import Loading from "../Loading/Loading";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { useQuery } from "react-query";
import { cartContext } from "../../Context/CartContext";

export default function Home() {
  const [search, setSearch] = useState("");
  let {cartUser}=useContext(cartContext)


  let headers = {
    token: localStorage.getItem("userToken"),
  };

  




  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProducts,
  });

  let items = data?.data?.data;
  const getFilteredData = (search, items) => {
    if (!search) {
      return items;
    }
    return items.filter((item) => item?.slug.includes(search));
  };
  const filteredData = getFilteredData(search, items);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isError ? (
        <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5 max-w-md mx-auto">
          {error}
        </div>
      ) : null}

      <MainSlider />
      <CategorySlider />

      <div className="mx-auto max-w-md bg-white py-4">
        <form className="relative mx-auto w-max">
          <input
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>

      <div className="flex flex-wrap py-4">
        {filteredData?.map((Product) => {
          return <SingleProduct Product={Product} key={Product.id} />;
        })}
      </div>
    </>
  );
}
