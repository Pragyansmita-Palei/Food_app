const categoryModel = require("../models/categoryModel");

const createCatController = async(req, res) =>{
  try{
    const {title,imgUrl} = req.body;

    if(!title){
      return res.status(500).send({
        success:false,
        message:"please provide title and img"
      });
    }
   const newCategory = new categoryModel({title,imgUrl})
   await newCategory.save();
   res.status(201).send({
    success:true,
    message:"category created",
    newCategory,
   })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in create cat API",
      error
    })
  }

};
const getAllController = async(req, res) =>{
 try{
 const Category = await categoryModel.find({})
 if(!Category){
  res.status(404).send({
    success:false,
    message:"category not available"
  })
 }
 res.status(200).send({
  success:true,
  totalcount:Category.length,
  Category
 })

 }catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"error in getAll API"
  })
 }
};

const updateCatController = async(req, res) =>{
   try{
     const {id} = req.params;
     const {title,imgUrl} = req.body;
     const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imgUrl},{new:true});
     if(!updatedCategory){
      return res.status(500).send({
        success:false,
        message:"no category found"
      })
     }
     res.status(200).send({
      success:true,
      message:"category updated successfully"
     })
     
   }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in update API",
      error
    })
   }
};

const deleteController = async (req, res) =>{
    try{
      const categoryID = req.params.id;
      if(!categoryID){
        res.status(404).send({
          success:false,
          message:"please provide category id"
        })
      }
      const category = await categoryModel.findByIdAndDelete(categoryID);

      if(!category){
        return res.status(404).send({
          success:false,
          message:"category not found"
        })
      }
      res.status(200).send({
        success:true,
        message:"category deleted suuccessfully"
      });

    }catch(error){
      console.log(error)
      res.status(500).send({
        success:false,
        message:"error in delete API"
      })
    }
};

module.exports = {createCatController,getAllController,updateCatController,deleteController}