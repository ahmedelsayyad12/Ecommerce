import React from 'react'
import Slider from "react-slick";
import img2 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import img1 from '../../assets/images/playstation.jpeg'
import slider1 from '../../assets/images/slider-image-3.jpeg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
      }
  return (
    <>
    <div className="row flex flex-wrap">
        <div className="md:w-3/4 w-full">
        <Slider {...settings}>
            <img src={slider1} className='w-full h-[500px]' />
            <img src={slider2} className='w-full h-[500px]' />
        </Slider>
        </div>
        <div className="md:w-1/4 w-full flex md:block">
        <img src={img1} alt="" className='md:w-full w-1/2 h-[250px] object-cover'/>
        <img src={img2} alt=""  className='md:w-full w-1/2 h-[250px] object-cover'/>
        </div>
    </div>
    
    </>
  )
}
