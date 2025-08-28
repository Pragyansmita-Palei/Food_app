const restrurantModel = require("../models/restrurantModel");

const createResturantController = async (req , res) =>{
  try{
 const {title,imageUrl,foods,time,pickup,delivery,isopen,logoUrl,rating,ratingCount,code,coords} = req.body;
 if(!title || !coords){
  return res.status(500).send({
    success:false,
    message:"please provide title and address",
  });
 }
 const newResturant = await restrurantModel({title,imageUrl,foods,time,pickup,delivery,isopen,logoUrl,rating,ratingCount,code,coords});
 await newResturant.save();
 res.status(201).send({
  success:true,
  message:"new resturant created successfully",
 })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in create resturant api",
      error
    })
  }

}
const getResturantController = async (req, res) =>{
  try{
    const resturants = await restrurantModel.find({})
    if(!resturants){
      return res.status(404).send({
        success:false,
        message:"no resturant available"
      })
    }
    res.status(200).send({
      success:true,
      totalcount:resturants.length,
      resturants
    })

  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"resturant data not found",
      error
    })
  }

}
const getResturantByIdController = async (req, res) =>{
try{
 const resturantid = req.params.id;
 if(!resturantid){
  res.status(404).send({
    success:false,
    message:"please provide resturantid"
  })
 }
 //find resturant 
 const resturant = await restrurantModel.findById(resturantid)
 if(!resturant){
  res.status(404).send({
    success:true,
    message: "Restaurant not found",
  })
 }
 res.status(200).send({
  success:true,
  resturant
 })
}catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"error in get resturant by id api",
    error
  })
}
}
const deleteResturantByIdController = async (req, res) =>{
  try{
   const resturantid = req.params.id;
   if(!resturantid){
    res.status(404).send({
      success:false,
      message:"please provide resturant id"
    });
   }
   //find resturant
   const resturant = await restrurantModel.findByIdAndDelete(resturantid);
   if(!resturant){
    res.status(404).send({
      success:false,
      message:"resturant not found"
    });
   }
   res.status(200).send({
    success:true,
    message:"resturant deleted sucessfully"
   });
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in delete api"
    });
  }

}
module.exports = {createResturantController,getResturantController,getResturantByIdController,deleteResturantByIdController};