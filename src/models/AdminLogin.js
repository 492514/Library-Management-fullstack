const mongoose = require("mongoose")

const adminLoginSchema = new mongoose.Schema({
    email:String,
    password:String
    
})

const login = new mongoose.model("adminLogin",adminLoginSchema)

module.exports = login