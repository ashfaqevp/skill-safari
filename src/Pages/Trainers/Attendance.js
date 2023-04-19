import React, { useState, useEffect } from "react";
import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { db } from '../../firebase';

const AttendancePage = () => {

    const [students, setStudents] = useState([])
    const [attendance, setAttendance] = useState({})
  
    useEffect(() => {
        fetchData();
      }, []);
  
      const fetchData = async () => {
        const q = query(collection(db, "batches", "ap2050", "students" ), where( "status", "==", "active" ));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(data)
        setStudents(data);
        setAttendance(
            data.reduce((acc, student) => {
              acc[student.phone] = true; // initialize all students as present
              return acc;
            }, {})
        );
      };


//   const [attendance, setAttendance] = useState(
//     students.reduce((acc, student) => {
//       acc[student.phone] = true; // initialize all students as present
//       return acc;
//     }, {})
//   );

  const handleChange = (studentId) => (event) => {
    setAttendance({ ...attendance, [studentId]: event.target.checked });
  };

  const handleSubmit = async () => {
    try {
      const attendanceRef = collection(db, "attendance");
      const newAttendanceDoc = await addDoc(attendanceRef, attendance);
      console.log(`Attendance record saved with ID: ${newAttendanceDoc.id}`);
    } catch (error) {
      console.error("Error saving attendance record:", error);
    }
  };

  

  return (
    <FormGroup>
      {students.map((student) => (
        <FormControlLabel
          key={student.phone}
          control={
            <Switch
              checked={attendance[student.phone]}
              onChange={handleChange(student.phone)}
            />
          }
          label={student.name}
        />
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </FormGroup>
  );
};

export default AttendancePage;

