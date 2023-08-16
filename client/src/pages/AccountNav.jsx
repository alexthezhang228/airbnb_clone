/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-13 11:33:53
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-13 13:49:36
 * @FilePath: /airbnb_clone/client/src/pages/AccountNav.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {FaUser}  from 'react-icons/fa'
import {HiOutlineViewList} from 'react-icons/hi'
import {BsFillHouseDoorFill} from  'react-icons/bs'

const AccountNav = () => {
  const {pathname}=useLocation()
  let subpage=pathname.split('/')?.[2]
  if (subpage===undefined){
    subpage='profile'
  }
  function setLinkClass(type=null){
    let classes='py-2 px-2 sm:px-6 inline-flex items-center gap-1'
    if (type==subpage){
      classes= classes+' bg-primary rounded-full text-white'}
    else{
      classes=classes+' bg-gray-200 rounded-full '
    }
    return classes
  }

  return (
    <div>
      <nav className='w-full flex mt-8 gap-2 justify-center mb-8 '>
          <Link to={'/account'} className={setLinkClass('profile')}><FaUser/>My profile</Link>
          <Link to={'/account/bookings'} className={setLinkClass('bookings')}><HiOutlineViewList/>My bookings</Link>
          <Link to={'/account/accommodations'} className={setLinkClass('accommodations')}><BsFillHouseDoorFill/>My accommodations</Link>
        </nav>
    </div>
  )
}

export default AccountNav