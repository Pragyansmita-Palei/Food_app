const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

const getuserController = async (req, res) => {
try{
  //find user
const user = await userModel.findById(req.user.id);
//validation
if(!user){
  res.status(404).send({
    success:false,
    message:"user not found"
  })
}
user.password = undefined;
res.status(200).send({
  success:true,
  message:"user fetched sucessfully",
  user,
})
}catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Error in get user API",
    error
  })
}
};

const updateuserController = async(req, res) =>{
  try{
//find user
const user = await userModel.findById(req.user.id);
//validation
if(!user){
  return res.status(404).send({
    success:false,
    message:"user not found"
  })
}
//update
const {userName,address,phone} = req.body;
if(userName) user.userName = userName;
if(address) user.address = address;
if(phone) user.phone = phone;

//save user
await user.save();
res.status(200).send({
  success:true,
  message:"user update successfully"
})
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in update user api",
      error
    })
  }

};
//reset password
const resetpasswordController = async (req, res) =>{
try{
const {email,newPassword,answer} = req.body
if(!email || !newPassword || !answer){
  return res.status(500).send({
    success:false,
    message:"please provide all fields"
  })
}
const user = await userModel.findOne({email,answer})
if(!user){
  return res.status(500).send({
    success:false,
    message:"user not found",
  })
}
//hashing password
    const saltRounds = 10;
const hashedpassword = await bcrypt.hash(newPassword,saltRounds)
user.password = hashedpassword;
await user.save();
res.status(200).send({
  success:true,
  message:"password rest sucessfully"
})

}catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:'error in password reset api',
    error
  })
}
};
//update password
const updatepasswordController = async(req, res) =>{
  try{
 const user = await userModel.findById(req.user.id)
 //validation
  if(!user){
    return res.status(404).send({
      success:false,
      message:"user not found"
    })
  }
  //get data from user
  const {oldPassword,newPassword} = req.body;
  if(!oldPassword || !newPassword){
    return res.status(500).send({
      success:false,
      message:"provide old or new password"
    })
  }
  //check password
  const isMatch = await bcrypt.compare(oldPassword,user.password);
       if(!isMatch){
        return res.status(500).send({
          sucess:false,
          message:"Invalid old password"
        });
       }
       //hashing password
    const saltRounds = 10;
const hashedpassword = await bcrypt.hash(newPassword,saltRounds)
user.password = hashedpassword
await user.save();
res.status(200).send({
  success:true,
  message:"password update sucessfully"
})
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in password update api",
      error
    })
  }

};
//delete profile account 
const deleteprofileController = async(req, res) =>{
try{
 await userModel.findByIdAndDelete(req.params.id)
 return res.status(200).send({
  success:true,
  message:"your account has been deleted",
 });
}catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"error in delete profile API",
    error
  });
}
};

module.exports = { getuserController ,updateuserController,resetpasswordController,updatepasswordController,deleteprofileController};
