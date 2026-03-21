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

  axios.post("http://localhost:3000/api/Admin/login",{
  email:Email.value,
  password:Password.value
  },{withCredentials:true}
)
   .then((data)=>{
     setError(data.data.message)
     navigate("/Admin/Dashboard")
   })
   
   .catch((err)=>{
      setError(err.response?.data?.message || "Internal Server Error")
   })
}


  return (
    <div className={styles.Container}>
       {error && <div className={styles.error}>{error}</div>}
      <p>Admin Login</p>
      
       <form onSubmit={(e)=>{login(e),errorFind()}}>
        <input name='Email' type="text" placeholder='Email' required />
         <input name='Password' type="password" placeholder='Password' required/>
        <button>LogIn</button>
       </form>
      
    </div>
  )
}

export default Adminlogin
