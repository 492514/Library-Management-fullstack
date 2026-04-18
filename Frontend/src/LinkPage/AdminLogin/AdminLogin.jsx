import React from 'react'
import styles from '../AdminLogin/AdminLogin.module.css'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";



const Adminlogin = () => {
  
const navigate = useNavigate();
 const [error,setError] = useState("")

function errorFind(){
setTimeout(()=>{
setError("")
},3000)
} 
  
function login(e){
  e.preventDefault()
  const {Email,Password} = e.target.elements

  axios.post("https://library-management-fullstack.onrender.com/api/Admin/login",{
  email:Email.value,
  password:Password.value
  },{withCredentials:true}
)
   .then((data)=>{
     setError(data.data.message)
     navigate("/Admin/Dashboard")
   })
   
   .catch((err)=>{
    errorFind()
      setError(err.response?.data?.message || "Internal Server Error")
   })
}


  return (
<div className={styles.Container}>
  
  {/* Header */}
  <div className={styles.header}>
   
    <p>Admin login</p>
  </div>

  {/* Content */}
  <div className={styles.content}>

    <div className={styles.iconBox}>
      <span>👤</span>
    </div>

    <p className={styles.subtitle}>Enter admin credentials</p>

    {error && <div className={styles.error}>{error}</div>}

    <form onSubmit={(e)=>{login(e)}}>

      <label>Email</label>
      <input name='Email' type="text" placeholder="admin@library.com" />

      <label>Password</label>
      <input name='Password' type="password" placeholder="••••••••" />

      <button className={styles.loginBtn}>Login</button>

    </form>
  </div>
</div>
  )
}

export default Adminlogin
