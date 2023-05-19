import React from 'react';
import './App.css';


//ADMIN
import AdminHome from './Pages/Admin/AdminHome';
import AdminLogin from './Pages/Admin/AdminLogin';
import AllBatches from './Pages/Admin/AllBatches';
import Users from './Pages/Admin/Users';
import AllTrainers from './Pages/Admin/AllTrainers';
import AllAdmins from './Pages/Admin/AllAdmins';
import AllPms from './Pages/Admin/AllPms';
import AllStudentsA from './Pages/Admin/AllStudents';
import StudentA from './Pages/Admin/Student';

import BatchA  from './Pages/Admin/Batch';
import AttendanceA from './Pages/Admin/BatchAttendance';
import OverviewA from './Pages/Admin/BatchOverview';
import StudentsA from './Pages/Admin/BatchStudents';
import CertificateA from './Pages/Admin/BatchCertificate';
import AddAttendanceA from './Pages/Admin/AddAttendance';



//TRAINERS
import Home from './Pages/Trainers/Home';

import AllBatchesT from './Pages/Trainers/AllBatches';
import Batch  from './Pages/Trainers/Batch';
import Attendance from './Pages/Trainers/BatchAttendance';
import Overview from './Pages/Trainers/BatchOverview';
import Students from './Pages/Trainers/BatchStudents';
import Certificate from './Pages/Trainers/BatchCertificate';
import AddAttendance from './Pages/Trainers/AddAttendance';
import AllStudentsT from './Pages/Trainers/AllStudents';

import Student from './Pages/Trainers/Student';
import SDetails  from './Pages/Trainers/StudentDetails';
import SSkills from './Pages/Trainers/StudentSkill';
import SProjects from './Pages/Trainers/StudentProject';
import SBadges from './Pages/Trainers/StudentBadges';



//PROGRAM MANAGERS
import PMHome from './Pages/PMs/PmHome';
import AllStudentsPM from './Pages/PMs/AllStudents';
import StudentP from './Pages/PMs/Student';



//AUTHENTICATION
import LoginOtp from './Pages/LoginOtp';
import VerifyOtp from './Pages/VerifyOtp';
import Autherization from './Pages/Autherization';


//TESTING
import Test from './Pages/Trainers/Test';
import Testb from './Pages/Trainers/Testb';
import Testd from './Pages/Trainers/Testd';



//STATIC PAGES
import CertificatePage from './CertificatePage';
import StudentPage from './StudentPage';



import 'fontsource-montserrat';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <Routes>


          <Route path="/" element={<Autherization />} />

          
          <Route path='/certificate/:batch/:student' element={<CertificatePage />} />
          <Route path="/student/:batch/:std" element={<StudentPage />} />

          
          <Route path="/login" element={<LoginOtp/>} />
          <Route path="/verify" element={<VerifyOtp/>} />
          <Route path="/admin-login" element={<AdminLogin/>} />

          

          <Route path='/admin' element={<AdminHome />}>
              <Route index element={<AllBatches />} />

              <Route path="/admin/batches" element={<AllBatches />} />

              <Route path='/admin/batch/:id' element={<BatchA />} >
                <Route index element={<Overview />} />
                <Route path='/admin/batch/:id/overview' element={<OverviewA />} />
                <Route path='/admin/batch/:id/students' element={<StudentsA />} />
                <Route path='/admin/batch/:id/attendance' element={<AttendanceA />} />
                <Route path='/admin/batch/:id/certificate' element={<CertificateA />} />
              </Route>
              <Route path='/admin/batch/:id/attendance/mark/:date' element={<AddAttendanceA />} />

              <Route path='/admin/users' element={<Users />} >
                <Route index element={<AllTrainers />} />
                <Route path='/admin/users/trainers' element={<AllTrainers />} />
                <Route path='/admin/users/pms' element={<AllPms />} />
                <Route path='/admin/users/admins' element={<AllAdmins />} />
              </Route>

              <Route path="/admin/students" element={<AllStudentsA />} />
  
              {/* <Route path='/admin/students' element={<AllStudentsPM />} /> */}

              <Route path='/admin/batch/:id/student/:std' element={<StudentA />} >
                  <Route index element={<SDetails />} />
                  <Route path='/admin/batch/:id/student/:std/details' element={<SDetails />} />
                  <Route path='/admin/batch/:id/student/:std/skills' element={<SSkills />} />
                  <Route path='/admin/batch/:id/student/:std/projects' element={<SProjects />} />
                  <Route path='/admin/batch/:id/student/:std/badges' element={<SBadges />} />
              </Route>

              
          </Route>




          <Route path='/pm' element={<PMHome/>}>
              <Route index element={<AllStudentsPM />} />
              <Route path='/pm/students' element={<AllStudentsPM />} />
              <Route path='/pm/batch/:id/student/:std' element={<StudentP />} >
                  <Route index element={<SDetails />} />
                  <Route path='/pm/batch/:id/student/:std/details' element={<SDetails />} />
                  <Route path='/pm/batch/:id/student/:std/skills' element={<SSkills />} />
                  <Route path='/pm/batch/:id/student/:std/projects' element={<SProjects />} />
                  <Route path='/pm/batch/:id/student/:std/badges' element={<SBadges />} />
              </Route>
          </Route>




          <Route path='/tr' element={<Home />}>
              <Route index element={<AllBatchesT />} />

              <Route path="/tr/batches" element={<AllBatchesT />} />

              <Route path='/tr/batch/:id' element={<Batch />} >
                <Route index element={<Overview />} />
                <Route path='/tr/batch/:id/overview' element={<Overview />} />
                <Route path='/tr/batch/:id/students' element={<Students />} />
                <Route path='/tr/batch/:id/attendance' element={<Attendance />} />
                <Route path='/tr/batch/:id/certificate' element={<Certificate />} />
              </Route>

              <Route path='/tr/batch/:id/attendance/mark/:date' element={<AddAttendance />} />

              <Route path='/tr/batch/:id/student/:std' element={<Student />} >
                  <Route index element={<SDetails />} />
                  <Route path='/tr/batch/:id/student/:std/details' element={<SDetails />} />
                  <Route path='/tr/batch/:id/student/:std/skills' element={<SSkills />} />
                  <Route path='/tr/batch/:id/student/:std/projects' element={<SProjects />} />
                  <Route path='/tr/batch/:id/student/:std/courses' element={<SBadges />} />
              </Route>

              <Route path="/tr/students" element={<AllStudentsT />} />

              <Route path='/tr/batch/:id' element={<Batch />} >
                <Route index element={<Overview />} />
                <Route path='/tr/batch/:id/overview' element={<Overview />} />
                <Route path='/tr/batch/:id/students' element={<Students />} />
                <Route path='/tr/batch/:id/attendance' element={<Attendance />} />
                <Route path='/tr/batch/:id/certificate' element={<Certificate />} />
              </Route>

          </Route>


  
          <Route path='testb' element={<Testb/>} />
          <Route path='test' element={<Test/>} />
          <Route path='testd' element={<Testd/>} />

     

      </Routes>  
    </BrowserRouter>
);

};

export default App;
