import React from 'react'
import styles from "../OccupiedSeats/OccupiedSeat.module.css"
import axios from "axios"
import {useState,useEffect} from "react"

const OccupiedSeat = () => {
const [occupiedSeats, setoccupiedSeats] = useState([])
const [seatSearch, setseatSearch] = useState("")

function allSeats(){
  
axios.get("https://library-management-fullstack.onrender.com/api/occupied/Seats")
.then((res)=>{

setoccupiedSeats(res.data.occupiedSeats)
}).catch((err)=>{
console.log(err)
})
}

useEffect(()=>{
allSeats()
},[])

const dataFilter = occupiedSeats.filter((seat)=>{
return seat.seatNo.toString().includes(seatSearch)
})

const dataShow = seatSearch ? dataFilter : occupiedSeats;

return (
    
<div className={styles.Container}>
    <div className={styles.header}>
  
    <p>Occupied Seats</p>
  </div>

<div className={styles.mainContainer}>
  <div  className={styles.searchInputBox}>
    <input
    type="text"
    placeholder="Search seats..."
    className={styles.searchInput}
    onChange={(e) => setseatSearch(e.target.value)}
  />
</div>

<div className={styles.detailBox}>
    <div className={styles.seatGrid}>
    {dataShow.length ? (
      dataShow.map((val, index) => (
        <div key={index} className={styles.seatCard}>
          
          <div className={styles.seatNo}>
            {`seat- ${val.seatNo}`}
          </div>

          <div className={styles.studentInfo}>
            <p><strong>{val.bookedBy?.Name}</strong></p>
            <p>{val.bookedBy?.FatherName}</p>
            <p>Roll: {val.bookedBy?.RollNo}</p>
          </div>

        </div>
      ))
    ) : (
      <p className={styles.error}>No Seat Found</p>
    )}
  </div>
</div>
</div>
</div>

   
  )
}

export default OccupiedSeat
