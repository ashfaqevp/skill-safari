import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import { where, collection, getDocs, query, orderBy, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';

import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Grid, Box, Card, CardMedia, CardContent, Typography, Button, TextField } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import certificate from './certificateimage.png'

const useStyles = makeStyles(() => ({
  

  root: {
    flexGrow: 1,
    height: "100vh",
    backgroundColor: "#f2f2f2",
    paddingTop: useTheme().spacing(4),
    [useTheme().breakpoints.down("sm")]: {
      paddingTop: useTheme().spacing(2),
    },
  },
  container: {
    height: "70%",
    padding: useTheme().spacing(8),
    [useTheme().breakpoints.down("sm")]: {
      padding: useTheme().spacing(2),
    },
  },
  logo: {
    width: "100%",
    maxWidth: "300px",
    marginBottom: useTheme().spacing(2),
  },


  box: {
    maxWidth: "500px",
    margin: "32px auto 0",
    display: "flex",
    alignItems: "center",
    "& .MuiTextField-root": {
      marginRight: useTheme().spacing(2),
      flex: 1,
    },
    "& .MuiButton-root": {
      height: "100%",
      flexBasis: "120px",
    },
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


  card: {
    width: 540,
    height: 310,
    backgroundImage: `url(${certificate})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '85px',
  },
  content: {
    textAlign: 'center',
  },


  
}));





function CertificatePage() {

  const classes = useStyles();

  const encrypt = str => btoa(str);
  const decrypt = str => atob(str);

  const {batch, student}=useParams();
  const bat = decrypt(batch);
  const stud = decrypt(student);

  const [copied, setCopied] = useState(false);

  const [studentData, setStudentData] = useState({});
  const [batchData, setBatchData] = useState({});

  const [completed, setCompleted] = useState(false);

  const [presentCount, setPresentCount] = useState(0);
  const [workingDays, setWorkingDays] = useState(0);


  useEffect(() => {

    const today = new Date();

    const fetchBatchData = async () => {
      const docRef = doc(db, 'batches', bat);
      const docSnap = await getDoc(docRef);
     
      if (docSnap.exists()) {
        setBatchData(docSnap.data());
        const endDate = new Date(docSnap.data().endingDate);
        setCompleted(today.getTime() >= endDate.getTime() || endDate.toDateString() === today.toDateString() );
        console.log('No such document!');

        const attendanceRef = collection(db, 'batches', bat, "attendance");
        const attendanceSnapshot = await getDocs(attendanceRef);
        const attendanceSize = attendanceSnapshot.size;
        setWorkingDays(attendanceSize);
  
      }
    };

    const fetchStudentData = async () => {
      const docRef = doc(db, 'batches', bat, 'students', stud);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudentData(docSnap.data());
        console.log('No such document!');
      }
    };

    fetchBatchData();
    fetchStudentData();
  }, []);



  useEffect(() => {
    const fetchPresentCount = async () => {
      const attendanceRef = query(collection(db, "batches", bat, "students", studentData.phone, 'attendance')) ;
      const querySnapshot = await getDocs(attendanceRef);
      
      let present = 0;
  
      querySnapshot.forEach((doc) => {
        if (doc.data().attendance === true) {
          present++;
        }
      });
  
      setPresentCount(present);
    };
  
    fetchPresentCount();
  }, [studentData]);
  




  useEffect(() => {

    const attendance = (presentCount / workingDays )* 100 

    if( attendance < 75 ){
    // setCompleted(false);
    }

    console.log(workingDays);
    console.log(presentCount);
  
  }, [studentData, presentCount, workingDays]);



  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <div className={classes.root}>
    {completed ? (
      <Grid container className={classes.container} spacing={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <img className={classes.logo} src="https://cdn.hashnode.com/res/hashnode/image/upload/v1654442559049/wSBIagQAj.png" alt="Logo" />

          <Box>
            <Typography variant="subtitle1">Student Name:</Typography>
            <Typography variant="h6" gutterBottom>
              {studentData.name}
            </Typography>
            <Typography variant="subtitle1">Course:</Typography>
            <Typography variant="h6" gutterBottom>
            {batchData.course}
            </Typography>
            <Typography variant="subtitle1">Graduation Date:</Typography>
            <Typography variant="h6">{batchData.endingDate}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>


    <Card className={classes.card}>

      <CardContent className={classes.content}>
            <Typography variant="body2" color="text.secondary">
              This is to certify that <strong>{studentData.name}</strong> has successfully completed the <strong>{batchData.course}</strong> course offered by <strong>{"Skill Safari"}</strong> and has met all the requirements for graduation.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
              Issued on: <strong>{batchData.endingDate}</strong>
            </Typography>
      </CardContent>

    </Card>


          <Box className={classes.box}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="center"
                border="1px solid #ccc"
                borderRadius={2}
                padding={1}
                bgcolor="#f2f2f2"
              >
                <InputBase
                  value={window.location.href}
                  readOnly
                  fullWidth
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={handleCopy}>
                  <FileCopyIcon />
                </IconButton>
                {copied && <span style={{ color: 'green' }}>Copied!</span>}
              </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" fullWidth>
                  Download
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

      </Grid>

      ) : (

        <div className={classes.courseNotCompleted}>
            <span className={classes.smilingFace} role="img" aria-label="Smiling face">😊</span>
            <p>Certificate Not Available</p>
        </div>

      )}


    </div>
  );
}

export default CertificatePage;

