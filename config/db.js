const mongoose = require('mongoose')

 const connectDb = async () =>{
  try{
     await mongoose.connect(process.env.MONGO_URL)
     console.log(`connect to the database ${mongoose.connection.host}`)
  }catch(error){
    console.log("DB error");
  }
};

module.exports = connectDb;