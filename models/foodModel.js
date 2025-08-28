const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
   title:{
    type:String,
    required:[true,"food title is required"]
   },
   description:{
    type:String,
    required:[true,"food description is required"]
   },
   price:{
    type:Number,
    required:[true,"food price is required"]
   },
  
 imgUrl:{
    type:String,
    default:"https://stock.adobe.com/images/user-icon-in-flat-style-person-icon-user-icon-for-web-site-user-icon-vector-illustration/229758328",
  },
   foodTags:{
    type:String
   },
   category:{
    type:String
   },
   code:{
    type:String
   },
   isAvailable:{
    type:Boolean,
    default:true,
   },
   resturant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Resturant"
   },
   rating:{
    type:Number,
    default:5,
    min:1,
    max:5,
   }
  },{timestamps:true}
  
);

module.exports = mongoose.model("food",foodSchema);
