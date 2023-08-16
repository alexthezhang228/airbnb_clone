/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-05 10:40:27
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 16:27:54
 * @FilePath: /airbnb_clone/api/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const express = require('express')
// This line imports the Express.js module, which allows you to create and manage web applications

const cors=require('cors')

// When you make requests from a frontend application (e.g., a React app) to a different backend server, 
// you might encounter CORS restrictions if the backend server is on a different domain. 
// The cors package helps you set up the necessary headers to handle these requests and avoid CORS-related issues.

const app=express()
// Here, you create an instance of the Express application. 


app.use(express.json())
// Add the express.json() middleware to parse JSON data in the request body

app.use(cors({
  credentials:true,
  origin:'http://127.0.0.1:5173'
}))
// Only requests coming from http://127.0.0.1:5173 will be allowed to access your server's resources

const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://airbnb:u7B2X2a54fSgb43k@cluster0.j5pkqce.mongodb.net/?retryWrites=true&w=majority')

mongoose.connect(
  'mongodb+srv://airbnb:u7B2X2a54fSgb43k@cluster0.j5pkqce.mongodb.net/?retryWrites=true&w=majority',
)
.then(()=>console.log('connected'))
.catch(e=>console.log(e));


app.get('/test',(req,res)=>{
  res.json('test ok')
})
// When a client sends a GET request to the /test endpoint, the callback function specified here will be executed.


const User=require('./models/user.js')
// const bcryts=require('bcryptjs')


app.post('/register',async(req,res)=>{

  const {name,email,password}=req.body
   // Extract data from the request body

  try{
    const userDoc=await User.create({
      name,
      email,
      password,
    })
   // Create a new user using the User model

   res.json(userDoc)
   // The res.json(createdUser) line sends a JSON response back to the client/front-end  
    
  }catch(e){
    res.status(422).json(e)
  }
  

});


const jwt=require('jsonwebtoken')
const jwtSecret='adasdgagj'
app.post('/login',async (req,res)=>{
  const {email,password}=req.body
  const userDoc=await User.findOne({email})
  if (userDoc && userDoc.password===password){
    jwt.sign({
      email:userDoc.email,
      id:userDoc.id,
      name:userDoc.name},
      jwtSecret,{},(err,token)=>{
      if (err){throw err}
      else{
        res.cookie('token',token).json(userDoc)
        // Setting a cookie named 'token' in the client's browser, 
        // which likely contains the JWT token generated during authentication.
        // Sending a JSON response with the object userDoc.
      }
    })
 
  }else{
    res.json('not found')
  }
})

const CookieParser=require('cookie-parser')
app.use(CookieParser())
app.get('/profile',(req,res)=>{
  const {token}=req.cookies
  if  (token){
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
      if (err){throw err}
      else{
        const {name,id,email}=await User.findById(userData.id)
        res.json({name,id,email})
      }
    })
  }else{
    res.json(null)
  }
 
})
// npm add cookie-parser


app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
});

const imageDownloader=require('image-downloader')
const multer = require('multer')
app.post('/upload-by-link',async (req,res)=>{
 
  const {link}=req.body  
  console.log(link)
  const newName='photo'+Date.now()+'.jpg'

  await imageDownloader.image(
    {
      url:link,
      dest:__dirname+'/uploads/'+newName
    }
  )
  res.json(newName)
})

app.use('/uploads',express.static(__dirname+'/uploads'))
// when you use app.use('/uploads', express.static(__dirname+'/uploads')), 
// any request to /uploads route will be matched and the Express server 
// will serve the static files (such as images) located in the "uploads" directory.


const photoMiddleWare=multer({dest:'uploads/'})
const fs=require('fs')
app.post('/upload',photoMiddleWare.array('photos',100),(req,res)=>{
  const uploadFiles=[]
  for (let i=0;i<req.files.length;i++){
    const {path,originalname}=req.files[i]
    const parts=originalname.split('.')
    const ext=parts[parts.length-1]
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)
    uploadFiles.push(newPath.replace('uploads/',''))
  }
  
  res.json(uploadFiles)
})


const Place=require('./models/place.js')
app.post('/places',async (req,res)=>{
  const {token}=req.cookies
  const { title,address,photoLinks,description,extraInfo,checkIn,checkOut,maxGuests,price,perks}=req.body
  jwt.verify(token,jwtSecret,{},async(err,userData)=>{
    if (err) throw err;
    const placeDoc=await Place.create({
      owner:userData.id,
      title,
      address,
      photos:photoLinks,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
  })
  res.json(placeDoc)
  })
})

app.get('/user-places',async (req,res)=>{
  const {token}=req.cookies
  jwt.verify(token,jwtSecret,{},async(err,userData)=>{
    const {id}=userData
    res.json(await Place.find({owner:id}))
  })
})

app.get('/places/:id',async (req,res)=>{
  const {id}=req.params
  res.json(await Place.findById(id))
})

app.put('/places',async (req,res)=>{
  const {token}=req.cookies
  const {id,title,address,photoLinks,description,extraInfo,checkIn,checkOut,maxGuests,price,perks}=req.body
  jwt.verify(token,jwtSecret,{},async(err,userData)=>{
   
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:photoLinks,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
      });
      await placeDoc.save();
      res.json('ok');}
  })
})


app.get('/places',async (req,res)=>{
  res.json(await Place.find())
  // This will retrieve all documents from the "places" collection in your MongoDB database.
})

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

const Booking=require('./models/bookings.js')
app.post('/bookings',async (req,res)=>{
  
  const userData=await getUserDataFromReq(req)
  
  const {place,checkIn,checkOut,numberOfGuests,numberOfNights,totalPrice,name,email}=req.body
  Booking.create({
    user:userData.id,
    guests:numberOfGuests,
    nights:numberOfNights,
    place,checkIn,checkOut,totalPrice,name,email}).then((doc)=>{
    res.json(doc.place)
  }).catch((err)=>{
    throw err
  })
})

app.get('/bookings',async (req,res)=>{
  const userData=await getUserDataFromReq(req)
  res.json(await Booking.find({user:userData.id}).populate('place'))
})

app.listen(4000)
// This starts the Express server and listens on port 4000 for incoming HTTP requests.

