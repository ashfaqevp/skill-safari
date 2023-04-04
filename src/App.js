import React, { useContext, useEffect } from 'react';
import  {AuthContext}  from './Contexts/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import './App.css';

import Admin from './Pages/Admin/Admin';
import AdminLogin from './Pages/Admin/AdminLogin';
import AddBatches from './Pages/Admin/AddBatches';
import AllBatches from './Pages/Admin/AllBatches';
import AddTrainers from './Pages/Admin/AddTrainers';
import AllTrainers from './Pages/Admin/AllTrainers';

import Home from './Pages/Trainers/Home';
import AllBatchesT from './Pages/Trainers/AllBatches';
import Batch  from './Pages/Trainers/Batch';
import Attendance from './Pages/Trainers/BatchAttendance';
import Overview from './Pages/Trainers/BatchOverview';
import Students from './Pages/Trainers/BatchStudents';

import LoginOtp from './Pages/LoginOtp';
import VerifyOtp from './Pages/VerifyOtp';

import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';

function App() {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);


 

  // useEffect(()=>{
  //   const RequireAuth = ({children}) => {
  //     return currentUser ? children : <Navigate to="/admin/login"/>
  //   }
  // },[currentUser])

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/admin' element={<Admin />}>
              <Route index element={<AllBatches />} />
              <Route path="/admin/add-batches" element={<AddBatches />} />
              <Route path="/admin/batches" element={<AllBatches />} />
              <Route path="/admin/add-trainers" element={<AddTrainers />} />
              <Route path="/admin/trainers" element={<AllTrainers />} />
          </Route>
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/login" element={<LoginOtp/>} />
          <Route path="/verify" element={<VerifyOtp/>} />

          <Route path='/' element={<Home />}>
              <Route index element={<AllBatchesT />} />

              <Route path='/batch/:id' element={<Batch />} >
                <Route index element={<Overview />} />
                <Route path='/batch/:id/overview' element={<Overview />} />
                <Route path='/batch/:id/students' element={<Students />} />
                <Route path='/batch/:id/attendance' element={<Attendance />} />
              </Route>
                
              {/* <Route path="/add-batches" element={<AddBatches />} />   */}
          </Route>

      </Routes> 
      
        
    </BrowserRouter>
);

};

export default App;
