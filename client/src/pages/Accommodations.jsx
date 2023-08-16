/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-10 22:45:00
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 21:04:05
 * @FilePath: /airbnb_clone/client/src/pages/Accommodations.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import {AiOutlinePlus}  from 'react-icons/ai'

import Header from './Header';
import AccountNav from './AccountNav';
import axios from 'axios';

const Accommodations = () => {
  const [places,setPlaces]=useState([])

  useEffect(()=>{
    axios.get('/user-places').then((data)=>{
      setPlaces(data.data)
    })
  },[])
  
  return (
    <div>
      <Header/>
      <AccountNav></AccountNav>  
      <div>
        <div className='text-center'>
          <Link 
          to={'/account/accommodations/new'}
          className='bg-primary rounded-full text-white px-6 py-2 inline-flex gap-1 items-center'>
            <AiOutlinePlus/> Add new address
          </Link>
        </div>
      <div className='mt-4 p-4 '> 
          {places.length>0 && places.map(place=>{
            return (
              <Link to={'/account/accommodations/'+place._id} key={place._id} className='flex'>
              <div className='bg-gray-100 rounded-2xl flex p-4 gap-4  mb-2 cursor-pointer w-full'>
                <div  className='w-32 h-32 bg-gray-300 grow-0 shrink-0'>
                  {place.photos.length>0  && 
                    <img 
                    className='h-full w-full'
                    src={'http://localhost:4000/uploads/'+place.photos[0]} alt='photo'/>
                  }
                </div>
                <div className='grow-0 shrink'>
                  <h2 className='text-xl'>{place.title}</h2>
                  <p className='text-sm mt-2 '>{place.description}</p>
                </div>
                
              </div>
              </Link>
            )
          })}
      </div>
      </div>
            
    </div>
  )
}

export default Accommodations