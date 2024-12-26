/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading'
import SingleCart from '../SingleCat/SingleCat'
import SingleCat from '../SingleCat/SingleCat'
import { useQuery } from 'react-query'

export default function Categories() {
  function getCategories() {
   return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data , isError , error ,isLoading} = useQuery({
    queryKey: 'categories',
    queryFn: getCategories,
    staleTime:10000,
  })

    
    if (isLoading){
      return <Loading/>;
      }
  
    return<>
    <h1 className='text-4xl font-bold py-5'>All Categories</h1>
    {isError ? (
      <div className="alert text-white bg-red-400 rounded-xl my-3 px-3 py-5 max-w-md mx-auto">
        {error}
      </div>
    ) : null}
    <div className="grid-row">
      {data?.data.data.map((Category) => {
        return <SingleCat category={Category} />;
      })}
  
    </div>
    </>
}
