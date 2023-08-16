/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-10 22:30:38
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-13 19:36:12
 * @FilePath: /airbnb_clone/api/models/place.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const mongoose=require('mongoose')
const PlaceSchema=new mongoose.Schema({
owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
title:String,
address:String,
photos:[String],
description:String,
perks:[String],
extraInfo:String,
checkIn:Number,
checkOut:Number,
maxGuests:Number,
price:Number
})

const PlaceModel=mongoose.model('place',PlaceSchema)
module.exports=PlaceModel

