import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { where, collection, getDocs, query, orderBy, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Button,  useMediaQuery } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      marginLeft: 240,
      [useTheme().breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    tableContainer: {
      width: '100%',
      maxWidth: 'calc(100% - 240px)',
      [useTheme().breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
      marginBottom: useTheme().spacing(3),
      marginTop: useTheme().spacing(3),
    },
    tableHead: {
      backgroundColor: '#F5F5F5',
    },
    tableCell: {
      padding: useTheme().spacing(1),
    },
    buttonContainer: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
    body: {
      backgroundColor: '#f1f8ff',
      minHeight: '100vh',
      padding: useTheme().spacing(3),
    },
    heading: {
      marginBottom: useTheme().spacing(2),
    },

    courseNotCompleted: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777',
        marginTop: '30px',
        fontSize: '1.2rem',
      },
      smilingFace: {
        fontSize: '3rem',
        marginBottom: '0.5rem',
      },

      buttonIcon: {
        marginRight: "0.5rem",
      },
      sendEmailButton: {
        textTransform: "none",
        backgroundColor: "#999999",
        color: "#ffffff",
      },
      
      'MuiButton-sendEmail': {
        backgroundColor: "#999999",
        color: "#ffffff",
      },  

  }));

const BatchCertificate = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const encrypt = str => btoa(str);
  const decrypt = str => atob(str);

  const navigate = useNavigate();

  const {id}=useParams();

  const [completed, setCompleted] = useState(false);

  const [students, setStudents] = useState([]);
  const [eligibleStud, setEligibleStud] = useState([]);

  const [workingDays, setWorkingDays] = useState(0);
  const [leaveCounts, setLeaveCounts] = useState({});
  const [presentCount, setPresentCount] = useState({});


  useEffect(() => {
    fetchData();
    fetchStudentsData();


  }, []);


  const fetchData = async () => {
    const today = new Date();

    const docRef = doc(db, 'batches', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {

      const endDate = new Date(docSnap.data().endingDate);
      console.log(endDate);
      console.log(today);
      setCompleted(today.getTime() >= endDate.getTime() || endDate.toDateString() === today.toDateString() );

      const attendanceRef = collection(db, 'batches', id, "attendance");
      const attendanceSnapshot = await getDocs(attendanceRef);
      const attendanceSize = attendanceSnapshot.size;
      setWorkingDays(attendanceSize);
      console.log(completed);

    } else {
      console.log('No such document!');
    }
  };


  const fetchStudentsData = async () => {
    const q = query(collection(db, "batches", id, "students" ), where( "status", "==", "active" ));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(data)
    setStudents(data);
  };

  useEffect(() => {
    const fetchLeaveCounts = async () => {
      const counts = {};
      const presents = {};

      for (const student of students) {
        const attendanceRef = query(collection(db, "batches", id, "students", student.id, 'attendance')) ;
        
        const querySnapshot = await getDocs(attendanceRef);
        let count = 0;
        let present = 0;
        querySnapshot.forEach((doc) => {

          if (doc.data().attendance === true) {
            present++;
          }

          else{
            
            count++;
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




  



  useEffect(() => {

    const filteredData = students.filter(element => {
      const { id } = element;
      const min = 74;

        // return presentCount.hasOwnProperty(id) && presentCount[id] > 1;
     return presentCount.hasOwnProperty(id) && (presentCount[id] / workingDays )* 100  > min;
      
    });

    setEligibleStud(filteredData);
    console.log(presentCount[id]);
    console.log(workingDays);
    console.log(presentCount);
    console.log(filteredData)
  
  }, [students, presentCount, workingDays]);


  const handleView = (studentId) => {
      const batch = encrypt(id);
      const student = encrypt(studentId)
      navigate(`/certificate/${batch}/${student}`)

  }



  return (
   
        <div className={classes.body}>

    {completed ? (
          
          <div className={classes.root}>

          

            <TableContainer component={Paper} className={classes.tableContainer}>
           
                <h1 className={classes.heading}> Eligible Students</h1>

              <Table size="small">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Name</TableCell>
                    <TableCell className={classes.tableCell}></TableCell>
                    <TableCell className={classes.tableCell}>Phone Number</TableCell>
                    <TableCell className={classes.tableCell}>Attendance </TableCell>
                    <TableCell className={classes.tableCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eligibleStud.map((student) => (
                    <TableRow key={student.id}>
                       <TableCell className={classes.tableCell}>
                         <Avatar>{student.name.charAt(0)}</Avatar>
                        </TableCell>
                        <TableCell className={classes.tableCell}>{student.name}</TableCell>
                      <TableCell className={classes.tableCell}>{student.phone}</TableCell>
                      <TableCell className={classes.tableCell}>{(presentCount[student.id] / workingDays )* 100  }%</TableCell>
                      {/* <TableCell className={classes.tableCell}>{presentCount[student.id] }%</TableCell> */}
                      <TableCell className={classes.tableCell}>
                        <div className={classes.buttonContainer}>
                          <Button variant="contained"   className={classes.sendEmailButton} startIcon={<MailIcon />} onClick={() => window.location.href=`mailto:${student.email}`}>
                            Send Mail
                          </Button>
                          <Button variant="contained" color="primary" startIcon={<ArrowForwardIosIcon />} onClick={() => handleView(student.id)}>
                            View 
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (

            <div className={classes.courseNotCompleted}>
                <span className={classes.smilingFace} role="img" aria-label="Smiling face">😊</span>
                <p>Course not completed yet</p>
            </div>

          )}
        </div>
      );
};

export default BatchCertificate;