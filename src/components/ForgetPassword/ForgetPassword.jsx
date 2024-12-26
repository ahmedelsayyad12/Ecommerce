/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {}, []);
  async function handleSubmit(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        console.log(res.data.statusMsg);
        if (res.data.statusMsg === 'success'){
            navigate('/verifyCode')
        }
        
        setLoading(false);
           
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message);
      });
  }
  function validationSchema() {
    return yup.object().shape({
      email: yup
        .string("enter your email")
        .email("email is not valid")
        .required("email is required"),
     
    });
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Forget Password</h1>
      {error ? (
        <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5 max-w-md mx-auto">
          {error}
        </div>
      ) : null}
      <form
        className="max-w-lg mx-auto my-5 flex flex-col w-full"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative my-3">
          <input
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            name="email"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none  focus:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-primary  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus::text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            User Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}

        <div className="self-start my-5">
          <button
            type="submit"
            className="text-white bg-primary hover:bg-darkPrimary focus:ring-4 focus:outline-none focus:ring-lightPrimary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary  d"
          >
            {loading ? (
              <i className="fas fa-spin fa-spinner text-xl"></i>
            ) : (
              "Send Code"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
