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
import Certificate from './Pages/Trainers/BatchCertificate';
import AddAttendance from './Pages/Trainers/AddAttendance';

import Atten from './Pages/Trainers/Attendance';
import AttendancePage from './Pages/Trainers/AttendancePage';
import CertificatePage from './Pages/Trainers/CertificatePage';


import StudentsAttendance from './Pages/Trainers/StudentsAttendance';
import DateAttendance from './Pages/Trainers/DateAttendance';

import LoginOtp from './Pages/LoginOtp';
import VerifyOtp from './Pages/VerifyOtp';

import Test from './Pages/Trainers/Test';

import 'fontsource-montserrat';

import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';

function App() {

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
          <Route path="/attn" element={<Atten/>} />

          <Route path='/' element={<Home />}>
              <Route index element={<AllBatchesT />} />
              <Route path='/batch/:id/attendance/mark/:date' element={<AddAttendance />} />
              <Route path='/batch/:id' element={<Batch />} >
                <Route index element={<Overview />} />
                <Route path='/batch/:id/overview' element={<Overview />} />
                <Route path='/batch/:id/students' element={<Students />} />
                <Route path='/batch/:id/attendance' element={<Attendance />} />
                <Route path='/batch/:id/certificate' element={<Certificate />} />
              </Route>

          </Route>


          <Route path='/certificate/:batch/:student' element={<CertificatePage />} />

          <Route path='/batch/:id/apage' element={<AttendancePage />} />
          <Route path='/sa' element={<StudentsAttendance />} />
          <Route path='/da' element={<DateAttendance />} />

          <Route path='/test' element={<Test />} />

      </Routes> 
      
        
    </BrowserRouter>
);

};

export default App;
