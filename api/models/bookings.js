/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-16 10:20:31
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 16:33:38
 * @FilePath: /airbnb_clone/api/models/booking.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const mongoose=require('mongoose')
const BookingSchema=new mongoose.Schema({
place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'place'},
user:{type:mongoose.Schema.Types.ObjectId,required:true},
checkIn:{type:Date,required:true},
checkOut:{type:Date,required:true},
name:{type:String,required:true},
email:{type:String,required:true},
guests:{type:Number,required:true},
nights:{type:Number,required:true},
totalPrice:{type:Number,required:true}
})

const BookingModel=mongoose.model('bookings',BookingSchema)
module.exports=BookingModel

