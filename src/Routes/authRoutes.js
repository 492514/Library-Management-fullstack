require('dotenv').config();
const express = require("express")
const authRoutes = express.Router();
const adminLogin = require("../models/AdminLogin")
const student = require("../models/student")
const attendance = require("../models/attendance")
const jwt = require('jsonwebtoken')
const crypto = require("crypto"); 


authRoutes.post('/register', async(req,res)=>{

const {Name,FatherName,RollNo,SeatNo} = req.body;

const isRollnoAvalable = await student.findOne({RollNo})
if(isRollnoAvalable){
    return res.status(409).json({
        message:" RollNo already Registered"
    })
}


const users = await student.create({
Name,FatherName,RollNo,SeatNo
})

res.status(201).json({
    message:" Student Register Sucessfully",
    users:users
})
})

authRoutes.post("/entry/:id", async(req,res) =>{
try{
    const studentId = req.params.id
     const today = new Date().toLocaleDateString("en-CA")


    let studentFind = await student.findById(studentId)

    if(!studentFind){
      return  res.status(404).json({
            message: "Student Not Found"
        })
    }

     const alreadyEntry = await attendance.findOne({
        studentId:studentId,
        date:today
     })

     if(alreadyEntry){
       return res.status(409).json({
            message: "You are already Entered today",

        })
     }

     const newAttandance = await attendance.create({
        studentId:studentId,
        date:today,
        entryTime: new Date(),
        exitTime: null
     })

     res.status(201).json({
        message: "Entry Sucess",
        attendance:newAttandance
     })
} catch(error){
    res.status(500).json({
        message: "Server Error",
        error: error.message
    })
}
})

authRoutes.post("/exit/:id", async(req,res) =>{
try{
    const studentId = req.params.id
     const today = new Date().toLocaleDateString("en-CA")



    const studentFind = await student.findById(studentId)

    if(!studentFind){
        return res.status(404).json({
            sucess:false,
            message: "Student not Found",

        })
    }

     const alreadyExit = await attendance.findOne({
        studentId:studentId,
        date: today
     })

     if(!alreadyExit){
      return  res.status(400).json({
        sucess:false,
            message: "First Make Entry"
        })
     }

     if(alreadyExit.exitTime){
      return  res.status(409).json({
        sucess:false,
        message: "Already Exit today",
        alreadyExit:alreadyExit
      })
     }

     alreadyExit.exitTime = new Date()
     alreadyExit.save()

     res.status(200).json({
        sucess:true,
        message: "Exit Sucess",
        attendance:alreadyExit
     })
} catch(error){
    res.status(500).json({
        sucess:false,
        message: "Server error",
        error: error.message
    })
}
})

authRoutes.delete("/remove-user/:id", async(req,res) =>{
const userId = req.params.id
const deleteUser = await student.findByIdAndDelete(userId)
const deleteAttendance = await attendance.deleteMany({studentId:userId})
res.status(200).json({
    messege:"Student Deleted Sucessfully",
    deleteUser,
    deleteAttendance
})
})

authRoutes.get("/allusers",async(req,res) =>{
try{
    const today = new Date().toISOString().split("T")[0]
    const students =await student.find()

    const finalData = await Promise.all(
        students.map(async (student) => {
           const Attendance = await attendance.findOne({
            studentId:student._id,
             date:today
           })

           return {
            ...student._doc,
            entryTime: Attendance ? Attendance.entryTime : null,
            exitTime: Attendance ? Attendance.exitTime : null
           }
        })
    )
      return res.status(201).json({
       sucess:true,
       studentFind: finalData
      })
}
catch(error){
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: "Server error in get all users API"
    })
  
}

})

authRoutes.get("/Attendance", async(req,res) =>{
    try{
        const AttendanceFind = await attendance.find().sort({createdAt:-1}).populate("studentId");

        if(AttendanceFind.length === 0){
        return  res.status(404).json({
            message:"Attendance Not Found",
            sucess:false
          })
        }
       
        const finalAttendance =  AttendanceFind.map((user)=>{
         return{
            _id: user._id,
            studentId: user.studentId ? user.studentId._id : null,
            studentName: user.studentId ? user.studentId.Name : null,
            studentRollNO: user.studentId ? user.studentId.RollNo : null,
            date:user.date,
            entryTime: user.entryTime,
            exitTime: user.exitTime 
         }
        })

        return res.status(201).json({
            message: "Attendance fetch Sucess",
            sucess:true,
            attendanceHistory:finalAttendance
        })
        

    }catch(error){
        res.status(500).json({
            message: (error.message || "Internal Server Error")
             
        })
    }
})

authRoutes.post("/Admin/login", async(req,res)=>{
try{
    const {email,password} = req.body
    const fixEmail = process.env.fixEmail
    const fixPassword = process.env.fixPassword

    if(email !== fixEmail){
      return res.status(400).json({
        message:"Invalid Email"
      })
    }
    if(password !== fixPassword){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({
        role:'admin'
    },process.env.JWT_KEY,{expiresIn:"1d"})

      res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message:"Login Sucessfully"
    })

}
catch(error){
    res.status(500).json({
        message: (error.message || "Server Error")
    })
}
})

authRoutes.get("/Admin/Verify", async(req,res)=>{
    const token = req.cookies.token

    if(!token){
    return res.status(401).json({
        message:"You are not Admin"
    })
    }

    try{
        jwt.verify(token, process.env.JWT_KEY)
        return res.status(200).json({
            message:"Welcome Admin"
        })
    }catch(error){
        return  res.status(401).json({
            message:"No access"
        })
    }
})

module.exports = authRoutes