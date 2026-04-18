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
<div className={styles.container}>

  {/* Header */}
  <div className={styles.header}>
    <p>Delete student</p>
  </div>

  {/* Search */}
  <div className={styles.content}>
    {error && <div className={styles.error}>{error}</div>}

    <input
      required
      value={searchStd}
      className={styles.searchInput}
      type="text"
      placeholder="Search by roll no..."
      onChange={(e) => {
        setsearchStd(e.target.value);
        searchStudent(e.target.value);
      }}
    />

    <p className={styles.count}>
      {searchStd === "" ? allStudents.length : filterStudent.length} students registered
    </p>

    {/* Student List */}
    <div className={styles.list}>
      {(searchStd === "" ? allStudents : filterStudent).length > 0 ? (
        (searchStd === "" ? allStudents : filterStudent).map((val) => (
          
          <div key={val._id} className={styles.card}>

            {/* Left */}
            <div className={styles.left}>
              <div className={styles.avatar}>
                {val.Name?.charAt(0)}
              </div>

              <div>
                <p className={styles.name}>{val.Name}</p>
                <p className={styles.info}>
                  Roll: {val.RollNo} · Seat {val.SeatNo}
                </p>
              </div>
            </div>

            {/* Right */}
            <button
              className={styles.deleteBtn}
              onClick={() => {
                setselectId(val._id);
                setshowModal(true);
              }}
            >
              Delete
            </button>

          </div>
        ))
      ) : (
        <p className={styles.noData}>Student Not Exist</p>
      )}
    </div>
  </div>

  {/* Modal */}
 {showModal && (
  <div className={styles.modalOverlay}>
    
    <div className={styles.modal}>

      {/* Icon */}
      <div className={styles.iconBox}>🗑️</div>

      {/* Title */}
      <h2>Delete student?</h2>

      {/* Description */}
      <p className={styles.desc}>
        Student all data will be removed.
      </p>

      

      {/* Buttons */}
      <div className={styles.modalBtns}>
        <button
          className={styles.cancelBtn}
          onClick={() => setshowModal(false)}
        >
          Cancel
        </button>

        <button
          className={styles.confirmBtn}
          onClick={() => {
            DeleteStudent();
            setshowModal(false);
          }}
        >
          Yes, delete
        </button>
      </div>

    </div>
  </div>
)}
</div>
);
}

export default DeleteStudent