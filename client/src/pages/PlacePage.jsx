
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import {AiOutlineClose} from 'react-icons/ai'
import {BiMap} from 'react-icons/bi'
import {HiOutlinePhotograph} from 'react-icons/hi'

import BookingWidget from './BookingWidget'

const PlacePage = () => {
  const {id}=useParams()
  const [place,setPlace]=useState(null)
  const [showAll,setShowAll]=useState(false)

  useEffect(()=>{
    if (!id){
      return
    }
    axios.get(`/places/${id}`).then(response=>{
      setPlace(response.data)
    })
  },[id])

  if (!place) return ''
   
  if (showAll){
    const photos=place.photos
    return (
      <div className='absolute inset-0 bg-white min-h-screen '>
        <h2 className='text-3xl top-2 left-8 relative'>Photos of {place.title}</h2>
        <button 
        className='fixed flex top-2 right-8 gap-1 py-2 px-4 rounded-2xl items-center'
        onClick={()=>setShowAll(false)}>
          <AiOutlineClose className='shadow shadow-black'/>
          <h4 className='px-2'>Close photos</h4>
        </button>
        
        <div  className='p-8 grid gap-4'>
          {photos.map(photo=>{
            return (
              <div key={photo}>
                <img 
                className='h-full w-full'
                src={`http://localhost:4000/uploads/${photo}`}/>
              </div>
            )})}
        </div>
      </div>
    )
  }
  return (
    <div className='mt-4 bg-gray-100 mx-8 px-8 py-8 w-auto '>
      <h1 className='text-3xl'>{place.title}</h1>
      <a className='block font-semibold underline my-4 gap-1' href={`https://www.google.com/maps/place/${place.address}`} target='_blank'>
        <BiMap className='inline'/>{place.address}
      </a>
      
      <div className='grid gap-2 grid-cols-[2fr,1fr]'>
        <div>
          {place.photos?.[0] && (
            <div>
              <img 
              className="h-full w-full object-cover"
              src={'http://localhost:4000/uploads/'+place.photos[0]}></img>
            </div>
          )}
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {place.photos?.[1] && (
            <img 
            className="h-full w-full object-cover"
            src={'http://localhost:4000/uploads/'+place.photos[1]}></img>
          )}
          <div className='relative'>
            {place.photos?.[2] && (
              <>
              <img 
              className="h-full w-full object-cover "
              src={'http://localhost:4000/uploads/'+place.photos[2]} />
              <button 
              className='absolute bottom-1 right-2 rounded-2xl  hover:bg-primary  hover:text-white p-2'
              onClick={()=>setShowAll(true)} >
                
                <HiOutlinePhotograph className='inline mx-1 '/>More photos?</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 mb-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
        <div className="bg-white mx-8 px-8 py-2 my-2 rounded-2xl ">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
    </div>
      </div>
      
    </div>
  )
}

export default PlacePage