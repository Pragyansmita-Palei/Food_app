const testUserController = (req,res) =>{
  try{
    res.status(200).send("<h1>Test user data</h1>")
  }catch(error){
    console.log('error In test API',error)
  }
};

module.exports = {testUserController};