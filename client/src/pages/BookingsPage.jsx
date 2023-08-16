/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-16 16:04:23
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 21:02:20
 * @FilePath: /airbnb_clone/client/src/pages/BookingsPage.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import AccountNav from "./AccountNav";
import Header from "./Header";
import PlaceImg from "./PlaceImg";

import {useEffect, useState} from "react";
import axios from "axios";
import {differenceInCalendarDays, format} from "date-fns";

import {AiOutlineCalendar} from 'react-icons/ai'
import {FiMoon} from 'react-icons/fi'
import {TbMoneybag} from 'react-icons/tb'

const BookingsPage = () => {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);

  return (
    <>
    <Header/>
    <AccountNav/>
    <div>
      {bookings?.length>0 && bookings.map(booking=>(
          <div 
          key={booking._id}
          className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden m-4">
            <div className="w-48 ">
              <PlaceImg place={booking.place}/>
            </div>
            <div className="py-3 pr-3 ">
              <h2 className="text-2xl">{booking.place.title}</h2>
              <AiOutlineCalendar className="inline mr-1 items-center "/>{format(new Date(booking.checkIn),'yyyy-MM-dd')}
              <span> To </span>
              {format(new Date(booking.checkOut),'yyyy-MM-dd')}
              <div>
              <FiMoon className="inline mr-1 items-center "/>{differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} Nights
              </div>
              <div>
                <TbMoneybag  className="inline mr-1 items-center "/>Total price: ${booking.totalPrice}
              </div>
            </div>
          </div>
      ))}
    </div>
    </>

  );
}

export default BookingsPage