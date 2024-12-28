import React, { useState } from "react";

export default function SingleCat({ category }) {
  let { name,image } = category;
  return (
    <div className="group  w-full md:w-6/12 lg:w-4/12 xl:w-3/12 shadow-md rounded-lg p-2 hover:shadow-xl">
      <div className="upper relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-[350px] object-cover" />
      </div>

      <div className="lower flex flex-wrap flex-col py-3 bg-white"> 
       <h1 className="text-2xl font-bold">{name}</h1>
       </div>
    </div>
  );
}
