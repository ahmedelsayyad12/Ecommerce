/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './SingleBrand.module.css'

export default function SingleBrand({Brands}) {
  let { name,image } = Brands;
  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 shadow-md rounded-lg p-2 hover:shadow-xl">
      <div className="upper relative overflow-hidden">
        <img src={image} alt={name} className="w-full " />
      </div>

      <div className="lower flex flex-wrap flex-col py-3 bg-white"> 
       <h1 className="text-2xl font-bold">{name}</h1>
       </div>
    </div>
  );
}
