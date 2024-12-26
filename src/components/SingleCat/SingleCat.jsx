import React, { useState } from "react";

export default function SingleCat({ category }) {
  let { name,image } = category;
  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-4  shadow-md rounded-lg p-2 hover:shadow-xl">
      <div className="upper relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-[350px] object-cover" />
      </div>

      <div className="lower flex flex-wrap flex-col py-3 bg-white"> 
       <h1 className="text-2xl font-bold">{name}</h1>
       </div>
    </div>
  );
}
