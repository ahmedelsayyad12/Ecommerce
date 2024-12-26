import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleCat from "../SingleCat/SingleCat";
import axios from "axios";

export default function CategorySlider() {
    const [Category, setData] = useState([])

    function getCategories(){
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
      getCategories()
    } ,[])
    var settings = {
        dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
      }
  return (
    <div className="py-10">
    <h1 className="text-start py-2 text-gray-600 text-xl font-bold">Shop Popular categories</h1>
    <Slider {...settings} className="border border-gray-200 border-y-2">
        {Category.map((Category)=>{
            return <div  key={Category._id}>
            <div  className="group   p-2 hover:shadow-xl">
            <div className="upper relative overflow-hidden">
              <img src={Category.image} alt={Category.name} className="w-full  h-[250px] object-cover" />
            </div>
      
            <div className="lower flex flex-wrap flex-col py-3 bg-white"> 
             <h1 className="text-lg text-start font-semibold text-gray-500">{Category.name}</h1>
             </div>
          </div>
            </div>
        })}
    </Slider>
        </div>
  )
}
