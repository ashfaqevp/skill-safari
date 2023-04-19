import React, { useState, useEffect } from "react";
import {useParams, Outlet, Link} from 'react-router-dom';
import { where, collection, getDocs, query, orderBy, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import AddStudent from "./AddStudent";


function BatchStudents() {

    const {id}=useParams();

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

  
    const handleDeleteClick = (student) => {
      // TODO: handle delete student logic
      console.log("Delete student:", student);
      handleOptionMenuClose();
    };


    function handleSubmitStudent() {
      alert("Student Successfully Added!" );
      fetchData();
      setOpen(false);
    }

  return (
    <div style={{ margin: "0 20%", display: "flex", justifyContent: "center" , marginTop:'100px'}}>
      <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Typography variant="h5" component="h3">
          Students
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary" sx={{ ml: 2 }}>
          Add Student
        </Button>
      </div>
       <Card variant="outlined" style={{ width:'700px' }}>

        
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={"Active ("+ students.length + ")"} />
            <Tab label={"Inactive ("+ inactiveStudents.length + ")"} />
          </Tabs>
          {activeTab === 0 && (
            <List>
              {students.map((student, index) => ( 
                <ListItem key={index}>
                  <ListItemAvatar>
                  <Avatar style={{marginRight:"10px"}}>{student.name[0]}</Avatar>
                    {/* <Avatar src={student.avatarUrl} alt={student.name} /> */}
                  </ListItemAvatar>
                  <ListItemText style={{width:"30%"}} primary={student.name}  />
                  <ListItemText secondary={student.phone} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                      <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                      <MenuItem onClick={() => handleInactiveStudents(selectedStudent)}>Make Inactive in Batch</MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(selectedStudent)}>Remove from Batch</MenuItem>
                    </Menu>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          {activeTab === 1 && (
            <List>
                {inactiveStudents.map((student, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                  <Avatar style={{marginRight:"10px"}}>{student.name[0]}</Avatar>
                    {/* <Avatar src={student.avatarUrl} alt={student.name} /> */}
                  </ListItemAvatar>
                  <ListItemText style={{width:"30%"}} primary={student.name}  />
                  <ListItemText secondary={student.phone} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleOptionMenuClick(event, student)}>
                      <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleOptionMenuClose}>
                      <MenuItem onClick={() => handleActivateStudents(selectedStudent)}>Make Active in Batch</MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(selectedStudent)}>Remove from Batch</MenuItem>
                    </Menu>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
      </div>



      {/* <Button onClick={() => setOpen(true)}>Open Popup</Button> */}
      <Dialog open={open} onClose={() => setOpen(false)}>

      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Add Students
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
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


    </div>
  );
}

export default BatchStudents;
