require('dotenv').config();
const mongoose = require('mongoose');

function connectToDb(){
    
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        
        console.log("connect to database")
    })
}

module.exports = connectToDb