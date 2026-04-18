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
    console.log(res)
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

    <div className={styles.header}>
  
    <p>Available Seats</p>
  </div>



  <div className={styles.container}>
    
<div>
        <div className={styles.topBoxContainer}>
    <div className={styles.availableBox}>
      <h3>Available Seats</h3>
      <p>{avalableSeat}</p>
    </div>

    <div className={styles.occupiedBox}>
      <h3>Occupied Seats</h3>
      <p>{occupiedSeats}</p>
    </div>
  </div>
</div>

  <div className={styles.detailContainer}>
      {allSeat.map((val) => {
      return (
        <button  key={val._id} disabled={val.isBooked}>
          {val.seatNo}
        </button>
      );
    })}
  </div>

  </div>
</div>
  )
}

export default seatAvalable
