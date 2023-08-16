/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-09 10:43:31
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 18:37:39
 * @FilePath: /airbnb_clone/client/src/pages/Account.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE<accommodations/
 */

import React,{useContext, useState} from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams,useLocation } from 'react-router-dom'
import axios from 'axios'

import Header from './Header'
import Accommodations from './Accommodations'
import AccountNav from './AccountNav'

const Account = () => {
  const {ready,user,setUser}=useContext(UserContext)
  const [redirect,setRedirect]=useState('')

  let {subpage}=useParams()
  if (subpage===undefined){
    subpage='profile'
  }
  
  async function handleLogOut(){
    await axios.post('/logout')
    setRedirect('/home')
    setUser('')
  }
  if (redirect){
    return <Navigate to={'/home'} />
  }
  if (!ready){
    return 'Loading... Wait a second.'
  }
 
  if (ready&&!user){
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <Header></Header>
      <div>
        <AccountNav/>
        {subpage==='profile'&&(
          <div className='text-center mx-auto max-w-lg'>
            <h3 className='text-xl mb-3'>Welcome! Logged in as {user.name}</h3>
            <button className='primary' onClick={handleLogOut}>Log Out</button>
          </div>
        )}
        {subpage==='accommodations'&&(
          <Accommodations/>
        )}
      </div>
    </div>
  )
}

export default Account