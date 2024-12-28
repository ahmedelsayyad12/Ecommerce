import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function Orders() {
    let [orders , setOrders] = useState([])
    let [data , setData] = useState([])
    let [loading , setLoading] = useState(false)
    
   let {cartUser} =useContext(cartContext)

// let cartUser = localStorage.getItem('cartUser')

function getUserOrders(cartUser){
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartUser}`)
    .then((response)=>{
            setOrders(response)
            setData(response.data.reverse())
            setLoading(false)
            
        }).catch((error)=>{
            console.log(error);
            setLoading(false)
            
        })
    }
    
    useEffect(()=>{
        
        getUserOrders(cartUser)
    },[])

    if(loading){
        return <Loading/>
    }

    return (  <>
        <h1 className="text-4xl font-bold py-5">All Orders</h1>
        {orders?.data?.map((order) => (
                <div key={order.id} className='my-3 border border-gray-300 rounded-md border-solid p-4 bg-white'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='text-gray-400'>Order ID</h2>
                            <h3 className='font-semibold text-gray-900'>#{order.id}</h3>
                        </div>
                        <div>
                            {order.isDelivered ? (
                                <span className='btn-primary inline-block bg-primary me-2 text-sm'>
                                    Delivered
                                </span>
                            ) : (
                                <span className='btn-primary inline-block bg-blue-600 me-2 text-sm'>
                                    under delivery
                                </span>
                            )}
                            {order.isPaid ? (
                                <span className='btn-primary inline-block bg-primary-600 text-sm'>
                                    Paid
                                </span>
                            ) : (
                                <span className='btn-primary inline-block bg-red-600 text-sm'>
                                    not paid
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-12 gap-3'>
                        {order?.cartItems?.map((product) => (
                            <div className='mt-2 rounded-sm p-2 border border-gray-300 border-solid  col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3 2xl:col-span-2 '>
                                <img src={product.product.imageCover} className='w-full h-40 object-cover' alt="" />
                                <div className='text-start'>
                                    <h3 className='font-semibold text-gray-600 my-2'>Quantity  :{product.count}</h3>
                                    <h3 className='font-bold my-2 text-gray-600'>{product.product.title}</h3>
                                    <span className='text-gray-600'>{product.price} EGP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))

        }
    </>
       )
}
