import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext();


export default function WishListContextProvider(props){
    const [ wishList, setWishList] = useState([]);
    const [numOfWishList , setNumOfWIshList] = useState(0)

    let headers = {
        token : localStorage.getItem("userToken")
    }

    function getWishList() {
     return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers
    })
       .then((response)=>{
        setWishList(response?.data)
        setNumOfWIshList(response.data.count)
        return response
        
       })
       .catch((error)=>{
        console.log(error);
       })
      
    }
    
    
    

    function addWish(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {productId:productId},
            {headers}
        ).then((response)=>{
            setNumOfWIshList(response.data.count)
            return response
        })
        .catch((error)=>error)
    }

    function removeFromList(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {headers}
        ).then((response)=>{
            setNumOfWIshList(response.data.length)
            return response
        }).catch((error)=>error)

    }
    

    useEffect(() => {
        if(localStorage.getItem('userToken') !==null){
            getWishList()
        }
      }, [numOfWishList])

    return <wishListContext.Provider value={ { addWish ,getWishList, wishList ,numOfWishList ,removeFromList} }>
                {props.children}
            </wishListContext.Provider>
}
