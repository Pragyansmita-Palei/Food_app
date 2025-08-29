const express = require("express");
const authMiddlware = require("../middlewares/authMiddlware");
const {
  createFoodController,
  getallFoodController,
  getFoodByIdController,
  getFoodByresturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddlware = require("../middlewares/adminMiddlware");

const router = express.Router();

//create food
router.post("/create", authMiddlware, createFoodController);

//getall food
router.get("/getAll", authMiddlware, getallFoodController);
//getsingle food by id
router.get("/get/:id", authMiddlware, getFoodByIdController);
//get food by resturant
router.get("/getbyresturant/:id", authMiddlware, getFoodByresturantController);
//update food
router.put("/update/:id", authMiddlware, updateFoodController);
//delete food
router.delete("/delete/:id",authMiddlware,deleteFoodController);
//place order
router.post("/placeorder",authMiddlware,placeOrderController);
//order status
router.post("/orderstatus/:id",authMiddlware,adminMiddlware,orderStatusController)
module.exports = router;
