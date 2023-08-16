/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-03 21:15:28
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 18:36:34
 * @FilePath: /airbnb_clone/client/src/pages/Header.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import {SiAirbnb} from 'react-icons/si'
import {BiSearchAlt2} from 'react-icons/bi'
import {AiOutlineMenu,AiOutlineUser} from  'react-icons/ai'

const Header = () => {
  const {user}=useContext(UserContext)
  return(

      <header className='p-4 flex justify-between'>
      <Link to='/home' className='flex  items-center gap-2'>
        <SiAirbnb className='w-4 text-primary'/>
        <span className='font-bold text-xl text-primary'>Airbnb</span>
      </Link>
      <div className='flex gap-1 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 items-center'>
        <div>Anywhere</div>
        <div><span className='border-l border-gray-300'></span></div>
        <div>Anyweek</div>
        <div><span className='border-l border-gray-300'></span></div>
        <div>Addguests</div>
        <button className='primary text-white rounded-full p-1'>
          <BiSearchAlt2 className='relative'/>
        </button>
      </div>
      <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-6 shadow-md shadow-gray-300 items-center'>
        <div><AiOutlineMenu className='relative'/></div>
        <div><span className='border-l border-gray-300'></span></div>
        <Link to={user?'/account':'/login'}><AiOutlineUser className='relative '/> </Link>
        {!!user && (<div>{user.name}</div>)}   
      </div>
    </header>
  )
}

export default Header