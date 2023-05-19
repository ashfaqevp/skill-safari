import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { where, collection, getDocs, query, orderBy, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Button,  useMediaQuery, Card, CardHeader, CardContent, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';


const useStyles = makeStyles(() => ({

  root: {
    paddingTop: useTheme().spacing(4),
    paddingBottom: useTheme().spacing(4),
    [useTheme().breakpoints.down('sm')]: {

      paddingBottom: useTheme().spacing(8),
    },
  },

  card: {
    width: '100%',
    [useTheme().breakpoints.down('sm')]: {
      width: '100%',
      marginBottom:24,
    },
  },


  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    paddingBottom: 16,
    // borderBottom: `1px solid ${useTheme().palette.divider}`,
    marginBottom:0,
  },


  content: {
    paddingTop: 0,
    marginTop:0,
    marginBottom:0,
    paddingBottom:0
  },


    tableContainer: {
      [useTheme().breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },

    tableHead: {
      backgroundColor: '#F5F5F5',
    },

    tableCell: {
      padding: useTheme().spacing(1),
    },

    buttonContainer: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
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
  const [completionDate, setCompletionDate] = useState("12/04/2023");
  const [usedColors, setUsedColors] = useState([]);

  const [students, setStudents] = useState([]);
  const [eligibleStud, setEligibleStud] = useState([]);
  const [notEligibleStud, setNotEligibleStud] = useState([]);

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
      setCompletionDate(docSnap.data().endingDate);
      
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

      const nonEligibleStud = students.filter(student => {
        return !eligibleStud.some(eligibleStudent => eligibleStudent.id === student.id);
      });
      
      setNotEligibleStud(nonEligibleStud);  



    console.log(presentCount[id]);

  }, [students, presentCount, workingDays]);


  const handleView = (studentId) => {
      const batch = encrypt(id);
      const student = encrypt(studentId)
      navigate(`/certificate/${batch}/${student}`)

  }


  const getAvatarColor = (index) => {
    const colors = [ "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };


  const eligibleStudRow = eligibleStud.map((student, index) => (
    <TableRow key={student.id}>
      <TableCell className={classes.tableCell} sx={{display:"flex"}}>
      <Avatar src={student.imageUrl} style={{marginRight:"5px"}} sx={{ bgcolor: getAvatarColor(index)}}>
                    {student.name[0]}</Avatar>
        {/* <Avatar sx={{ bgcolor: getRandomColor(), marginRight:"5px" }}>{student.name.charAt(0)}</Avatar> */}
        <Typography variant="body1" sx={{margin:"5px"}}>{student.name}</Typography>
      </TableCell>
      {/* <TableCell className={classes.tableCell}>{student.name}</TableCell> */}

    <TableCell className={classes.tableCell}>{student.phone}</TableCell>
    <TableCell className={classes.tableCell}>{Math.floor ((presentCount[student.id] / workingDays )* 100) }%</TableCell>

    {/* <TableCell className={classes.tableCell}>{presentCount[student.id] }%</TableCell> */}
    <TableCell className={classes.tableCell}>
      <div className={classes.buttonContainer}>
        <Button variant="contained" size="small"  color="inherit" style={{ backgroundColor: grey[500], color:"white" }} startIcon={<MailIcon />} onClick={() => window.location.href=`mailto:${student.email}`}>
          Send Mail
        </Button>
        <Button variant="contained" size="small"  color="primary" startIcon={<ArrowForwardIosIcon />} onClick={() => handleView(student.id)}>
          View 
        </Button>
      </div>
    </TableCell>
  </TableRow>
  ));

  const nonEligibleStudRow = students
  .filter((element) => !eligibleStud.includes(element))
  .map((student) => (
        <TableRow key={student.id}>
          <TableCell className={classes.tableCell} sx={{display:"flex"}}>
            <Avatar src={student.imageUrl}  sx={{  marginRight:"5px" }}>{student.name.charAt(0)}</Avatar>
            <Typography color="textSecondary" variant="body1" sx={{margin:"5px"}}>{student.name}</Typography>
          </TableCell>
          {/* <TableCell className={classes.tableCell}>{student.name}</TableCell> */}

        <TableCell className={classes.tableCell} style={{ color: 'gray' }}>{student.phone}</TableCell>
        <TableCell className={classes.tableCell} style={{ color: 'gray' }}>{Math.floor ((presentCount[student.id] / workingDays )* 100) }%</TableCell>

        {/* <TableCell className={classes.tableCell}>{presentCount[student.id] }%</TableCell> */}
        <TableCell className={classes.tableCell}>
          <div className={classes.buttonContainer}>
            <Button disabled variant="contained" size="small" color="primary" startIcon={<MailIcon />} onClick={() => window.location.href=`mailto:${student.email}`}>
              Send Mail
            </Button>
            <Button disabled variant="contained" size="small"  color="primary" startIcon={<ArrowForwardIosIcon />} onClick={() => handleView(student.id)}>
              View 
            </Button>
          </div>
        </TableCell>
    </TableRow>
  ));



  return (
   
    <Container maxWidth="lg" className={classes.root}>

       {/* {completed ? ( */}
          
          <div >

            <Card className={classes.card}>

            <CardHeader sx={{marginBottom:0, paddingBottom:0}}
                title={
                  <div className={classes.header} >
                  <Typography variant="h5" component="h3">
                    Eligible Students
                  </Typography>
                </div>
                }
            />

            <CardContent className={classes.content}>
           

            <TableContainer >
              <Table >
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Name</TableCell>
                    <TableCell className={classes.tableCell}>Phone Number</TableCell>
                    <TableCell className={classes.tableCell}>Attendance </TableCell>
                    <TableCell className={classes.tableCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eligibleStudRow}
                  {nonEligibleStudRow}
                </TableBody>
              </Table>
            </TableContainer>

          </CardContent>
      </Card>

          </div>
        {/* ) : (

            <div className={classes.courseNotCompleted}>
                <span className={classes.smilingFace} role="img" aria-label="Smiling face">😊</span>
                <p>Certificates only available after {completionDate}</p>
            </div>

          )} */}
        </Container>
      );
};

export default BatchCertificate;