import React from 'react'
import styles from "../AddStudent/AddStudent.module.css"
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const AddStudent = () => {

    const [error,setError] = useState("")

  function showError(message){
  setError(message)

  setTimeout(()=>{
    setError("")
  },3000)
    }

    function addStudent(e){
    e.preventDefault()
    
    const {Name,fatherName,rollNo,seatNo} = e.target.elements
    if(!Name.value || !fatherName.value || !rollNo.value || !seatNo.value){
      return  showError("Fill all Details")
    }

  axios.post("https://library-management-fullstack.onrender.com/api/register",{
       Name:Name.value,
       FatherName:fatherName.value,
       RollNo:rollNo.value,
       SeatNo:seatNo.value
    })
    .then(({data})=>{
      
        showError(data.message)
        Name.value = ""
        fatherName.value = ""
        rollNo.value = ""
        seatNo.value = ""
    })
    .catch((err)=>{
         showError(err.response?.data?.message || "Something Went Wrong")
    })
    }

   
    

    return (
    <div className={styles.container}>


  <div className={styles.header}>
    
    <p>Add student</p>
  </div>


  <div className={styles.formContainer}>
    
    {error && <div className={styles.error}>{error}</div>}

    <form onSubmit={(e)=>{addStudent(e)}}>

      <label>Full name</label>
      <input name='Name' placeholder='name' type='text' required />

      <label>Father name</label>
      <input name='fatherName' placeholder='FatherName' type='text' required />

      <label>Roll number</label>
      <input name='rollNo' placeholder='RollNo' type='text' required />

      <label>Seat number</label>
      <input name='seatNo' placeholder='SeatNO' type='text' required />

      <h4>
        Tap to see available seats? 
        <Link className={styles.check} to="/Admin/seatAvailability">
          click here.
        </Link>
      </h4>

      <button type='submit' className={styles.submitBtn}>
        Register student
      </button>

    </form>
  </div>
</div>
  )
}

export default AddStudent
