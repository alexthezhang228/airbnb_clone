
import React, {useEffect, useState } from 'react'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios';

import {AiOutlineCloudUpload,AiOutlineStar,AiTwotoneStar}  from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'


import Header from './Header';
import AccountNav from './AccountNav';
import Perks from './Perks';

const AccommodationFormPage = () => {

  const [title,setTitle]=useState('')
  const [address,setAddress]=useState('')

  const [photoLinks, setPhotoLinks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [description,setDescription]=useState('')
  const [perks,setPerks]=useState([])
  const [extraInfo,setExtraInfo]=useState('')
  const [checkIn,setCheckIn]=useState('')
  const [checkOut,setCheckOut]=useState('')
  const [maxGuests,setMaxGuests]=useState('')
  const [price,setPrice]=useState('')

  const [redirect,setRedirect]=useState('')

  const {id}=useParams()
  
  useEffect(()=>{
  if (!id){
    return 
  }else{
    axios.get('/places/'+id).then(
      response=>{
        const {data}=response
        setTitle(data.title)
        setAddress(data.address)
        setDescription(data.description)
        setPerks(data.perks)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxGuests(data.maxGuests)
        setPrice(data.price)
        setPhotoLinks(data.photos)
      }
    )
  }
  },[id])

  async function addPhotoByLink(e){
    e.preventDefault()
    const {data:fileName}=await axios.post('/upload-by-link',{
      link:inputValue
      // send link:photoLinks to backend
    })
    // fileName will hold the value of the data property from the response,

    setPhotoLinks(prev => [...prev, fileName]);
    setInputValue('');
  }


  function uploadPhoto(e) {
    e.preventDefault();
    const data=new FormData()
    const files=e.target.files
    for (let i=0;i<files.length;i++){
      data.append('photos',files[i])
    }
    axios.post('/upload',data,{
      headers:{'Content-Type':'multipart/form-data'}
    }).then(response=>{
      const {data:fileNames}=response
      setPhotoLinks(prev=>{
        return [...prev,...fileNames]
      })
    })}


  async function saveNewPlaces(e){
    e.preventDefault()
    const placeData={
      title,address,photoLinks,description,extraInfo,checkIn,checkOut,maxGuests,
      perks,price
    }

    if (id){
      await axios.put('/places',{
        id,...placeData
      })
    }else{
      await axios.post('/places',placeData)
    }
    

    setRedirect(true)

  }
  
  if (redirect){
    return <Navigate to={'/account/accommodations'}></Navigate>
  }

  function handleDel(link){
    setPhotoLinks([...photoLinks.filter(delPhoto=>link!==delPhoto)])
  }

  function  handleFirst(link){
    const newPhotoLinkWithoutChosenPhoto=photoLinks.filter(newPhoto=>newPhoto!=link)
    const newPhotoLinks=[link,...newPhotoLinkWithoutChosenPhoto]
    setPhotoLinks(newPhotoLinks)
  }
 
  return (
    <div>
      <Header/>
      <AccountNav/>
      <form className='px-4' onSubmit={saveNewPlaces}>
          <h2 className='text-2xl mt-4'>Title</h2>
          <input 
          value={title}
          onChange={e=>setTitle(e.target.value)}
          type='text' placeholder='Title,for example,my lovely apt'/>
          <h2 className='text-2xl mt-4'>Address</h2>
          <input
          value={address}
          onChange={e=>setAddress(e.target.value)}
          type='text' placeholder='Address'/>
          <h2 className='text-2xl mt-4'>Photos <span className='text-sm text-gray-400'>(The more the better)</span></h2>
          <div className='flex gap-1 '>
          <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          type='text' placeholder='Link' />
          <button 
          onClick={addPhotoByLink}
          className='w-40 bg-gray-300 rounded-2xl px-1 flex justify-center items-center text-white font-bold'>Add photo</button>
          </div>
          <div className='mt-2 grid grid-cols-3 md:grid-cols-4  lg:grid-cols-6'>
            {photoLinks.length>0 && photoLinks.map(link=>{
              return (
                <div key={link} className='m-1 h-32 flex relative'>
                  <img className='rounded-xl w-full object-cover position-center' src={'http://127.0.0.1:4000/uploads/'+link }/>
                  <BsFillTrashFill 
                  onClick={()=>handleDel(link)}
                  className='absolute text-white bottom-1 right-1 bg-black p-1 cursor-pointer bg-opacity-50 text-2xl'/>
                  {link===photoLinks[0] && 
                  <AiTwotoneStar className='absolute text-2xl top-1 left-1 p-1 cursor-pointer bg-opacity-50 bg-primary' />}

                  {link!==photoLinks[0] && 
                  <AiOutlineStar 
                  onClick={()=>handleFirst(link)}
                  className='absolute text-white top-1 left-1 bg-black p-1 cursor-pointer bg-opacity-50 text-2xl'
                  />}
                </div>
              )
            })}
          <label className='cursor-pointer rounded-2xl border bg-transparent p-8 text-2xl text-gray-300 flex justify-center gap-1 items-center h-32'>
            <input type='file' className='hidden' onChange={uploadPhoto} multiple/>
            <AiOutlineCloudUpload/>
            Upload
          </label>  
          </div>
          <h2 className='text-2xl mt-4'>Description</h2>
          <textarea 
          value={description}
          onChange={e=>setDescription(e.target.value)}
          className='w-full border rounded-2xl my-1 py-2 px-3 mt-1' 
          type='text' placeholder='Any description?'/>
          <Perks selected={perks} onChange={setPerks}/>
          
          <h2 className='text-2xl mt-4'>Extra Info</h2>
          <textarea 
          value={extraInfo}
          onChange={e=>setExtraInfo(e.target.value)}
          className='w-full border rounded-2xl my-1 py-2 px-3 mt-1' 
          type='text' placeholder='More info? For example,house rules...'/>
          <h2 className='text-2xl mt-4 '>Time, Guests and Price</h2>
          <div className='flex gap-1 mt-1'>
            <div>
              <h3>Check in time</h3>
              <input 
              value={checkIn}
              onChange={e=>setCheckIn(e.target.value)}
              type='text' placeholder='14'/>
            </div>
            <div>
              <h3>Check out time</h3>
              <input 
              value={checkOut}
              onChange={e=>setCheckOut(e.target.value)}
              type='text' placeholder='12'/>
            </div>
            <div>
              <h3>Max number</h3>
              <input 
              value={maxGuests}
              onChange={e=>setMaxGuests(e.target.value)}
              type='number' placeholder='2'/>
            </div>
            <div>
              <h3>Price per night</h3>
              <input 
              value={price}
              onChange={e=>setPrice(e.target.value)}
              type='number' placeholder='100'/>
            </div>
          </div>
          <div>
            <button className='bg-primary w-full rounded-full text-white px-6 py-2 my-2'>Save</button>
          </div>
        </form>
    </div>
  )
}

export default AccommodationFormPage