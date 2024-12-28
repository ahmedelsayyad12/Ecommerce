import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let cartContext = createContext();



export function CartContextProvider(props){
let [numOfCartItems, setNumOfCartItems] = useState(0);
let [cartId, setCartId] = useState(null);
let [cartUser, setCartUser] = useState(null);
      
            let headers = {
                token : localStorage.getItem("userToken")
            }
        
    
    function getCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers
            }).then((response)=>{
                setCartId(response?.data.data._id)
                setCartUser(response?.data?.data?.cartOwner)
                setNumOfCartItems(response.data.numOfCartItems)
                return response
            })
            .catch((error)=>error)
        }
        
        function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId:productId
            },{
                headers
            }).then((response)=>{
                setNumOfCartItems(response.data.numOfCartItems)
                return response
            })
                .catch((error)=>error)
    }

    function updateCartItemCount(productId ,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                count:count
            },{
                headers
            }).then((response)=>response)
                .catch((error)=>error)
    }

    function deletedCartItem(productId ){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers
            }).then((response)=>{
                setNumOfCartItems(response.data.numOfCartItems)
                return response})
                .catch((error)=>error)
    }
    
    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers
            }).then((response)=>{
                setNumOfCartItems(response.data.numOfCartItems)
                return response})
                .catch((error)=>error)
    }
    function checkOut(cartId , url , formValue) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress : formValue
            },
            {
                headers
            }).then((response)=>response)
                .catch((error)=>error)
    }

    useEffect(()=>{
        if(localStorage.getItem('userToken') !==null){
            getCart()
        }
    },[numOfCartItems])
return <cartContext.Provider value={ {getCart ,setCartId,numOfCartItems, addProductToCart ,updateCartItemCount , deletedCartItem , clearCart , checkOut ,cartId , cartUser , setCartUser} }> 
    {props.children}
</cartContext.Provider>
}