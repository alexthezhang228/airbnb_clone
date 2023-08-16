
import axios from 'axios'
import React,{createContext, useEffect, useState} from 'react'



const  UserContext=createContext({})

const UserContextProvider = ({children}) => {
  const [user,setUser]=useState(null)
  const [ready,setReady]=useState(false)

  
  useEffect(()=>{
    if (!user){
      axios.get('/profile').then(({data})=>{
    
        setUser(data)
        setReady(true)
      })
    }
  },[])
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  )
}

export  {UserContextProvider,UserContext}

