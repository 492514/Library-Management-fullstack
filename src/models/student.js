const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
Name:String,
FatherName:String,
RollNo:String,
SeatNo:String,

})


const student = new mongoose.model("Student",studentSchema)


module.exports = student
