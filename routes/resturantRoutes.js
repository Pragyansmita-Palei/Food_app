const express = require("express");

const authMiddlware = require("../middlewares/authMiddlware");
const { createResturantController, getResturantController, getResturantByIdController, deleteResturantByIdController } = require("../controllers/resturantController");

const router = express.Router();
//create resturant
router.post("/create",authMiddlware,createResturantController);
//get all resturant
router.get("/getAll",getResturantController);
// get resturant by id
router.get("/get/:id", getResturantByIdController);
//delete resturant by id 
router.delete("/delete/:id",deleteResturantByIdController);
module.exports = router;
