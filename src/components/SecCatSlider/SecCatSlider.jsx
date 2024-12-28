import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

export default function SecCatSlider() {

  let { categoryName } = useParams();

  function related() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data } = useQuery({
    queryKey: ["related", categoryName],
    queryFn: related,
    select: (data) =>
      data.data.data.filter((item) => {
        return item.category.name === categoryName;
      }),
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="py-10">
      {data?.map((data) => {
        return (
          <div>
            <div className="group    p-2 hover:shadow-xl">
              <Link to={`/productDetails/${data.id}/${data.category.name}`}>
                <img src={data.imageCover} className="w-full" />
              </Link>

              <div className="lower flex flex-wrap flex-col text-start">
                <div className="flex justify-between">
                  <div>
                    <h3>{data.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <p>{data.category.name}</p>
                    <p>{data.brand.name}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm mt-4">
                  <p>{data.price} EGP</p>
                  <p>
                    {data.ratingsAverage}{" "}
                    <i className="fa-solid fa-star text-rating"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
