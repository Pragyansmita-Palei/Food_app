const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
   foods:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"food"
    }
   ],
   payment:{},
   buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   status:{
    type:String,
    enum:["preparing","prepare","on the way","delivered"],
    default:"preparing",
   },
  },{timestamps:true}
);

module.exports = mongoose.model("orders",OrdersSchema);