const express = require("express");

const authMiddlware = require("../middlewares/authMiddlware");
const { createCatController, getAllController, updateCatController, deleteController } = require("../controllers/categoryController");

const router = express.Router();
//create
router.post("/create",authMiddlware,createCatController);
//get all
router.get("/getAll",authMiddlware,getAllController);
///update
router.put("/update/:id",authMiddlware,updateCatController);
//delete
router.delete("/delete/:id",authMiddlware,deleteController);
module.exports = router;