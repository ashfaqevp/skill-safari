import React,{useEffect, useState} from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';

import { where, collection, getDocs, query, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, IconButton, Divider, DialogActions, Button, Typography, Chip,  List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, Container, Grid} from '@mui/material';

import { Book, DateRange, Tag, Close} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditBatch from "./EditBatch";


const useStyles = makeStyles(() => ({

  root: {
    paddingTop: useTheme().spacing(4),
    paddingBottom: useTheme().spacing(4),
  },


  container: {
    paddingTop:8,
    [useTheme().breakpoints.down('sm')]: {
      paddingTop:2,
    },
  },

  
  listItem: {
    margin: useTheme().spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },


    header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottom: `1px solid ${useTheme().palette.divider}`,
    marginBottom:0,
  },


  content: {
    paddingTop: 0,
    marginTop:0,
    marginBottom:0,
    paddingBottom:0
  },

  studlist : {
    borderBottom: `1px solid ${useTheme().palette.divider}`,
  }

}));



const BatchOverview = () => {

  const classes = useStyles();
  const {id}=useParams();
  const navigate = useNavigate();

  const [usedColors, setUsedColors] = useState([]);
  const [students, setStudents] = useState([]);
  const [batchData, setBatchData] = useState({});
  const [batchSubjects, setBatchSubjects] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchData();
    fetchStudentsData();

  }, []);

  const fetchData = async () => {
    const docRef = doc(db, 'batches', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBatchData(docSnap.data());
      setBatchSubjects(docSnap.data().subjects)
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

  
  const getAvatarColor = (index) => {
    const colors = [ "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };




  const handleEdit = () => {
    setOpenEdit(true);
  };


  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };



  const handleDeleteConfirm = async () => {
    try {
        const batchRef = doc(db,  'batches', batchData.code);
        await deleteDoc(batchRef);
        setConfirmOpen(false);
        fetchData();
        toast.success('Batch deleted successfully', {
          position: toast.POSITION.TOP_CENTER,
        });

        navigate(`/admin/batches`)

      } catch (error) {
        console.error('Error deleting student:', error);
      }
  };



  function handleSubmit2() {
      toast.success(' Batch successfully Edited', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpenEdit(false);
  }

  return (
    <Container maxWidth="lg" className={classes.root}>

      <Grid container spacing={6}>

        <Grid item xs={12} md={6}>
          <Grid container spacing={6}>
            <Grid item xs={12}>

              <Card>
                <CardHeader
                  title={
                    <div className={classes.header}>
                      <Typography variant="h6">{batchData.name}</Typography>
                      <div>
                        <IconButton aria-label="edit">
                          <EditIcon  onClick={handleEdit} />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon onClick={handleDeleteClick} />
                        </IconButton>
                      </div>
                    </div>
                  }
                />

                <CardContent className={classes.content}>
                
                <Grid container spacing={0} className={classes.gridContainer}>
                <Grid item xs={12} md={6}>
                  <List>
        
                        <ListItem className={classes.listItem}>
                          <ListItemIcon>
                             < Tag  />
                          </ListItemIcon>
                          <ListItemText
                          
                            secondary={
                              <Typography variant="body2" color="textSecondary">
                                {"Batch Code"}
                              </Typography>
                            }
                          primary={
                              <Typography variant="h8">
                                {batchData.code}
                              </Typography>
                            }
                          />
                        </ListItem>
        
        
                        <ListItem className={classes.listItem}>
                          <ListItemIcon>
                             < DateRange  />
                          </ListItemIcon>
                          <ListItemText
                            secondary={
                              <Typography variant="body2" color="textSecondary">
                                {"Start Date"}
                              </Typography>
                            }
                          primary={
                              <Typography variant="h8">
                                {batchData.startingDate}
                              </Typography>
                            }
                          />
                        </ListItem>
        
        
        
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
        
                       <ListItem className={classes.listItem}>
                            <ListItemIcon>
                              < Book  />
                            </ListItemIcon>
                            <ListItemText
                              secondary={
                                <Typography variant="body2" color="textSecondary">
                                  {"Course"}
                                </Typography>
                              }
                            primary={
                                <Typography variant="h8">
                                  {batchData.course}
                                </Typography>
                              }
                            />
                          </ListItem>
        
        
                          <ListItem className={classes.listItem}>
                          <ListItemIcon>
                             < DateRange  />
                          </ListItemIcon>

                          <ListItemText
                            secondary={
                              <Typography variant="body2" color="textSecondary">
                                {"End Date"}
                              </Typography>
                            }
                          primary={
                              <Typography variant="h8">
                                {batchData.endingDate}
                              </Typography>
                            }
                          />
                        </ListItem>
        
                  
                  </List>
                </Grid>
              </Grid>
                </CardContent>
              </Card>


            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                    title={
                      <div className={classes.header}>
                        <Typography variant="h6">{"Subjects"}</Typography>
                      </div>
                    }
                  />


                  <CardContent className={classes.content}>
                    <div>
                      { batchSubjects.map((subject) => (
                        <Chip sx={{marginLeft:'5px', marginBottom:'5px'}} key={subject} label={subject} className={classes.chip} />
                      ))}
                    </div>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} md={6}>
         <Card sx={{marginBottom:10}} >
          <CardHeader
                  title={
                    <div className={classes.header}>
                      <Typography variant="h6">Students ({students.length})</Typography>

                    </div>
                  }
                />
                <CardContent className={classes.content}>

                  <List className={classes.studlist}>
                  {students.slice(0, 5).map((student, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar src={student.imageUrl} className={classes.avatar} sx={{ bgcolor: getAvatarColor(index)}} >
                          {student.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText style={{width:"30%"}} primary={student.name}  />
                      <ListItemText secondary={student.phone} />
                    </ListItem>
                  ))}
                </List>

                  <Link style={{textAlign:"center", color:"blue", marginBottom:0, paddingBottom:0}} to={"/admin/batch/" + id + "/students"} ><h4>Show More</h4></Link>

            </CardContent>
          </Card>
        </Grid>

        
      </Grid>



      <Dialog open={openEdit} maxWidth="md" onClose={() => setOpenEdit(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Edit Batch
          </Typography>
          <IconButton onClick={() => setOpenEdit(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

          <Divider style={{ marginBottom: '3px' }} />

          <DialogContent>
          <EditBatch handleSubmit={handleSubmit2} id={batchData.code} />
          </DialogContent>
        </Dialog>




      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Batch</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Batch?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>


     <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>


    </Container>
  );
};

export default BatchOverview;
