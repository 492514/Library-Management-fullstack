import React from 'react'
import axios from 'axios'
import styles from "../StudentHistory/StudentHistory.module.css"
import { useState } from 'react'
import { useEffect } from 'react'


const StudentHistory = () => {

const [Group, setGroup] = useState({})
const [openDate, setopenDate] = useState(null)
const [error, setError] = useState("")

  function showError(message) {
    setError(message)
    setTimeout(() => {
      setError("")
    }, 3000)
  }

function getAttendance(){
    axios.get("https://library-management-fullstack.onrender.com/api/Attendance")
    .then((res)=>{
     const data = res.data.attendanceHistory
     
     const result = data.reduce((acc,item)=>{
      if(!acc[item.date]){
        acc[item.date] = []
      }
      acc[item.date].push(item)
      return acc
     },{})
     setGroup(result)
    }).catch((err)=>{
       showError(err.response?.data?.message || err.message)
    })
}
  
function toggleBox(date){
if(openDate === date){
    setopenDate(null)
}else{
    setopenDate(date)
}
}

  function formatTime(time) {
    if (!time) return ""
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

useEffect(()=>{
    getAttendance()
},[])



 return (
    <div className={styles.historyContainer}>
      <h2 className={styles.heading}>Attendance History</h2>

      {error && <p className={styles.error}>{error}</p>}

      {Object.keys(Group).length > 0 ? (
        Object.keys(Group).map((date) => (
          <div key={date} className={styles.dateBox}>
            <div
              className={styles.dateHeader}
              onClick={() => toggleBox(date)}
            >
              <span>{date}</span>
              <span>{openDate === date ? "▲" : "▼"}</span>
            </div>

            {openDate === date && (
             <div
          className={`${styles.tableWrapper} ${
               openDate === date ? styles.open : styles.closed
            }`}>
         <table className={styles.historyTable}>
         <thead>
           <tr>
             <th>Name</th>
             <th>Roll No</th>
             <th>Entry</th>
             <th>Exit</th>
           </tr>
        </thead>
       <tbody>
       {Group[date].map((student) => (
        <tr key={student._id}>
          <td>{student.studentName}</td>
          <td>{student.studentRollNO}</td>
          <td>{formatTime(student.entryTime)}</td>
          <td>{formatTime(student.exitTime)}</td>
        </tr>
      ))}
     </tbody>
   </table>
  </div>
    )}
     </div>
    ))
      ) : (
        <p className={styles.noData}>No Attendance History Found</p>
      )}
    </div>
  )
}

export default StudentHistory
