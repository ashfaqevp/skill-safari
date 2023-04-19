import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs, where, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Container,  Card,  CardHeader,  CardContent,  Grid,  Typography,  FormGroup,  FormControlLabel,  Switch,  Button,  TableContainer,  Table,  TableHead,  TableRow,  TableCell,  TableBody,  Avatar,  IconButton, Box,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';


const useStyles = makeStyles(() => ({
  container: {

    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  card: {
    marginTop: useTheme().spacing(4),
    marginBottom: useTheme().spacing(4),
    maxWidth: '70%',
    margin: '0 auto',
    [useTheme().breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: useTheme().spacing(2),
    },
  },
  backButton: {
    marginRight: useTheme().spacing(1),
  },
  switchLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: useTheme().spacing(2),
  },
}));

// Attendance Page component
const AttendancePage = () => {
  const classes = useStyles();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({})

  useEffect(() => {
    fetchData();
    console.log(new Date().toISOString().split('T')[0]);

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

  // const handleSubmit = async () => {
  //   try {
  //     const attendanceRef = collection(db, "attendance");
  //     const newAttendanceDoc = await addDoc(attendanceRef, attendance);
  //     console.log(`Attendance record saved with ID: ${newAttendanceDoc.id}`);
  //   } catch (error) {
  //     console.error("Error saving attendance record:", error);
  //   }
  // };


  const handleSubmit = async () => {
    try {
      // const date = new Date().toISOString().split('T')[0];
      const date = "2023-04-07"
      // Create attendance data object for Firestore
      const attendanceDoc = {
        date,
        students: attendance
      };

      // Add attendance data to Firestore
      await setDoc(doc(db, 'attendance', date), attendanceDoc);

      const batch = db.batch();

      // Update attendance data for each student in Firestore
      await Promise.all(
        students.map(student =>
          setDoc(
            doc(db, 'students', student.phone, 'attendance', date),
            { attendance: attendance[student.phone] }
          )
        )
      );

      console.log('Attendance data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading attendance data:', error);
    }
  };




  // const handleSubmit = async () => {
  //   try {
  //     // const date = new Date().toISOString().split('T')[0];
  //     const date = "2023-04-07"
  //     // Create attendance data object for Firestore
  //     const attendanceDoc = {
  //       date,
  //       students: attendance
  //     };

  //     // Add attendance data to Firestore
  //     await setDoc(doc(db, 'attendance', date), attendanceDoc);

  //     // Update attendance data for each student in Firestore
  //     await Promise.all(
  //       students.map(student =>
  //         setDoc(
  //           doc(db, 'students', student.phone, 'attendance', date),
  //           { attendance: attendance[student.phone] }
  //         )
  //       )
  //     );

  //     console.log('Attendance data uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading attendance data:', error);
  //   }
  // };


  // const handleSubmit = async () => {
  //   try {
  //     // const date = new Date().toISOString().split('T')[0];
  //     const date = "2023-04-07"
  //     // Create attendance data object for Firestore
  //     const attendanceDoc = {
  //       date,
  //       students: attendance
  //     };

  //     // Add attendance data to Firestore
  //     await setDoc(doc(db, 'attendance', date), attendanceDoc);

  //     const AttendanceText ="attendance";

  //     // Update attendance data for each student in Firestore
  //     await Promise.all(
  //       students.map(student =>

        
  //         setDoc(
  //           doc(db, 'students', student.phone, date  ),
  //           { date: attendance[student.phone] }
  //         )
  //       )
  //     );

  //     console.log('Attendance data uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading attendance data:', error);
  //   }
  // };


  // useEffect(() => {
  //   const totalStudents = students.length;
  //   const totalPresent = Object.keys(attendance).length;
  // }, [students,attendance]);



  // const handleToggle = (id) => {
  //   const updatedStudents = students.map((student) =>
  //     student.id === id ? { ...student, present: !student.present } : student
  //   );
  //   setStudents(updatedStudents);
  // };

  const handleChange = (studentId) => (event) => {
    setAttendance({ ...attendance, [studentId]: event.target.checked });
  };

  const handleSave = () => {
    // Save the attendance data
    console.log(students);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          title="Attendance"
          action={
            <IconButton
              aria-label="back"
              color="primary"
              className={classes.backButton}
            >
              <ArrowBackIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                Batch: Batch Name
              </Typography>
              <Typography variant="subtitle2" align="center">
                Date: 06 April 2023
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                Total Students: {students.length}
              </Typography>
              <Typography variant="subtitle2" align="center">
                Total Present: {Object.values(attendance).filter(val => val === true).length}
              </Typography>
            </Grid>
          <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.phone}>
                        <TableCell>
                          <Avatar>{student.name.charAt(0)}</Avatar>
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell align="center">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={attendance[student.phone]}
                                  onChange={ handleChange(student.phone)}
                                  // name={student.name}
                                />
                              }
                              label=""
                              className={classes.switchLabel}
                            />
                          </FormGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>

          <Grid item xs={12}>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Mark Attendance
            </Button>
          </Box>

           </Grid>


                  {/* <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell>Student Name</TableCell  */}
           </Grid> 
        </CardContent>
        </Card>
        </Container>
    );

}

export default AttendancePage;
