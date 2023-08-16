/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-07 17:21:38
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-14 20:33:32
 * @FilePath: /airbnb_clone/client/src/pages/Home.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

const Home = () => {

  const [places,setPlaces]=useState([])
  useEffect(()=>{
    axios.get('/places').then(
      response=>{
        setPlaces(response.data)
      }
    )
  },[])

  return (
    <div>
      <Header></Header>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square w-full h-full" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Home