import React from 'react'
import axios from 'axios'
import {useEffect, useState } from 'react'
import styles from '../DeleteStudent/DeleteStudent.module.css'
const DeleteStudent = () => {

  const [allStudents, setallStudents] = useState([])
  const [showModal, setshowModal] = useState(false)
  const [selectId, setselectId] = useState(null)
  const [searchStd, setsearchStd] = useState("")
  const [filterStudent, setfilterStudent] = useState([])
  const [error,setError] = useState("")
  
 function showError(message){
  setError(message)

  setTimeout(()=>{
    setError("")
  },3000)
}

function getAllStudent(){
  axios.get("https://library-management-fullstack.onrender.com/api/allusers")
  .then(({data})=>{
   
    setallStudents(data.studentFind)
   
  })
}

useEffect(()=>{
   getAllStudent()
},[])

function DeleteStudent(){
  
    axios.delete(`https://library-management-fullstack.onrender.com/api/remove-user/${selectId}`)
        .then((res)=>{
          
         setallStudents( prev =>
          prev.filter(student => student._id !== selectId)
         )
         showError(res.data.messege)
         setsearchStd("")
        })
        .catch((err)=>{
          showError(err.response?.data?.messege || "somthing Went Wrong")
        })
   
           
}

function searchStudent(value){
const result = allStudents.filter((user)=>{
if (value === ""){
     setfilterStudent([])
    
    return 
}

  return user.RollNo.toString().includes(value);
})

   setfilterStudent(result)
}

 return (
  <div className={styles.Container}>
     {error && <div className={styles.error}>{error}</div>}
    <input required value={searchStd} className={styles.searchInput} type="text" placeholder='Search RollNo...'
    onChange={(e)=>{setsearchStd(e.target.value)
      searchStudent(e.target.value)
    }}
     />
     <div className={styles.tableWrapper}>
    <table className={styles.studentTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Father Name</th>
          <th>Roll No</th>
          <th>Seat No</th>
          <th>Delete</th>
        </tr>
      </thead>

   <tbody>
  {searchStd === "" ? (
    allStudents.map((val) => (
      <tr key={val._id}>
        <td>{val.Name}</td>
        <td>{val.FatherName}</td>
        <td>{val.RollNo}</td>
        <td>{val.SeatNo}</td>
        <td>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              setselectId(val._id)
              setshowModal(true)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : filterStudent.length > 0 ? (
    filterStudent.map((val) => (
      <tr key={val._id}>
        <td>{val.Name}</td>
        <td>{val.FatherName}</td>
        <td>{val.RollNo}</td>
        <td>{val.SeatNo}</td>
        <td>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              setselectId(val._id)
              setshowModal(true)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">Student Not Exist</td>
    </tr>
  )}
</tbody>
    </table>

    {showModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <h3>Delete Student</h3>
      <p>Are you sure you want to remove this student?</p>

      <div className={styles.modalBtns}>
        <button
          className={styles.cancelBtn}
          onClick={()=>setshowModal(false)}
        >
          Cancel
        </button>

        <button
          className={styles.confirmBtn}
          onClick={() =>{DeleteStudent()
            setshowModal(false)}
          }
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
  </div>
  </div>
);
}

export default DeleteStudent