// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
export default function Navbar() {
  let{numOfCartItems}=useContext(cartContext)
  let{numOfWishList}=useContext(wishListContext)
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()
  let {Token,setToken} = useContext(userContext)
  function LogOut(){
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/login')

  }
  
  return (
    <>
      <nav className="bg-slate-100 shadow-sm border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
        <div className="flex flex-wrap  justify-between items-center w-full p-4">
          <div className="leftSide flex justify-between items-center gap-5">
            <Link to="/">
              <img width={130} src={logo} className="h-8"  />
            </Link>
            
            <ul className="lg:flex hidden  gap-3  ms-auto pl-3">
              {Token !==null?<>
              <li>
                <NavLink to="/"> Home</NavLink>
              </li>
              <li>
                <NavLink to="products"> Products</NavLink>
              </li>
              
              <li>
                <NavLink to="categories"> Categories</NavLink>
              </li>
              {/* <li>
                <NavLink to="brands"> Brands</NavLink>
              </li> */}
              <li>
                <NavLink to="allorders"> Orders</NavLink>
              </li>
              </>:null}
            </ul>
            
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
          
          <ul className="flex gap-3">
              {Token ==null?<>
                <li>
                    <NavLink to="login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="signup">SignUp</NavLink>
                  </li>
              </>:<>
              <div className="relative">
          <i onClick={()=>navigate('/wishlist')} className="fa-solid fa-heart text-2xl md:text-2xl cursor-pointer"></i>
          <span className="absolute top-[-10px] right-[-10px] rounded-lg size-4 text-sm flex justify-center items-center text-white bg-red-500">{numOfWishList}</span>
          </div>
          <div className="relative">
          <i onClick={()=>navigate('/cart')} className="fa-solid fa-cart-shopping text-2xl md:text-2xl cursor-pointer "></i>
          <span className="absolute top-[-10px] right-[-10px] rounded-lg size-4 text-sm flex justify-center items-center text-white bg-red-500">{numOfCartItems}</span>
          </div>
              <li onClick={LogOut} className="cursor-pointer">
                    <span>Log Out</span>
                  </li>
              </>}
                  
                  
            </ul>
            <ul className="hidden lg:flex gap-3">
              <li>
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="fa-brands hover:-translate-y-1 duration-300 fa-facebook text-[#0866ff] "></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="hover:-translate-y-1 duration-300 text-[#ff115b]  fa-brands fa-instagram "></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com">
                  <i className="fa-brands hover:-translate-y-1 duration-300 fa-linkedin text-[#0a66c2]"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.twitter.com">
                  <i className="fa-brands hover:-translate-y-1 duration-300 fa-x-twitter text-black"></i>
                </a>
              </li>
            </ul>
            
            
          <div onClick={()=>setIsOpen(!isOpen)} className=' cursor-pointer lg:hidden btn'>
                {
                    isOpen ? <i className="fa-solid fa-xmark text-3xl"></i> :<i className="fa-solid fa-bars text-3xl"></i>
                }
                
                </div>
        </div>
          </div>
          <div>
          {isOpen ? (
            <div className="flex flex-col justify-end items-start gap-4 py-3 ">
                <ul className={`lg:hidden  gap-5  pl-3 lg:pl-10 flex flex-col justify-start items-start ` }>
                
                         
                {Token !==null?<>
              <li>
                <NavLink to="/"> Home</NavLink>
              </li>
              <li>
                <NavLink to="products"> Products</NavLink>
              </li>
              
              <li>
                <NavLink to="categories"> Categories</NavLink>
              </li>
              <li>
                <NavLink to="brands"> Brands</NavLink>
              </li>
              <li>
                <NavLink to="allorders"> Orders</NavLink>
              </li>
              
              </>:null}
            </ul>
            <ul className="lg:hidden flex  gap-5  pl-3 lg:pl-10">
              <li>
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="fa-brands hover:-translate-y-1 duration-300 fa-facebook text-[#0866ff] "></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="hover:-translate-y-1 duration-300 text-[#ff115b]  fa-brands fa-instagram "></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com">
                  <i className="fa-brands hover:-translate-y-1 duration-300 fa-linkedin text-[#0a66c2]"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.twitter.com">
                  <i className="fa-brands hover:-translate-y-1 duration-300 fa-x-twitter text-black"></i>
                </a>
              </li>
            </ul>
            </div>
            ): null}
          </div>
      </nav>
    </>
  );
}
