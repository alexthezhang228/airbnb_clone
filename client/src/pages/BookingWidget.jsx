import React, { useState } from 'react';
import {differenceInCalendarDays} from "date-fns"
// npm add date-fns
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const BookingWidget = ({place}) => {
  const [checkIn,setCheckIn]=useState('')
  const [checkOut,setCheckOut]=useState('')
  const [numberOfGuests,setNumberOfGuests]=useState(1)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')

  const [redirect,setRedirect]=useState('')

  async function bookNow(){
    const bookingData={place:place._id,checkIn,checkOut,numberOfGuests,numberOfNights,name,email,totalPrice:numberOfNights * place.price}
    const data=await axios.post('/bookings',bookingData)
    setRedirect(true)
  }

  if (redirect){
    console.log(redirect)
    return <Navigate to={'/account/bookings'}></Navigate>
  }

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] '>
    <div className='flex flex-col gap-2'>
      <div>Check-in: {place.checkIn}:00<br /></div>
      <div>Check-out: {place.checkOut}:00<br /></div>
      <div>Max number of guests: {place.maxGuests}</div>
    </div>
    <div className='bg-white shadow-amber-100 flex flex-col p-2 rounded-2xl mt-2 md:mt-1 ' >
      <div className='mb-1 text-center items-center font-bold'>Price: ${place.price}/night</div>
      <div className='border bg-white my-2 flex flex-col '>
        <div className='flex'>
          <div className='px-4 py-2'>
            <label>Check in: </label>
            <input type='date' className='cursor-pointer bg-gray-100' value={checkIn} onChange={(e)=>{setCheckIn(e.target.value)}}></input>
          </div>
          <div className='px-4 py-2'>
            <label>Check out: </label>
            <input type='date' className='cursor-pointer bg-gray-100' value={checkOut} onChange={(e)=>{setCheckOut(e.target.value)}}></input>
          </div>
        </div>
        <div className='px-4 py-2'>
          <label>Number of Guests</label>
          <input 
          className='w-32 bg-gray-100'
          type='number' value={numberOfGuests} onChange={(e)=>{setNumberOfGuests(e.target.value)}}>
          </input>
        </div>
        <div>
        {numberOfNights>0 && (
          <div className='px-4 py-2'>
            <label>Name: </label>
            <input 
            className='bg-gray-100'
            type='text' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
          </div>
        )}
        </div>
        <div>
        {numberOfNights>0 && (
          <div className='px-4 py-2'>
            <label>Email: </label>
            <input 
            className='bg-gray-100'
            type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
          </div>
        )}
        </div>
      </div>
      
      <button 
      onClick={bookNow}
      className='rounded-2xl bg-primary p-1 text-white'>
        Book Now
        {numberOfNights>0 && (
          <span className='ml-2'>${numberOfNights*place.price}</span>
        )}
      </button>
    </div>
  </div>
  )
}

export default BookingWidget