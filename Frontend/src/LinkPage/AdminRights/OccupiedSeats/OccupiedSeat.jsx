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
return seat.seatNo.toString() === seatSearch
})

const dataShow = seatSearch ? dataFilter : occupiedSeats;

return (
    
 <div className={styles.Container}>
  <p className={styles.heading}>Occupied Seats</p>
 <input type="text"
  placeholder='Search seats...'
  className={styles.searchInput}
  onChange={(e)=>{setseatSearch(e.target.value)}}
   />

    <table className={styles.studentTable}>
      <thead>
        <tr>
          <th>Seat No</th>
          <th>Name</th>
          <th>Father Name</th>
          <th>Roll No</th>
        </tr>
      </thead>

      <tbody>
        {dataShow.length ? (dataShow.map((val, index) => (
          <tr key={index}>
            
            <td>{val.bookedBy?.Name}</td>
            <td>{val.bookedBy?.FatherName}</td>
            <td>{val.bookedBy?.RollNo}</td>
            <td>{val.seatNo}</td>
          </tr>
        ))
      ):(
          <tr>
            <td colSpan="4" className={styles.error}>No Seat Found</td>
          </tr>
        
      )
    }
      </tbody>
    </table>
  </div>

   
  )
}

export default OccupiedSeat
