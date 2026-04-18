require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDb(){
 try{
    await  mongoose.connect(process.env.MONGO_URI)
        console.log("connect to database")
    
 }catch(err){
  console.log("DB connection faild",err.message);
  process.exit(1)
 }
}

module.exports = connectToDb