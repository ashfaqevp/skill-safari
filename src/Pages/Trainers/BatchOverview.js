import React,{useEffect, useState} from "react";
import { useParams, Link } from 'react-router-dom';

import { where, collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, IconButton, Typography, Chip,  List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, Container, Grid} from '@mui/material';

import { Book, DateRange} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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

  const [usedColors, setUsedColors] = useState([]);
  const [students, setStudents] = useState([]);
  const [batchData, setBatchData] = useState({});
  const [batchSubjects, setBatchSubjects] = useState([]);

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

  
  const getRandomColor = () => {
    const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#34A853", "#EA4335", "#FBBC05", "#4286f4", "#9AA0A6", "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
    const availableColors = colors.filter((color) => !usedColors.includes(color));
    if (availableColors.length === 0) {
      // all colors have been used, reset the list
      usedColors.splice(0, usedColors.length);
      return colors[0];
    } else {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const randomColor = availableColors[randomIndex];
      usedColors.push(randomColor);
      return randomColor;
    }
  };

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
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
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
                             < Book  />
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
                        <Avatar className={classes.avatar} sx={{ bgcolor: getRandomColor()}} >
                          {student.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText style={{width:"30%"}} primary={student.name}  />
                      <ListItemText secondary={student.phone} />
                    </ListItem>
                  ))}
                </List>

                  <Link style={{textAlign:"center", color:"blue", marginBottom:0, paddingBottom:0}} to={"/batch/" + id + "/students"} ><h4>Show More</h4></Link>

            </CardContent>
          </Card>
        </Grid>

        
      </Grid>
    </Container>
  );
};

export default BatchOverview;
