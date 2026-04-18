import React from 'react'

import { useEffect,useState  } from 'react';

import { useNavigate } from "react-router-dom";
import styles from '../SelectRight/SelectRight.module.css'
import axios from 'axios';

const Rightseclect = () => {
const navigate = useNavigate();
const [totalStudent, settotalStudent] = useState("")
const [presentToday, setpresentToday] = useState("")
const [availableSeats, setavailableSeats] = useState("")
const [outToday, setoutToday] = useState("")

function getSeatDetails(){
axios.get("https://library-management-fullstack.onrender.com/api/available/seats")
.then( (res) => {
  settotalStudent(res.data.occupiedSeats)
  setpresentToday(res.data.present)
  setavailableSeats(res.data.availableSeat)
  setoutToday(res.data.out)

}).catch( (error) => {
  console.log(error)
})
}

useEffect( () => {
getSeatDetails()
},[])

 return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <h2>Admin panel</h2>
        <p>Daksh parjapti Library — today</p>
      </div>

      <div className={styles.content}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.number}>{totalStudent}</div>
            <div className={styles.label}>Total students</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.number}>{presentToday}</div>
            <div className={styles.label}>Inside library</div>
           
          </div>
          <div className={styles.statCard}>
            <div className={styles.number}>{availableSeats}</div>
            <div className={styles.label}>Seats available</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.number}>{outToday}</div>
            <div className={styles.label}>Exit today</div>
          </div>
        </div>

        <div className={styles.sectionLabel}>Manage</div>

        {/* Menu */}
        <div className={styles.menuGrid}>
          <button className={styles.menuCard} onClick={() => navigate('/Admin/addStudent')}>
            <div className={`${styles.iconWrap} ${styles.icBlue}`}>
              <svg viewBox="0 0 24 24"><path d="M15 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/></svg>
            </div>
            <span>Add student</span>
          </button>

          <button className={styles.menuCard} onClick={() => navigate('/Admin/deleteStudent')}>
            <div className={`${styles.iconWrap} ${styles.icRed}`}>
              <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </div>
            <span>Delete student</span>
          </button>

          <button className={styles.menuCard} onClick={() => navigate('/Admin/attendance')}>
            <div className={`${styles.iconWrap} ${styles.icTeal}`}>
              <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            </div>
            <span>Attendance history</span>
          </button>

          <button className={styles.menuCard} onClick={() => navigate('/Admin/seatAvailability')}>
            <div className={`${styles.iconWrap} ${styles.icAmber}`}>
              <svg viewBox="0 0 24 24"><path d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"/></svg>
            </div>
            <span>Seat availability</span>
          </button>

          <button className={styles.menuCard}>
            <div className={`${styles.iconWrap} ${styles.icPurple}`}>
              <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.3-.6-3-1.2-3-2.2 0-1.1 1.1-1.9 2.9-1.9 1.9 0 2.6.9 2.7 2.2H16c-.1-1.8-1.2-3.5-3.4-4V3h-3v1.9C7.5 5.4 6 6.7 6 8.7c0 2.4 2 3.6 4.8 4.3 2.5.6 3 1.5 3 2.4 0 .7-.5 1.8-2.9 1.8-2.2 0-3.1-1-3.2-2.2H6c.2 2.2 1.8 3.5 4 3.9V21h3v-1.9c2-.4 3.6-1.6 3.6-3.7-.1-2.9-2.4-3.9-4.8-4.5z"/></svg>
            </div>
            <span>Fees tracker</span>
          </button>

          
          <button className={styles.menuCard} onClick={() => navigate("/Admin/occupiedSeats")}>
            <div className={`${styles.iconWrap} ${styles.icPurple}`}>
              <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.3-.6-3-1.2-3-2.2 0-1.1 1.1-1.9 2.9-1.9 1.9 0 2.6.9 2.7 2.2H16c-.1-1.8-1.2-3.5-3.4-4V3h-3v1.9C7.5 5.4 6 6.7 6 8.7c0 2.4 2 3.6 4.8 4.3 2.5.6 3 1.5 3 2.4 0 .7-.5 1.8-2.9 1.8-2.2 0-3.1-1-3.2-2.2H6c.2 2.2 1.8 3.5 4 3.9V21h3v-1.9c2-.4 3.6-1.6 3.6-3.7-.1-2.9-2.4-3.9-4.8-4.5z"/></svg>
            </div>
            <span>Occupied seats</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Rightseclect
