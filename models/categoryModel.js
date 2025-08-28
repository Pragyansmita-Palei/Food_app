const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
  title:{
    type:String,
    required:[true,'category title is required']
  },
  imgUrl:{
    type:String,
    default:"https://stock.adobe.com/images/user-icon-in-flat-style-person-icon-user-icon-for-web-site-user-icon-vector-illustration/229758328",
  }
  },{timestamps:true}
);

module.exports = mongoose.model("category",categorySchema);