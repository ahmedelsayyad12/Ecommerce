/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading'
import SingleBrand from '../SingleBrand/SingleBrand'
import { useQuery } from 'react-query'

export default function Brands() {

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let{data , isError , error , isLoading} = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    staleTime:10000,
  })

    if (isLoading){
      return <Loading/>;
      }
  
    return <>
    <h1 className='text-4xl font-bold py-5'>All Brands</h1>
    {isError ? (
      <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5 max-w-md mx-auto">
        {error}
      </div>
    ) : null}
    <div className="grid-row">
      
      {data?.data.data.map((Brands) => {
        return <SingleBrand Brands={Brands} />;
      })}
  
    </div>
    </>
  
}
