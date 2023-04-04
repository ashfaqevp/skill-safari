import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { addDoc, collection, Timestamp, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const AddStudent = (props) => {

  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    studentName: '',
    countryCode: '+91',
    mobileNumber: '',
    emailAddress: '',
    parentName: '',
    parentCountryCode: '+91',
    parentMobileNumber: '',
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "studentName" || name === "parentName") {
      setStudentData({
        ...studentData,
        [name]: value.charAt(0).toUpperCase() + value.slice(1), // Capitalize the first letter
      });
    } else if (name === "mobileNumber" || name === "parentMobileNumber") {
      setStudentData({
        ...studentData,
        [name]: value.replace(/\D/g,''), // Remove non-numeric characters
      });
    } else {
      setStudentData({
        ...studentData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(studentData);
    const phone = studentData.countryCode+studentData.mobileNumber;
    const docRef = doc(db, "batches/"+props.id+"/students" ,phone);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Student already exists!");
    } else {
      await setDoc(docRef, {
        name: studentData.studentName,
        email: studentData.emailAddress,
        phone:studentData.countryCode+studentData.mobileNumber,
        parent: studentData.parentName,
        parentNumber : studentData.parentCountryCode + studentData.parentMobileNumber,
        status : "active"
      });

      props.handleSubmitStudent();
    } 
  };

  return (
    <div>
      {/* <h1>Add Students</h1> */}
      <hr />
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            label="Student Name"
            name="studentName"
            value={studentData.studentName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Country Code"
            name="countryCode"
            // type="number"
            value={studentData.countryCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobileNumber"
            value={studentData.mobileNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            name="emailAddress"
            value={studentData.emailAddress}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Parent Name"
            name="parentName"
            value={studentData.parentName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Parent Country Code"
            name="parentCountryCode"
            // type="number"
            value={studentData.parentCountryCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Parent Mobile Number"
            name="parentMobileNumber"
            value={studentData.parentMobileNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid container justifyContent="flex-end">
            <Grid item>
              <Button style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>Add Student</Button>
            </Grid>
          </Grid>
      </Grid>
    </div>
  );
};

export default AddStudent;
