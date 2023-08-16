import Header from './Header'

import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [checkPassword,setCheckPassword]=useState('')
  const [match,checkMatch]=useState(true)

  const handlePassword=(e)=>{
    setPassword(e.target.value)
    checkMatch(e.target.value===checkPassword|| e.target.value === '')
  }
  const handleMatch=(e)=>{
    setCheckPassword(e.target.value)
    checkMatch(password===e.target.value|| e.target.value === '')
  }
  async function registerUser(e){
    e.preventDefault()
    // to stop website refreshment
    
    try{
      await axios.post('/register',{
        name,email,password
      })
      alert('registration successful')
    }   
    catch(e){
      alert('registration failed. Please try later!')
    }
  }

  return (
    <>
    <Header></Header>
    <div className='mt-4 flex item-center justify-around grow'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input type='text' placeholder='Your name'
          value={name}
          onChange={e=>setName(e.target.value)}/>
          <input type='email' placeholder='Your email address'
          value={email}
          onChange={e=>setEmail(e.target.value)}/>
          <input type='password' placeholder='Input your password'
          value={password}
          onChange={handlePassword}/>
          <input type='password' placeholder='Confirm your password'
          value={checkPassword}
          onChange={handleMatch}/>
          {!match && <p style={{ color: 'red' }}>Passwords do not match.</p>}
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already a member?  <Link to={'/login'} className='underline text-black'>Log In</Link>
          </div>
        </form>
      </div>
    </div>
    </>
    
  )
}

export default Register