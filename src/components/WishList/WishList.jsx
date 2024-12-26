/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './WishList.module.css'
import { wishListContext } from '../../Context/WishListContext'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Loading from '../Loading/Loading'

export default function WishList() {
  let {getWishList ,removeFromList}= useContext(wishListContext)
  let { addProductToCart } = useContext(cartContext);
  


  const [wishList , setWishList] =useState(false)
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  async function getWish() {
    setIsLoading(true);
    let response = await getWishList()
    setWishList(response?.data)
    setIsLoading(false)
    
  }
  async function handleAddToCart(productId) {
    setLoading(true);
    handleRemoveFromList(productId)
    let response = await addProductToCart(productId)
    if(response.data.status == 'success'){
      toast.success(response.data.message, {
        style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      })
    }else{
      toast.error(response.data.message, {
        style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      })
    }
    setLoading(false)
    
  }
  async function handleRemoveFromList(productId) {
    setLoading(true);
    let response = await removeFromList(productId)
    if(response.data.status == 'success'){
      toast.success(response.data.message, {
         style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      })
    }else{
      toast.error(response.data.message, {
         style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      })
    }
    setLoading(false)
    
  }
  useEffect(()=>{
    getWish()
  },[loading])
 
  if(isLoading){
    return <Loading/>
  }

    return (<>
   <h1 className="mb-10 text-center text-2xl font-bold">My Wish List</h1>
   <div className='grid-row py-4'>
   {wishList?.data?.map((product)=>{
      return <div key={product.id} className="group col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 shadow-md rounded-lg p-2 hover:shadow-xl">
      <div className="upper relative overflow-hidden">
        
        
        
        <img src={product.imageCover} alt={product.title} className="w-full" />

        <div className="layer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-4">
          <div onClick={()=>handleAddToCart(product.id)} className="icon translate-y-full opacity-0  group-hover:translate-y-0 duration-500 group-hover:opacity-100  bg-primary text-white rounded-full size-12 flex justify-center items-center hover:bg-darkPrimary">
            {loading?<i className="fas fa-spin fa-spinner text-xl"></i>:<i className="fa-solid fa-cart-shopping text-2xl cursor-pointer "></i>}
          </div>
          <Link to={`/productDetails/${product.id}/${product.category.name}`}>
          <div className="icon translate-y-full opacity-0 group-hover:translate-y-0 duration-500 delay-200 group-hover:opacity-100 bg-primary text-white rounded-full size-12 flex justify-center items-center hover:bg-darkPrimary">
            <i className="fa-solid fa-eye text-2xl cursor-pointer"></i>
          </div>
          </Link>
        </div>
      </div>

      <div className="lower flex flex-wrap flex-col text-start">
       <div className="flex justify-between">
       <div>
       <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>

      <p>{product.category.name}</p>
      <p>{product.brand.name}</p>
       </div>
       <div className="heart-icon" >
        
         <i onClick={()=>handleRemoveFromList(product.id)} className="fa-solid fa-heart text-red-500 text-3xl cursor-pointer
          "></i> 
        
        
       </div>
       </div>

        <div className="flex justify-between items-center text-sm mt-4">
          <p>{product.price} EGP</p>
          <p>
            {product.ratingsAverage} <i className="fa-solid fa-star text-rating"></i>
          </p>
        </div>
      </div>
    </div>
    })}
   </div>
    </>
  )
}
