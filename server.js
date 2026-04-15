const mongoose = require("mongoose")
const database = require('./src/config/database')
const app = require("./src/app")

console.log("📍 Server.js starting...")

database()
app.listen(3000,()=>{
    console.log('running on 3000 port')
    console.log("📍 Server ready - hit /api/test to test")
})