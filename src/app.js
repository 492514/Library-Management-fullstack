const express = require('express')
const authRoutes = require('./Routes/authRoutes')
const cookieParser = require("cookie-parser");
const cors = require("cors")
const path = require("path")
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser());
app.use("/api",authRoutes)
app.use(express.static("./public"))

app.use('*name',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','/public/assets/index.html'))
})

module.exports = app