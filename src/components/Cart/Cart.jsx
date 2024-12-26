/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
    let {getCart , cartId , setCartId , updateCartItemCount , deletedCartItem , clearCart , setCartUser, cartUser} = useContext(cartContext)
    const [cartItems , setCartItems] = useState([])

    const [isLoading , setIsLoading] = useState(false)
    const [loading , setLoading] = useState(false)

    async function updateCartCount(productId , count) {
      setLoading(true);
      
      let response = await updateCartItemCount(productId , count)
      setCartItems(response.data.data)
      if (count ===0){
        if(response.data.status == 'success'){
          toast.success('Product removed successfully ', {
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
          });}
      }
      setLoading(false)
      
    }

    async function clear() {
      setIsLoading(true);
      
      let response = await clearCart()
      setCartItems(response.data.data)
      setIsLoading(false)
      
    }

    async function remove(productId) {
      setIsLoading(true);
      
      let response = await deletedCartItem(productId )
      setCartItems(response.data.data)
      if(response.data.status == 'success'){
        toast.success('Product removed successfully ', {
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
        });}
      setIsLoading(false)
      
    }

    async function getCartItems() {
      setIsLoading(true)
      let response = await getCart()
      setCartId(response.data.data._id)
      setCartItems(response.data.data)
      localStorage.setItem('cartUser', response?.data.data.cartOwner)
      setCartUser(localStorage.getItem('cartUser'))
      setIsLoading(false)
      
    }
    console.log(cartUser);
    
   useEffect(() => {
     getCartItems()
   
   }, [])
   
   

 
  
  if ( isLoading) return <Loading/>
  

    return (<>
   <div className=" bg-gray-100 pt-20">
  <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    
    <div className="rounded-lg md:w-2/3">
    {/* {cartItems?.products} */}
      {cartItems?.products?.map((product)=>
        <div key={product.product._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={product.product.imageCover} alt={product.product.title} className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0 flex flex-col justify-between text-start">
            <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
            <p className="mt-1 text-md text-gray-700">{product.product.category.name} EGP</p>
            <p className="mt-1 text-md text-gray-700">{product.product.brand.name} EGP</p>
            <p className="mt-1 text-md text-gray-700">{product.price} EGP</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span onClick={()=>updateCartCount(product.product.id , product.count-1 )} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> {loading?<i className="fas fa-spin fa-spinner text-lg"></i>:'-'} </span>
              <span className='px-4'>
              {product.count}
              </span>
              <span onClick={()=>updateCartCount(product.product.id , product.count+1 )}  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> {loading?<i className="fas fa-spin fa-spinner text-lg"></i>:'+'}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">{product.price * product.count} EGP</p>
              <svg onClick={()=>remove(product.product.id )} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </div>
    {/* Sub total */}
    <div className="m-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">{cartItems?.totalCartPrice} EGP</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$0.00</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div >
          <p className="mb-1 text-lg font-bold">{cartItems?.totalCartPrice} EGP</p>
        </div>
      </div>
      <Link to={'/checkOut'}>
      <button className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-white hover:bg-darkPrimary">Check out</button>
      </Link>
      <button onClick={()=>clear()} className="mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-white hover:bg-red-700"> <i className="fa-solid fa-trash me-1"></i>Clear Your Cart </button>
    </div>
  </div>
</div>

    </>
  )
}
