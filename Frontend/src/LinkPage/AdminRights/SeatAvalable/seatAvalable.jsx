import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from '../SeatAvalable/seatAvalable.module.css'
import { useEffect, useState } from 'react'



const seatAvalable = () => {
const navigate = useNavigate();
const [allSeat, setallSeat] = useState([])
const [avalableSeat, setavalableSeat] = useState(0)
const [occupiedSeats, setoccupiedSeats] = useState(0)

  function allSeats(){
   axios.get("https://library-management-fullstack.onrender.com/api/available/seats")
   .then((res)=>{
   let result = res.data.allSeats
   
   setallSeat(result)
   setavalableSeat(res.data.availableSeat)
   setoccupiedSeats(res.data.occupiedSeats)
   }).catch((err)=>{
    
   })
  }

  useEffect(()=>{
    allSeats()
  },[])

return (
<div className={styles.mainContainer}>

  <div className={styles.topBoxContainer}>
    <div className={styles.availableBox}>
      <h3>Available Seats</h3>
      <p>{avalableSeat}</p>
    </div>

    <div className={styles.occupiedBox}>
      <h3>Occupied Seats</h3>
      <p>{occupiedSeats}</p>
      <h4>Tap to see occupied seats? <Link className={styles.link} to="/Admin/occupiedSeats">click here</Link></h4>
    </div>
  </div>

  <div className={styles.container}>
    {allSeat.map((val) => {
      return (
        <button  key={val._id} disabled={val.isBooked}>
          {val.seatNo}
        </button>
      );
    })}
  </div>
</div>
  )
}

export default seatAvalable
