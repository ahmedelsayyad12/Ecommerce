/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './NotFound.module.css'
import img from '../../assets/images/error.svg'

export default function NotFound() {
    const [data, setData] = useState([])
    useEffect(()=>{} ,[])
    return (
    <div>
      <img src={img} className='w-full ' />
    </div>
  )
}
