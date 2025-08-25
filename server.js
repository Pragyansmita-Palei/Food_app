const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require("./config/db");
//dot en configuration

dotenv.config();
//rest object
const app = express();
//db connect
connectDb();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
//Url=>https://localhost:8080
app.use("/api/V1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get('/',(req,res)=>{
   return res.status(200).send("<h1>welcome to resturant for food </h1>");
});

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`.bgMagenta.white);
});