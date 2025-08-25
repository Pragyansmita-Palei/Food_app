const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:[true,'user name is required']
  },
  email:{
    type:String,
    required:[true,'email is required'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  address:{
    type:Array,
  },
  phone:{
    type:String,
    required:[true,'phone is required']
  },
  usertype:{
    type:String,
    required:[true,'usertype is required'],
    default:'clinet',
    enum:['clinet','admin','vendor','driver']
  },
  profile:{
    type:String,
    default:"https://stock.adobe.com/images/user-icon-in-flat-style-person-icon-user-icon-for-web-site-user-icon-vector-illustration/229758328",

  },
  answer:{
    type:String,
    required:[true,"answer is required"],
  }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);