import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebase';

const DateAttendance = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance data for the selected date from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (selectedDate !== "") {
//           const attendanceRef = collection(db, "attendance");
          
//         //   const attendanceDoc = doc(attendanceRef, selectedDate);
//         const attendanceDoc = doc(attendanceRef, "2023-04-06");
//           const attendanceSnapshot = await getDoc(attendanceDoc);
//           if (attendanceSnapshot.exists()) {
//             setAttendanceData(attendanceSnapshot.data().students);
//           } else {
//             setAttendanceData([]);
//           }
//         } else {
//           setAttendanceData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching attendance data: ", error);
//       }
//     };

//     fetchData();
//   }, [selectedDate]);


  useEffect(() => {
    const fetchData = async () => {
      try {
       
          const attendanceRef = collection(db, "attendance");
          
        //   const attendanceDoc = doc(attendanceRef, selectedDate);
        const attendanceDoc = doc(attendanceRef, "2023-04-06");
          const attendanceSnapshot = await getDoc(attendanceDoc);
          if (attendanceSnapshot.exists()) {
            setAttendanceData(attendanceSnapshot.data().students);
            console.log(attendanceSnapshot.data().students);

          } else {
            // setAttendanceData([]);
            console.log("not getting the value")
          }
         

      } catch (error) {
        console.error("Error fetching attendance data: ", error);
      }
    };

    fetchData();
  }, []);




  return (
    <div>
      <h1>Attendance Page</h1>
      <label htmlFor="datePicker">Select Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {/* {attendanceData.length > 0 ? ( */}
        <div>
          <h2>Attendance Details for {selectedDate}:</h2>
          <ul>
            {Object.entries(attendanceData).map(([studentId, attendance]) => (
              <li key={studentId}>
                Student ID: {studentId}, Attendance: {attendance ? "Present" : "Absent"}
              </li>
            ))}
          </ul>
        </div>

      {/* ) : (
        <p>No attendance data found for the selected date.</p>
      )} */}
      
    </div>
  );
};

export default DateAttendance;
