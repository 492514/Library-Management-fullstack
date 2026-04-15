import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Roleseclect from "../src/LinkPage/Role/RoleSelect"
import Adminlogin from "../src/LinkPage/AdminLogin/AdminLogin"
import ProtectedRoute from "../src/LinkPage/AdminLogin/ProtectedRoute"
import AdminRights from "../src/LinkPage/AdminRights/SelectRight/SelectRight"
import AddStudent from "../src/LinkPage/AdminRights/AddStudent/AddStudent"
import DeleteStudent from "../src/LinkPage/AdminRights/DeleteStudent/DeleteStudent"
import StudentHistory from "../src/LinkPage/AdminRights/StudentHistory/StudentHistory"
import SeatAvalable from "../src/LinkPage/AdminRights/SeatAvalable/seatAvalable"
import OccupiedSeats from "../src/LinkPage/AdminRights/OccupiedSeats/OccupiedSeat"
import Studentdashboard from "../src/LinkPage/Student/StudentDashboard"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Roleseclect />} />
        <Route path='/Admin-login' element={<Adminlogin />} />
        <Route path='/Admin/Dashboard'
         element={<ProtectedRoute><AdminRights /></ProtectedRoute>}
          />
        <Route path='/Admin/Add-Student' element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path='/Admin/Delete-Student' element={<ProtectedRoute><DeleteStudent /></ProtectedRoute>} />
        <Route path='/Admin/Attendance' element={<ProtectedRoute><StudentHistory /></ProtectedRoute>} />
        <Route path='/Admin/seatAvalable' element={<ProtectedRoute><SeatAvalable /></ProtectedRoute>} />
        <Route path='/Admin/occupiedSeats' element={<ProtectedRoute><OccupiedSeats /></ProtectedRoute>} />
        <Route path='/Student' element={<Studentdashboard />} />
      </Routes>
    </div>
  )
}

export default App

