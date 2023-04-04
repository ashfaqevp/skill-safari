import React,{useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { Link, useParams } from 'react-router-dom';
import { where, collection, getDocs, query, orderBy, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { Card, CardHeader, CardContent, IconButton, Typography, Chip, Grid,  List, ListItem, ListItemText, ListItemAvatar, Avatar, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BookIcon from '@mui/icons-material/Book';
import SubjectIcon from '@mui/icons-material/Subject';

const useStyles = makeStyles((theme) => ({

  root: {
    [theme.breakpoints.up('lg')]: {
      width: '40%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    backgroundColor: '#f5f5f5',
    marginBottom: theme.spacing(2),
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },


  classa: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    display: 'inline',
    // displayDirection:'column'
  },
  

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  viewMore: {
    margin: theme.spacing(2),
  }
}));




const BatchOverview = () => {

  const {id}=useParams();

  const classes = useStyles();

  const [students, setStudents] = useState([]);
  const [batchData, setBatchData] = useState({});

  useEffect(() => {
    fetchData();
    fetchStudentsData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, 'batches', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBatchData(docSnap.data());
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

  
  return (

    <div style={{backgroundColor: '#f1f1f1' }}>
   
   <Grid container spacing={2}>
      <Grid item xs={12}>
    <Card className={[classes.root, classes.carda]}>
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
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Typography variant="subtitle1" gutterBottom>
              Batch Code: {batchData.code}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="subtitle1" gutterBottom>
              Course Name: {batchData.course}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={classes.header}>
              <DateRangeIcon className={classes.icon} />
              <Typography variant="subtitle1">
                {batchData.startingDate} - {batchData.endingDate}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className={classes.header}>
              <BookIcon className={classes.icon} />
              <Typography variant="subtitle1">Subjects:</Typography>
            </div>
            <div>
              {/* { batchData.subjects.map((subject) => (
                <Chip key={subject} label={subject} className={classes.chip} />
              ))} */}
            </div>
          </Grid>
        </Grid>
      </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Card className={classes.root}>
    <Typography variant="h5" className={classes.title}>Students</Typography>
    <List>
      {students.map((student, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>{student.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText style={{width:"30%"}} primary={student.name}  />
          <ListItemText secondary={student.phone} />
        </ListItem>
      ))}
    </List>
    <Button variant="contained" color="primary" className={classes.viewMore}>View More</Button>
  </Card>
      </Grid>
    </Grid> 

    </div>
  );

};

export default BatchOverview;
