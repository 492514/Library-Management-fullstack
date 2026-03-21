const mongoose = require("mongoose")
const database = require('./src/config/database')
const app = require("./src/app")

database()
app.listen(3000,()=>{
    console.log('running on 3000 port')
})