const mongoose=require('mongoose')
const {Schema}=mongoose

const UserSchema=new Schema({
  name:String,
  email:{type:String,unique:true},
  password:String
})
// Define the UserSchema


const userModel=mongoose.model('User',UserSchema)
// Create a Mongoose model named 'User' using the UserSchema

module.exports=userModel
// Export the User model to be used in other parts of the application 