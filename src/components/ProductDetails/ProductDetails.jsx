/* eslint-disable no-unused-vars */
// import React from 'react'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Loading/Loading'
import React from "react";
import Slider from "react-slick";
import SecCatSlider from '../SecCatSlider/SecCatSlider'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { wishListContext } from '../../Context/WishListContext'


export default function ProductDetails() {
  let { id} = useParams()

  let{addWish , wishList }=useContext(wishListContext)
  let { addProductToCart } = useContext(cartContext);


  const [loading, setLoading] = useState(false)
  const [isClick , setIsClick] =useState(false)
  const [brand, setBrand] = useState({})
  const [category, setCategory] = useState({})
  const [productDetails, setProductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [IsFav , setIsFav] =useState(false)

  async function handleAddToCart(productId) {
    setIsLoading(true);
    let response = await addProductToCart(productId)
    if(response.data.status == 'success'){
      toast.success(response.data.message, {
        style: {
          color:'white',
          background: 'rgb(1, 133, 76)',
          fontWeight:'700'
        },
      })
    }else{
      toast.error(response.data.message, {
        style: {
          color:'white',
          background: 'rgb(1, 133, 76)',
          fontWeight:'700'
        },
      })
    }
    setIsLoading(false)
    console.log(response);
    
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    
  }
    

    function getSpecificProduct(id){
      setLoading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res)=>{
        console.log(res.data.data);
        setProductDetails(res.data.data)
        setBrand(res.data.data.brand)
        setCategory(res.data.data.category)
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err);
        
      })
    }

    async function handelAddWish(productId) {
      let response = await addWish(productId)
      if(response.data.status == 'success'){
        toast.success(response.data.message, {
          style: {
            color:'white',
            background: 'rgb(1, 133, 76)',
            fontWeight:'700'
          },
        });
        
      }else{
        toast.error(response.data.message, {
          style: {
            color:'white',
            background: 'rgb(1, 133, 76)',
            fontWeight:'700'
          },
        })
      }
      
    }
    
  
    function checkWishId(id){
     wishList?.data?.map((item)=>{
          if(item._id == id){
            setIsFav(true)
            
          }
      })
     
          }
          
    
          useEffect(()=>{
            getSpecificProduct(id)
            checkWishId(id)
            
      
          } ,[id])
    if (loading){
      return <Loading/>;
      }
    return (
    <>
    <div className="container flex flex-wrap items-center py-10">
      <div className='w-full md:w-5/12 '>
        <div className="inner">
        <Slider {...settings} className='py-10'>
          {productDetails?.images?.map((images)=>{
            return <img src={images} alt={productDetails.title} className='w-full h-[350px] object-contain'/>
          })}

        </Slider>
        </div>
      </div>
      <div className="w-full md:w-7/12 text-start ">
          <h2 className='text-2xl text-black font-semibold'>{productDetails.title}</h2>
          <p className='text-gray-500 p-4'>{productDetails.description}</p>  
          <p className='text-black'>{brand.name}</p>
          <p className='text-black'>{category.name}</p>
            <div className="flex justify-between text-md text-black my-4">
                    <p>{productDetails.price} EGP</p>
                    <p>
                      {productDetails.ratingsAverage} <i className="fa-solid fa-star text-rating"></i>
                    </p>
              </div>
          <div className='flex  justify-around items-center'>
          <div className='w-3/4'>
          <button onClick={()=>handleAddToCart(id)} className='btn-primary w-full '> 
          {isLoading?<i className="fas fa-spin fa-spinner text-xl"></i>:<><i className='fa-solid fa-cart-shopping  cursor-pointer mx-4'></i>
              Add To Cart</>}
            </button>
          </div>
          <div className="heart-icon " onClick={()=>setIsClick(!isClick)}>
        {
          isClick || IsFav ? <i className="fa-solid fa-heart text-3xl text-red-500 cursor-pointer
          "></i> : <i onClick={()=>handelAddWish(id)} className="fa-solid fa-heart text-3xl text-gray-500 cursor-pointer
          "></i>
        }
      
       </div>
          </div>
      </div>
    </div>

    <SecCatSlider/>
    
    </>
  )
}
