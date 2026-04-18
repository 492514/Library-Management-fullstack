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
   <div className={styles.wrapper}>
  <div className={styles.card}>
    {/* <p className={styles.title}>Welcome student</p> */}

    <div className={styles.innerCard}>
      <div className={styles.icon}>🎓</div>
      <h2>Daksh parjapti Library</h2>
      <p>Bhiwani</p>
    </div>

    <button
      className={styles.outlineBtn}
      onClick={() => {
        Isauth ? navigate("/Admin/Dashboard") : navigate("/Admin-login");
      }}
    >
      Admin login
    </button>

    <button
      className={styles.outlineBtn}
      onClick={() => {
        navigate("/Student");
      }}
    >
      Student panel
    </button>
  </div>
</div>
  )
}

export default Roleseclect
