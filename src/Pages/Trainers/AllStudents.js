import React, { useState, useEffect } from "react";
import {useParams,Link, useNavigate } from 'react-router-dom';

import { deleteDoc, collection, getDocs, getDoc,  updateDoc, doc, onSnapshot} from "firebase/firestore";
import { onAuthStateChanged  } from 'firebase/auth';
import { db, auth} from '../../firebase';


import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, IconButton, Typography,  Container, Tabs, Tab, List, ListItem,
        ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction,  Menu, MenuItem, useMediaQuery, CircularProgress,
        Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { MoreVert, Close, Add } from "@mui/icons-material";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
    borderBottom: `1px solid ${useTheme().palette.divider}`,
    marginBottom:0,
  },


  content: {
    paddingTop: 0,
    marginTop:0,
    marginBottom:0,
    paddingBottom:0
  },


}));


function BatchStudents() {

    const classes = useStyles();
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

   
    const [anchorEl, setAnchorEl] = useState(null);
    const [students, setStudents] = useState([]);


    const [selectedStudent, setSelectedStudent] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
  
 
    const [userBatches, setUserBatches] = useState({});
    const [userPhone, setUserPhone] = useState("")
    const [batches, setBatches] = useState([]);
  
  
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserPhone(user.phoneNumber);
        console.log(user);
      });
    },[])


    useEffect(() => {
        async function fetchData() {
        setIsLoading(true);
        const docRef = doc(db, 'trainers', userPhone);
        const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log(docSnap.data().batches);
            setUserBatches(docSnap.data().batches)
          } else {
            console.log('No such document!');
          }
        }
        fetchData();  
      }, [userPhone]);
      

   
    useEffect(() => {
      getAllStudents();
    }, [userBatches]);


    const getAllStudents = async () => {
      try {
        const batchesRef = collection(db, 'batches');
       // const batchSnapshot = await getDocs(batchesRef);
    
        const studentsArray = [];
    
        await Promise.all(userBatches.map(async (batchId) => {
        //   const batchId = batchDoc.id;
          const studentsRef = collection(db, 'batches', batchId, 'students');
          const studentsSnapshot = await getDocs(studentsRef);
    
          studentsSnapshot.forEach((studentDoc) => {
            const studentData = studentDoc.data();
            studentsArray.push({
              batchId,
              ...studentData,
            });
          });
        }));
    
        console.log('All students:', studentsArray);
        setStudents(studentsArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error retrieving students:', error);
        setIsLoading(false);
      }
    };

    

  
    const handleOptionMenuClick = (event, student) => {
      setAnchorEl(event.currentTarget);
      setSelectedStudent(student);
    };
  
    const handleOptionMenuClose = () => {
      setAnchorEl(null);
      setSelectedStudent(null);
    };
  

    const navigate = useNavigate();

 


    const handleStudentPage = (student) => {
      navigate(`/student/${student.batchId}/${student.phone}`);
    }


  
    const handleDeleteClick = () => {
      setConfirmOpen(true);
      
    };
  
    const handleDeleteConfirm = async () => {
      try {
          const batchId = selectedStudent.batchId;
          const studentId = selectedStudent.phone;
          const studentRef = doc(db, 'batches', batchId, 'students', studentId);
          await deleteDoc(studentRef);
          setConfirmOpen(false);
          setSelectedStudent(null);
          handleOptionMenuClose();
          getAllStudents();
          toast.success(' Student deleted successfully ', {
            position: toast.POSITION.TOP_CENTER,
          });

        } catch (error) {
          console.error('Error deleting student:', error);
        }

   
    };



    const handleEditClick = (student) => {
      navigate(`/tr/batch/${student.batchId}/student/${student.phone}`);
    };
  



    const getAvatarColor = (index) => {
        const colors = [ "#EA4335", "#FBBC05", "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
        const colorIndex = index % colors.length;
        return colors[colorIndex];
    };

  return (

    <div className={classes.root}>

    {isLoading ? (

          <div style={{ display: "flex", justifyContent: "center",alignItems: "center", height: "60vh",}}>
             <CircularProgress />
          </div>  

          ) : (

    <Container maxWidth="lg" className={classes.root}>
      <Card className={classes.card}>

          <CardHeader sx={{marginBottom:0, paddingBottom:0}}
              title={
                <div className={classes.header} >
                <Typography variant="h5" component="h3">
                  Students
                </Typography>
                {/* <Button onClick={() => setOpen(true)} variant="contained" color="primary" sx={{ ml: 2 }} startIcon={<Add />}>
                  Add Student
                </Button> */}
              </div>
              }
          />

        
        <CardContent className={classes.content}>

            <List>
              {students.map((student, index) => ( 
                <ListItem component={Link} to={`/tr/batch/${student.batchId}/student/${student.phone}`} key={student.phone}>
                  
                <ListItemAvatar>
                   <Avatar src={student.imageUrl} sx={{ bgcolor: getAvatarColor(index),  alignItems:'center', textAlign:'center', marginRight:"20px"}} >
                    {student.name[0]}</Avatar>
                </ListItemAvatar>

                  {! isSmallScreen ? (
                    <>
                      <ListItemText sx={{width:"30%", color: "text.primary", marginLeft:"10px"}} primary={student.name}  />
                      <ListItemText secondary={student.phone} />
                      <ListItemText secondary={student.batchId} />
                    </>
                  ) : (
                    <ListItemText sx={{width:"30%", color: "text.primary"}}
                    primary={student.name} 
                    secondary={student.batchId}
                  />
                  )}

                  <ListItemSecondaryAction>

                    <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                      <MoreVert />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                     <MenuItem onClick={() => handleStudentPage(selectedStudent)}>View </MenuItem>
                      <MenuItem onClick={() => handleEditClick(selectedStudent)}>Edit </MenuItem>
             
                      <MenuItem onClick={() => handleDeleteClick(selectedStudent)}>Remove from Batch </MenuItem>
                    </Menu>

                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
       
        </CardContent>
      </Card>



      {/* Confirm dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this student?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>


      
    </Container>

)}

</div>
  );
}

export default BatchStudents;
