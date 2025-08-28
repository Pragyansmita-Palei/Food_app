const foodModel = require("../models/foodModel");
//create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    if (!title || !description || !price || !resturant) {
      res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "new food item created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Create food API",
    });
  }
};
//getall food
const getallFoodController = async (req, res) => {
  try {
    const Foods = await foodModel.find({});
    if (!Foods) {
      res.status(404).send({
        success: false,
        message: "food no found",
      });
    }
    res.status(200).send({
      success: true,
      message: "food shows successfully",
      totalcount: Foods.length,
      Foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getall API",
      error,
    });
  }
};
//get food by id
const getFoodByIdController = async (req, res) => {
  try {
    const FoodID = req.params.id;
    if (!FoodID) {
      res.status(404).send({
        success: false,
        message: "please provide food id",
      });
    }
    //find food
    const Foods = await foodModel.findById(FoodID);
    if (!Foods) {
      res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "food found successfully",
      Foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getById API",
      error,
    });
  }
};
//get food by resturant
const getFoodByresturantController = async (req, res) => {
  try {
    const resturantID = req.params.id;
    if (!resturantID) {
      res.status(404).send({
        success: false,
        message: "please provide resturant id",
      });
    }
    const resturants = await foodModel.find({ resturant: resturantID });
    if (!resturants) {
      res.status(404).send({
        success: false,
        message: "food not found by resturant",
      });
    }
    res.status(200).send({
      success: true,
      message: "food found successfully by resturant",
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in food API",
    });
  }
};
//update food
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if(!foodID){
      res.status(404).send({
        success:false,
        message:"please provide food id"
      });
    }
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
     
    const updateFood = await foodModel.findByIdAndUpdate(
       foodID ,
      {
        title,
        description,
        price,
        imgUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
      },
      { new: true }
    );
    if(!updateFood){
      res.status(500).send({
        success:false,
        message:"no food found"
      })
    }
    res.status(200).send({
      success:true,
      message:"food updated successfully",
      updateFood,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update API",
    });
  }
};
//delete food
const deleteFoodController = async (req, res) =>{
 try{
  const FoodID = req.params.id;
  if(!FoodID){
    res.status(404).send({
      success:false,
      message:"please proovide the foodID"
    });
  }
  const Food = await foodModel.findByIdAndDelete(FoodID);
  if(!Food){
    res.status(404).send({
      success:false,
      message:"food not found"
    });
  }
  return res.status(200).send({
    success:true,
    message:"food deleted successfully"
  });

 }catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"error in delete API"
  })
 }
};
module.exports = {
  createFoodController,
  getallFoodController,
  getFoodByIdController,
  getFoodByresturantController,
  updateFoodController,
  deleteFoodController
};
