import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../Role/Role.module.css'
const Roleseclect = () => {
const navigate = useNavigate();
const [Isauth, setIsauth] = useState(null)

function verifyAdmin(){
  axios.get("http://localhost:3000/api/Admin/verify",{withCredentials: true})
  .then(()=>{
   setIsauth(true)
  })
  .catch(()=>{
    setIsauth(false)
  })
}

useEffect(()=>{
  verifyAdmin()
},[])

  return (
    <div>
      <div className={styles.Container}>
        <p>Seclect Role</p>
        <button className={styles.btn}
         onClick={() =>{
         Isauth ? navigate("/Admin/Dashboard") : navigate("/Admin-login")
        }}>
          Admin
          </button>
        <button className={styles.btn}
        onClick={() =>{
          navigate("/Student")
        }}
        >
          Student</button>
      </div>
    </div>
  )
}

export default Roleseclect
