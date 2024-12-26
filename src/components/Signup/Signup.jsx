/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Signup.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    let {setToken}= useContext(userContext)    
    
    let navigate = useNavigate()

    useEffect(()=>{} ,[])
  async  function handleSubmit(values){
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    .then((res)=>{
      console.log(res);
      setLoading(false)
      if (res.data.message == 'success')
        navigate('/')
      localStorage.setItem('userToken',res.data.token)
      setToken(res.data.token)
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false)
      setError(err.response.data.message)
    })
    }
    function validationSchema(){
      return yup.object().shape({
        name: yup.
        string('enter your name')
        .required('name is required')
        .min(3,'name must be at least 3 characters'),
        email: yup
        .string('enter your email')
        .email('email is not valid')
        .required('email is required'),
        password: yup
        .string('enter your password')
        .required('password is required')
        .min(6,'password must be at least 6 characters'),
        rePassword: yup.string()
        .required('rePassword is required')
        .oneOf([yup.ref('password')],'password s do not match'),
        phone:yup
        .string()
        .matches(/^01[0125][0-9]{8}$/, "phone is not valid")
        .required("phone is required"),
      })
    }
    let formik = useFormik({
      initialValues: 
        {
          "name": "",
          "email":"",
          "password":"",
          "rePassword":"",
          "phone":""
      },
      validationSchema,
      onSubmit: handleSubmit,
      

    })
    return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Registration</h1>
      {error ? (
        <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5 max-w-md mx-auto">
          {error}
        </div>
      ) : null}
      <form className='max-w-lg mx-auto my-5 flex flex-col w-full'
      onSubmit={formik.handleSubmit}>

   <div className="relative my-3">
  <input type="text" 
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  value={formik.values.name}
  id="userName" 
  name='name'
  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
  <label 
  htmlFor="userName" 
  
  className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Name</label>
</div>
{formik.errors.name && formik.touched.name ? (
          <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
            {formik.errors.name}
          </div>
        ) : (
          ""
        )}

   <div className="relative my-3">
  <input type="email" 
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  value={formik.values.email}
  id="email" 
  name='email'
  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
  <label 
  htmlFor="email" 
  
  className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Email</label>
</div>
{formik.errors.email && formik.touched.email ? (
          <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}

   <div className="relative my-3">
  <input type="password" 
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  value={formik.values.password}
  id="password" 
  name='password'
  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
  <label 
  htmlFor="password" 
  
  className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Password</label>
</div>
{formik.errors.password && formik.touched.password ? (
          <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}

   <div className="relative my-3">
  <input type="password" 
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  value={formik.values.rePassword}
  id="rePassword" 
  name='rePassword'
  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
  <label 
  htmlFor="rePassword" 
  
  className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">RePassword</label>
</div>
{formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
            {formik.errors.rePassword}
          </div>
        ) : (
          ""
        )}

   <div className="relative my-3">
  <input type="tel" 
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  value={formik.values.phone}
  id="userPhone" 
  name='phone'
  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
  <label 
  htmlFor="userPhone" 
  
  className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User Phone</label>
</div>
{formik.errors.phone && formik.touched.phone ? (
          <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
            {formik.errors.phone}
          </div>
        ) : (
          ""
        )}

<div className='self-start my-5'>
<button
          type="submit"
          className="text-white bg-primary hover:bg-darkPrimary focus:ring-4 focus:outline-none focus:ring-lightPrimary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary  d"
        >
          {loading ? (
            <i className="fas fa-spin fa-spinner text-xl"></i>
          ) : (
            "Register"
          )}
        </button>
        <span className="text-primary mx-6">
        already have an account?
      <Link to="/signUp" className="text-darkPrimary mx-2 font-semibold">
        Log in
      </Link>

        </span>

        
</div>
    </form>
    </>
  )
}
