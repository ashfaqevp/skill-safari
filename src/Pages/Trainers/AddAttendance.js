import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { collection, query, getDoc, getDocs, where, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Container,  Card,  CardHeader,  CardContent,  Grid,  Typography,  FormGroup,  FormControlLabel,  Switch,  Button,  TableContainer,  Table,  TableHead,  TableRow,  TableCell,  TableBody,  Avatar,  IconButton, Box,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const useStyles = makeStyles(() => ({
  container: {

    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    // minWidth: "100vw"
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


const AddAttendance = () => {

  const {id, date}=useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({})
  const [marked, setMarked] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        const q = query(collection(db, "batches", id, "students" ), where( "status", "==", "active" ));
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

    fetchData();
    console.log(new Date().toISOString().split('T')[0]);
    

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
       
          const attendanceRef = collection(db, "batches", id, "attendance");
          const attendanceDoc = doc(attendanceRef, date);
          const attendanceSnapshot = await getDoc(attendanceDoc);
          if (attendanceSnapshot.exists()) {
            console.log(attendanceSnapshot.data().students);
            console.log(attendance);
            setAttendance(attendanceSnapshot.data().students)
            setMarked(true);

          } else {
            
            console.log("not getting the value")
          }
         
      } catch (error) {
        console.error("Error fetching attendance data: ", error);
      }
    };

    fetchData();
  }, []);





  const handleSubmit = async () => {
    try {
 
      // Create attendance data object for Firestore
      const attendanceDoc = {
        date,
        students: attendance
      };

      // Add attendance data to Firestore
      await setDoc(doc(db, "batches", id, "attendance", date), attendanceDoc);

      // Update attendance data for each student in Firestore
      await Promise.all(
        students.map(student =>
          setDoc(
            doc(db, "batches", id, "students", student.phone, 'attendance', date),
            { attendance: attendance[student.phone] }
          )
        )
      );

      console.log('Attendance data uploaded successfully!');
      handleBack();

    } catch (error) {
      console.error('Error uploading attendance data:', error);
    }
  };




  const handleChange = (studentId) => (event) => {
    setAttendance({ ...attendance, [studentId]: event.target.checked });
  };

  const handleBack = () => {
    navigate(`/batch/${id}/attendance/`)
  }



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
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                Batch: {id}
              </Typography>
              <Typography variant="subtitle2" align="center">
                Date: {date}
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
                {marked ? (
                    <Button variant="contained" color="primary" onClick={handleSubmit}> Update Attendance </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleSubmit}> Mark Attendance </Button>
                )}
          </Box>

           </Grid>

           </Grid> 
        </CardContent>
        </Card>
        </Container>
    );

}

export default AddAttendance;
