/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-03 21:21:13
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 18:35:27
 * @FilePath: /airbnb_clone/client/src/pages/Login.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {Link, Navigate} from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'

import Header from './Header'
import { UserContext } from '../UserContext'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState(false)
  const {setUser}=useContext(UserContext)

  async function handleLogin(e){
    e.preventDefault()
    try{
      const {data}=await axios.post('/login',{email,password})
  
      setUser(data)
       // grab information from the user
    
      setRedirect(true)
    }catch(e){
      alert('Login failed. Please try again.')
    }
  }
  
  if (redirect){
    return <Navigate to={'/home'}></Navigate>
  }
  return (
    <>
    <Header></Header>
    <div className='mt-4 flex item-center justify-around grow'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
          <input type='email' placeholder='Your email address' value={email} onChange={e=>setEmail(e.target.value)}></input>
          <input type='password' placeholder='Your password' value={password} onChange={e=>setPassword(e.target.value)}></input>
          <button className='primary'>Log in</button>
          <div className='text-center py-2 text-gray-500'>
            No account yet? <Link to={'/register'} className='underline text-black'>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login