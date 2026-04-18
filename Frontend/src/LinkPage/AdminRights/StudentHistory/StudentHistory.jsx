import React from 'react'
import axios from 'axios'
import styles from "../StudentHistory/StudentHistory.module.css"
import { useState } from 'react'
import { useEffect } from 'react'


import { useNavigate } from 'react-router-dom'

 function AttendanceHistory() {

  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [allAttendance, setallAttendance] = useState([])

  function attendanceHistory(){
   axios.get("https://library-management-fullstack.onrender.com/api/Attendance")
   .then((res)=>{
    
        setallAttendance(res.data.attendanceHistory)
   }).catch((error)=>{
        console.log("error hai bhai")
   })
  }

    function formatTime(time) {
    if (!time) return ""
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  useEffect(()=>{
    attendanceHistory()
  },[])

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const getStatus = (val) => {
    if (!val.entryTime) return 'absent'
    if (val.entryTime && !val.exitTime) return 'inside'
    return 'exited'
  }

  const filteredAttendance = allAttendance.filter(
    (a) => a.date === selectedDate 
  )

  return (
    <div className={styles.page}>

      {/* Topbar */}
      <div className={styles.topbar}>
        
        <div className={styles.topbarInfo}>
          <h2>Attendance history</h2>
          <p>{new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        </div>
      </div>

      <div className={styles.content}>

        {/* Date input */}
        <input
          className={styles.dateInp}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Cards */}
        {filteredAttendance.length > 0 ? filteredAttendance.map((val, i) => {
          const status = getStatus(val)
          return (
            <div key={i} className={styles.aCard}>
              <div className={styles.avatar}
                style={{ background: val.avatarBg || '#7ea3c8', color: val.avatarColor || '#00376d' }}>
                {getInitials(val.studentName)}
              </div>
              <div className={styles.aInfo}>
                <div className={styles.aName}>{val.studentName}</div>
                <div className={styles.aMeta}>
                  {status === 'absent'
                    ? 'No entry today'
                    : status === 'inside'
                    ? `Entry ${formatTime(val.entryTime)}`
                    : `Entry ${formatTime(val.entryTime)} · Exit ${formatTime(val.exitTime)}`}
                </div>
              </div>
              <span className={`${styles.badge} ${
                status === 'inside'  ? styles.bIn :
                status === 'exited'  ? styles.bOut :
                styles.bAbsent
              }`}>
                {status === 'inside' ? 'In' : status === 'exited' ? 'Out' : 'Absent'}
              </span>
            </div>
          )
        }) : (
          <div className={styles.empty}>No records for this date</div>
        )}

      </div>
    </div>
  )

  
}

export default AttendanceHistory
