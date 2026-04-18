const mongoose = require("mongoose")
const database = require('./src/config/database')
const app = require("./src/app")
const PORT = process.env.PORT || 3000;


async function serverRun(){
   await database()
   app.listen(PORT , () => {
     console.log(`server start on ${PORT}`)
   })
}
serverRun()