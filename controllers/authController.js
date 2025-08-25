//resgister

const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const registerController = async(req,res) =>{
  try{
    const {userName,email,password,phone,address,answer} = req.body
    //validation
    if(!userName || !email || !password || !address || !phone || !answer){
      return res.status(500).send({
        sucess:false,
        message:'please provide all fields'
      })
    }
    //check user
    const existing = await userModel.findOne({email})
    if(existing){
      return res.status(500).send({
        sucess:false,
        message:"Email already exist please login"
      })
    }
    //hashing password
    const saltRounds = 10;

    const hashedpassword = await bcrypt.hash(password,saltRounds)

    //create user
    const user = await userModel.create({
      userName,email,password:hashedpassword,address,phone,answer,
    });
    res.status(201).send({
      sucess: true,
      message: "sucessfullly registered",
      user
    })
  }catch(error){
    console.log(error)
    res.status(500).send({
      sucess:false,
      message:'Error in register API',
      error
    })
  }
};

const loginController = async(req,res) =>{
  try{
     const {email,password} = req.body
     //validation
     if(!email || !password){
      return res.status(500).send({
        sucess:false,
        message:"provide email or password"
      })
     }

     //check user
     const user = await userModel.findOne({email});
     if(!user){
      return res.status(404).send({
        sucess:false,
        message:"user not found"
      })
     }
     //check password
     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
      return res.status(500).send({
        sucess:false,
        message:"Invalid credentials"
      });
     }
     //token
     const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:'7d',
     })
     user.password = undefined;
     res.status(200).send({
      sucess:true,
      message:"login sucessfully",
      token,
      user,
     })
  }catch(error){
   console.log(error)
   res.status(500).send({
    sucess:false,
    message:"Error in login Api",
    error
   })
  }

};
module.exports = {registerController,loginController};

