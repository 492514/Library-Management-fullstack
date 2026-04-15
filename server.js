const mongoose = require("mongoose")
const database = require('./src/config/database')
const app = require("./src/app")
const PORT = process.env.PORT || 3000;


database()
app.listen(PORT,()=>{
    console.log(`server runnig on ${PORT}`)
   
})