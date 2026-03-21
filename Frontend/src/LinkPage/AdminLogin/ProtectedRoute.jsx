import { Navigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const ProtectedRoute = ({children}) => {
const [Isauth, setIsauth] = useState(null)

function verifyUser(){

axios.get("http://localhost:3000/api/Admin/verify",{withCredentials: true})

.then((data)=>{
   
  setIsauth(true)
})
.catch((err)=>{
  
    setIsauth(false)
})
}

useEffect(()=>{
    verifyUser()
},[])

if(Isauth === null){
    return <h2>Loading...</h2>
}

return Isauth ? children : <Navigate to={"/Admin-login"} replace />

}

export default ProtectedRoute
