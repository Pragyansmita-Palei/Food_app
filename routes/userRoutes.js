const express = require('express');
const { getuserController, updateuserController,resetpasswordController,updatepasswordController,deleteprofileController } = require('../controllers/userController');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router()

//routes
//get
router.get('/getuser',authMiddlware,getuserController)
//update
router.put('/updateuser',authMiddlware,updateuserController)
//update password
router.post('/updatepassword',authMiddlware,updatepasswordController)
//reset password
router.post('/resetpassword',authMiddlware,resetpasswordController);
//delete user
router.delete('/deleteUser/:id',authMiddlware,deleteprofileController)

module.exports = router;