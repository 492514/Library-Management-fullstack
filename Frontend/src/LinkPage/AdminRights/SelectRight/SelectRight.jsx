import React from 'react'

import { useNavigate } from "react-router-dom";
import styles from '../SelectRight/SelectRight.module.css'
const Rightseclect = () => {
const navigate = useNavigate();

  return (
    <div>
      <div className={styles.Container}>
        <p>Welcome Admin</p>
        <button className={styles.btn}
         onClick={() =>{
          navigate("/Admin/Add-Student")
        }}>
          Add Student
          </button>
        <button className={styles.btn}
        onClick={() =>{
          navigate("/Admin/Delete-Student")
        }}
        >
        Delete Student</button>

         <button className={styles.btn}
        onClick={() =>{
          navigate("/Admin/Attendance")
        }}
        >
        Attaendance</button>
      </div>
    </div>
  )
}

export default Rightseclect
