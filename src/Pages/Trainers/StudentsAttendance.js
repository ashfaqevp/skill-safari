import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, collectionGroup } from "firebase/firestore";
import { db } from '../../firebase';

const StudentsAttendance = () => {
  const [students, setStudents] = useState([]);
  const [leaveCounts, setLeaveCounts] = useState({});
  const [presentCount, setPresentCount] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const q = query(collection(db, 'students'));
      const querySnapshot = await getDocs(q);
      const studentData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentData);
       console.log(studentData[1].id)
    };
    fetchStudents();

  }, []);


  useEffect(() => {
    const fetchLeaveCounts = async () => {
      const counts = {};
      const presents = {};

      for (const student of students) {
        const attendanceRef = query(collection(db, 'students', student.id, 'dates')) ;
        const querySnapshot = await getDocs(attendanceRef);
        let count = 0;
        let present = 0;
        querySnapshot.forEach((doc) => {

          if (doc.data().attendance === false) {
            count++;
          }

          else{
            present++;
          }

        });

        counts[student.id] = count;
        presents[student.id] = present;

      }
      setLeaveCounts(counts);
      setPresentCount(presents);

    };
    fetchLeaveCounts();
  }, [students]);


  // const getLeaveTakenCount = async (student) => {
  //   let count = 0;
  //   const attendanceRef = query(
  //     collection(db, 'students', student.id, 'dates')
  //   );
  //   const querySnapshot = await getDocs(attendanceRef);
  //   querySnapshot.forEach((doc) => {
  //     if (doc.data().attendance === false) {
  //       count++;
  //     }
  //   });
  //   return count;
  // };


  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {students.map((student) => (  

          
          <li key={student.id}>
            {student.name} ({(presentCount[student.id] / (presentCount[student.id]+ leaveCounts[student.id]) )*100} leaves taken)
          </li> 


        ))}
      </ul>
    </div>
  );
}

export default StudentsAttendance;

        
        //  <li key={student.name}>
        //   {student.name} - Leave taken:
        //    {getLeaveTakenCount(student)}
        // </li> 

        //   <li key={student.id}>
        //   {student.name} ({leaveCounts[student.id]} leaves taken)
        // </li> 


          
