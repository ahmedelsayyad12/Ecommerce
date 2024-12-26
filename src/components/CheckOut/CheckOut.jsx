/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function CheckOut() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
 let {checkOut , cartId } = useContext(cartContext)


 let formik = useFormik({
    initialValues: 
      {
        "details":"",
        "phone":"",
        "city":"",
    },
    validationSchema,
    onSubmit:()=> handleCheckOut(cartId , 'http://localhost:5174'),
    

  })

async  function handleCheckOut(cartId , url){
  let response=  await checkOut(cartId , url, formik.values);
  if(response.status === 200){
    toast.success(response.data.message, {
        style: {
          color: "rgb(1, 133, 76)",
          fontWeight: "700",
        },
      });
  }
  if(response.data.status === 'success'){
    window.location.href = response.data.session.url
  }
  console.log(response);
  
  }
  function validationSchema(){
    return yup.object().shape({
        details: yup
        .string('enter your details')
        .required('details is required')
        .min(3,'details must be at least 8 characters'),
        city: yup
        .string('enter your city')
        .required('city is required')
        .min(3,'city must be at least 3 characters'),
      phone:yup
        .string()
        .matches(/^01[0125][0-9]{8}$/, "phone is not valid")
        .required("phone is required"),
    })
  }

  return (
  <>
    <h1 className="text-center text-2xl font-bold my-4">Check Out</h1>
    
    <form className='max-w-lg mx-auto my-5 flex flex-col w-full'
    onSubmit={formik.handleSubmit}>


 <div className="relative my-3">
<input type="text" 
onBlur={formik.handleBlur}
onChange={formik.handleChange}
value={formik.values.details}
id="details" 
name='details'
className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-primary bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
<label 
htmlFor="details" 

className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User details</label>
</div>
{formik.errors.details && formik.touched.details ? (
        <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
          {formik.errors.details}
        </div>
      ) : (
        ""
      )}

<div className="relative my-3">
<input type="text" 
onBlur={formik.handleBlur}
onChange={formik.handleChange}
value={formik.values.city}
id="city" 
name='city'
className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-primary bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
<label 
htmlFor="city" 

className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User city</label>
</div>
{formik.errors.city && formik.touched.city ? (
        <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
          {formik.errors.city}
        </div>
      ) : (
        ""
      )}
 <div className="relative my-3">
<input type="tel" 
onBlur={formik.handleBlur}
onChange={formik.handleChange}
value={formik.values.phone}
id="phone" 
name='phone'
className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-primary bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer" placeholder=" " />
<label 
htmlFor="phone" 

className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">User phone</label>
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
          "Pay Now"
        )}
      </button>

        
</div>
  </form>
  </>
)
}
