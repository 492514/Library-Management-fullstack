import  { useContext } from 'react'
import axios from 'axios'
import styles from "../Student/Student.module.css"
import { useState } from 'react'
import { useEffect } from 'react'

const Studentdashboard = () => {

 

const [allStudents, setallStudents] = useState([])

const [searchStd, setsearchStd] = useState("")




function getAllStudent(){
 axios.get('https://library-management-fullstack.onrender.com/api/allusers')
 .then((res)=>{

   setallStudents(res.data.studentFind)
  
 })
 
 .catch((err)=>{
   console.log(err)
 })
}

useEffect(()=>{
  getAllStudent()
},[])


function getEntryTime(id){
  axios.post(`https://library-management-fullstack.onrender.com/api/entry/${id}`)
    .then((res)=>{
      const newEntryTime = res.data.attendance.entryTime;
      
   setallStudents((prev) =>
        prev.map((student) =>
          student._id === id
            ? { ...student, entryTime: newEntryTime }
            : student
        )
      )
       

    })
    .catch((err)=>{
      console.log(err.response?.data?.message || err.message)
    })
}

function getExitTime(id){
  
axios.post(`https://library-management-fullstack.onrender.com/api/exit/${id}`)
   .then((res)=>{
      const newExitTime = res.data.attendance.exitTime
      setallStudents((prev) =>
        prev.map((student) =>
          student._id === id
            ? { ...student, exitTime: newExitTime }
            : student
        )
      )
      
      
    })
    .catch((err)=>{
      console.log(err.response?.data?.message || err.message)
    })
}

function formatTime(time) {
  if (!time) return ""
  
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
}


 const filterData =   (allStudents || []).filter((student)=>{
   return student.RollNo.toString().includes(searchStd)
 })
 

const dataRender = searchStd ? filterData : allStudents;

return (
  <div className={styles.container}>
         <div className={styles.header}>
           <h2>Students</h2>
           <p>make entry/exit</p>
         </div>
  <div className={styles.Content}>
      <input
      type="text"
      placeholder="Search by Rollno..."
      onChange={(e) => {
        setsearchStd(e.target.value)
      }}
      value={searchStd}
    />

    <table className={styles.studentTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Entry</th>
          <th>Exit</th>
        </tr>
      </thead>

      <tbody>
  
        { dataRender.length  ? (
          dataRender.map((student) => (
            <tr key={student._id}>
              <td>{student.Name}</td>
              <td>{student.RollNo}</td>
              <td>
                {student.entryTime ? (
                  formatTime(student.entryTime)
                ) : (
                  <button
                    className={styles.entryBtn}
                    onClick={() => {
                      getEntryTime(student._id)
                    }}
                  >
                    Entry
                  </button>
                )}
              </td>
              <td>
                {student.entryTime && student.exitTime  ? (
                  formatTime(student.exitTime)
                ) : (
                  <button
                    className={styles.exitBtn}
                    onClick={() => {
                      getExitTime(student._id)
                    }}
                  >
                    Exit
                  </button>
                
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Student Not Exist</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  </div>
)


}


export default Studentdashboard
