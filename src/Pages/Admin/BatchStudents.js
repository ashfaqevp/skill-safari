import React, { useState, useEffect } from "react";
import {useParams,Link , useNavigate} from 'react-router-dom';

import { where, collection, getDocs, query,  updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, IconButton, Typography,  Container, Tabs, Tab, List, ListItem, DialogActions,
        ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction,  Menu, MenuItem, useMediaQuery, Button} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MoreVert, Close, Add } from "@mui/icons-material";
import AddStudent from "./AddStudent";

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

    const {id}=useParams();
    const classes = useStyles();
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [usedColors, setUsedColors] = useState([]);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [activeTab, setActiveTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [inactiveStudents, setInactiveStudents] = useState([]);


    const [open, setOpen] = useState(false);

    useEffect(() => {
      fetchData();
      fetchInactiveData();
    }, []);

    const fetchData = async () => {
      const q = query(collection(db, "batches", id, "students" ), where( "status", "==", "active" ));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(data)
      setStudents(data);
    };

    const fetchInactiveData = async () => {
      const q = query(collection(db, "batches", id, "students" ), where( "status", "==", "inactive" ));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(data)
      setInactiveStudents(data);
    };



    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
  
    const handleOptionMenuClick = (event, student) => {
      setAnchorEl(event.currentTarget);
      setSelectedStudent(student);
    };
  
    const handleOptionMenuClose = () => {
      setAnchorEl(null);
      setSelectedStudent(null);
    };
  
    const handleInactiveStudents = async (student) => {
      console.log("Inactive student:", student);
      const docRef = doc(db, "batches", id, "students", student.phone);
        await updateDoc(docRef, {
          status: "inactive"
        });
      console.log("Student deactivated successfully");
      handleOptionMenuClose();
      fetchData();
      fetchInactiveData();
    };

    const handleActivateStudents = async (student) => {
      console.log("active student:", student);
      const docRef = doc(db, "batches", id, "students", student.phone);
        await updateDoc(docRef, {
          status: "active"
        });
      console.log("Student activated successfully");
      handleOptionMenuClose();
      fetchData();
      fetchInactiveData();
    };

  

    const navigate = useNavigate();

 


    const handleStudentPage = (student) => {
      navigate(`/student/${id}/${student.phone}`);
    }


  
    const handleDeleteClick = () => {
      setConfirmOpen(true);
    };

  
    const handleDeleteConfirm = async () => {
      try {
   
          // const studentId = selectedStudent.phone;
          const studentRef = doc(db, 'batches', id, 'students', selectedStudent.phone);
          await deleteDoc(studentRef);
          setConfirmOpen(false);
          setSelectedStudent(null);
          handleOptionMenuClose();
          fetchData();
          fetchInactiveData();
          toast.success(' Student deleted successfully ', {
            position: toast.POSITION.TOP_CENTER,
          });

        } catch (error) {
          console.error('Error deleting student:', error);
        }

   
    };



    const handleEditClick = (student) => {
      navigate(`/admin/batch/${id}/student/${student.phone}`);
    };
  



    function handleSubmitStudent() {
      toast.success('New Student successfully added', {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchData();
      setOpen(false);
    }

    const getAvatarColor = (index) => {
      const colors = [ "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
      const colorIndex = index % colors.length;
      return colors[colorIndex];
    };

  return (

    <Container maxWidth="lg" className={classes.root}>
      <Card className={classes.card}>

          <CardHeader sx={{marginBottom:0, paddingBottom:0}}
              title={
                <div className={classes.header} >
                <Typography variant="h5" component="h3">
                  Students
                </Typography>
                <Button onClick={() => setOpen(true)} variant="contained" color="primary" sx={{ ml: 2 }} startIcon={<Add />}>
                  Add Student
                </Button>
              </div>
              }
          />

        
        <CardContent className={classes.content}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={"Active ("+ students.length + ")"} />
            <Tab label={"Inactive ("+ inactiveStudents.length + ")"} />
          </Tabs>
          {activeTab === 0 && (
            <List>
              {students.map((student, index) => ( 
                <ListItem 
                // component={Link} to={`/admin/batch/${id}/student/${student.phone}`}
                 key={student.phone}>

                  
                  <ListItemAvatar>

                  <ListItemAvatar >
                    <Avatar src={student.imageUrl} style={{marginRight:"10px"}} sx={{ bgcolor: getAvatarColor(index)}}>
                    {student.name[0]}</Avatar>

                  </ListItemAvatar>
                  </ListItemAvatar>

                  {! isSmallScreen ? (
                    <>
                      <ListItemText style={{width:"30%", color: "text.primary"}} primary={student.name}  />
                      <ListItemText secondary={student.phone} />
                    </>
                  ) : (
                    <ListItemText
                    primary={student.name} 
                    secondary={student.phone}
                  />
                  )}


                      

                      <ListItemSecondaryAction>

                        <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                          <MoreVert />
                        </IconButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                        <MenuItem onClick={() => handleStudentPage(selectedStudent)}>View </MenuItem>
                          <MenuItem onClick={() => handleEditClick(selectedStudent)}>Edit </MenuItem>
                          <MenuItem onClick={() => handleInactiveStudents(selectedStudent)}>Make Inactive in Batch</MenuItem>
                          <MenuItem onClick={() => handleDeleteClick(selectedStudent)}>Delete</MenuItem>
                        </Menu>

                      </ListItemSecondaryAction>
 
                  
                </ListItem>
              ))}
            </List>
          )}
          {activeTab === 1 && (
            <List>
                {inactiveStudents.map((student, index) => (

                  <ListItem 
                  // component={Link} to={`/admin/batch/${id}/student/${student.phone}`}
                   key={student.phone}>


                  <ListItemAvatar >
                    <Avatar src={student.imageUrl} style={{marginRight:"10px"}} >
                    {student.name[0]}</Avatar>
                  </ListItemAvatar>

                  {! isSmallScreen ? (
                    <>
                      <ListItemText style={{width:"30%", color: "text.primary"}} primary={student.name}  />
                      <ListItemText secondary={student.phone} />
                    </>
                  ) : (
                    <ListItemText
                    primary={student.name} 
                    secondary={student.phone}
                  />
                  )}


                  {/* <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                      <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                      <MenuItem onClick={() => handleActivateStudents(selectedStudent)}>Make Active in Batch</MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(selectedStudent)}>Remove from Batch</MenuItem>
                    </Menu>
                  </ListItemSecondaryAction> */}

                  <ListItemSecondaryAction>

                    <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                      <MoreVert />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                    <MenuItem onClick={() => handleStudentPage(selectedStudent)}>View </MenuItem>
                      <MenuItem onClick={() => handleEditClick(selectedStudent)}>Edit </MenuItem>
                      <MenuItem onClick={() => handleActivateStudents(selectedStudent)}>Make Active in Batch</MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(selectedStudent)}>Delete</MenuItem>
                    </Menu>

                  </ListItemSecondaryAction>


                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>


      <Dialog open={open} onClose={() => setOpen(false)}>

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
        {/* <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions> */}
      </Dialog>


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
  );
}

export default BatchStudents;
