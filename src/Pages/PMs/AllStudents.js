import React, { useState, useEffect } from "react";
import {useParams,Link, useNavigate } from 'react-router-dom';

import { where, collection, getDocs, query,  updateDoc, doc, onSnapshot} from "firebase/firestore";
import { onAuthStateChanged  } from 'firebase/auth';
import { db, auth} from '../../firebase';


import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, IconButton, Typography,  Container, Tabs, Tab, List, ListItem,
        ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction,  Menu, MenuItem, useMediaQuery, CircularProgress} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const [userPhone, setUserPhone] = useState("")
  
  
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserPhone(user.phoneNumber);
        console.log(user);
      });
    },[])
  
  

    useEffect(() => {
      fetchData();
    }, [userPhone]);


    const fetchData = async () => {

      const trainerRef = doc(db, 'pms', userPhone);
      const unsubscribe = onSnapshot(trainerRef, (doc) => {
        const data = doc.data();
        if (data && data.students) {
          setStudents(data.students);
          setIsLoading(false);
        }
      });

      return () => unsubscribe();

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
      navigate(`/student/${student.batchId}/${student.studentId}`);
    }


  
    const handleEditClick = (student) => {
      navigate(`/pm/batch/${student.batchId}/student/${student.studentId}`);
    
    };





    const getAvatarColor = (index) => {
      const colors = [ "#EA4335", "#FBBC05", "#34A853", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
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
                <ListItem component={Link} to={`/pm/batch/${student.batchId}/student/${student.studentId}`} key={index}>
                  
                  <ListItemAvatar>
                   <Avatar src={student.imageUrl} sx={{ bgcolor: getAvatarColor(index),  alignItems:'center', textAlign:'center'}} >
                    {student.studentName[0]}</Avatar>
                  </ListItemAvatar>

                  {! isSmallScreen ? (
                    <>
                      <ListItemText sx={{color: "text.primary",}} style={{width:"30%"}} primary={student.studentName}  />
                      <ListItemText secondary={student.batchName} />
                    </>
                  ) : (
                    <ListItemText sx={{color: "text.primary",}}
                    primary={student.studentName} 
                    secondary={student.batchName}
                  />
                  )}

                  <ListItemSecondaryAction>

                    <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                      <MoreVert />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                     <MenuItem onClick={() => handleStudentPage(selectedStudent)}>View</MenuItem>
                      <MenuItem onClick={() => handleEditClick(selectedStudent)}>Edit</MenuItem>
                    </Menu>

                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
       
        </CardContent>
      </Card>


      {/* <Dialog open={open} onClose={() => setOpen(false)}>

      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Add Students
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>


        <DialogContent>
         <AddStudent handleSubmitStudent={handleSubmitStudent} id={id}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog> */}


      
    </Container>
)}

</div>
  );

}

export default BatchStudents;
