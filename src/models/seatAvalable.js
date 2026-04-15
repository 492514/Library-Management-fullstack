const mongoose = require("mongoose")

const seatSchema = new mongoose.Schema({
    seatNo:{
        type:String,
        required:true,
        unique:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: null
    }
})

const seatModel = mongoose.model("seat",seatSchema);

module.exports = seatModel