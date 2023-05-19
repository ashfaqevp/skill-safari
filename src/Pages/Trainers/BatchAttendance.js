import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { collection,  getDocs, getDoc, doc} from "firebase/firestore";
import { db } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Button, Card, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, CardContent } from "@mui/material";
import { Event, People, Book } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


const useStyles = makeStyles(() => ({

  root: {
    paddingTop: useTheme().spacing(6),
    paddingBottom: useTheme().spacing(6),
    [useTheme().breakpoints.down('sm')]: {
      paddingBottom: useTheme().spacing(8),
    },
  },

  card: {
    paddingLeft: useTheme().spacing(6),
    paddingRight: useTheme().spacing(6),
    [useTheme().breakpoints.down('sm')]: {
      paddingLeft:  useTheme().spacing(1),
      paddingRight: useTheme().spacing(1),
    },
  },

  paper: {
    padding: useTheme().spacing(2),
  },

  listItem: {
    display: "flex",
    alignItems: "flex-start",
  },
  listItemText: {
    width: 50,
    marginRight: 16,
  },

  listText: {
    flex: 1,
    textAlign: "left",
  },


}));



const BatchAttendance = () => {

  const {id}=useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  const [markedDates, setMarkedMovies] = useState([]);

  useEffect(() => {
    async function fetchDates() {
      const querySnapshot = await getDocs(collection(db, "batches", id, "attendance"));
      const datesData = [];
      querySnapshot.forEach((doc) => {
        datesData.push(doc.id);
      });
      setMarkedMovies(datesData);
      console.log(datesData)
    }
    fetchDates();
  }, []);

  
  const CustomPickersDay = ({ day, ...other }) => {
    const isHighlighted = markedDates.includes(day.format('YYYY-MM-DD'));
  
      return (
        <PickersDay
          {...other}
          day={day}
          disableMargin
          sx={{
            ...(isHighlighted && {
              border: '2px solid green',
              borderRadius: '50%',
              margin: '2px',
              // '&:hover, &:focus': {
              //   backgroundColor: 'primary.dark',
              // },
            }),
          }}
        />
      );
    };
  
  
    const [value, setValue] = useState(dayjs());
  
    const [minDate, setMinDate] = useState(dayjs());
    const [maxDate, setMaxDate] = useState(dayjs());
    const [batchName, setBatchName] = useState("");
    const [stdCount, setStudCount] = useState('0');
  
  
    useEffect(() => {
      const fetchData = async () => {
        const docRef = doc(db, 'batches', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMinDate(dayjs(docSnap.data().startingDate))
          setMaxDate(dayjs(docSnap.data().endingDate))
          setBatchName(docSnap.data().name)
        } else {
          console.log('No such document!');
        }
      };
  
      fetchData();
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        const studentsRef = collection(db, "batches", id, "students");
        const studentsSnap = await getDocs(studentsRef);
        const count = studentsSnap.size;
        setStudCount(count);
        console.log("Number of students:", count);
      };
  
      fetchData();
    }, []);
  
  
    const shouldDisableDate = (day) => {
      return !day.isBetween(minDate, dayjs(), null, '[]');
    };
  
    const handleNavigate = () => {
      navigate(`/tr/batch/${id}/attendance/mark/${value.format('YYYY-MM-DD')}`)
    }


  return (
   <Container maxWidth="lg" className={classes.root}>

      <Grid container spacing={isSmallScreen ? 2 : 4}>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Mark Attendance
          </Typography>

          <List sx={{width:"350px"}}>
            
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Date :"  />
              <ListItemText className={classes.listText} primary={value.format('YYYY-MM-DD')} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Batch :"  />
              <ListItemText className={classes.listText} primary={batchName} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Students :"  />
              <ListItemText className={classes.listText} primary={stdCount} />
            </ListItem>


            {/* <ListItem> className={classes.listItem}
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Students :" />
              <ListItemText  primary={stdCount} />
            </ListItem> */}




            <ListItem>
              {markedDates.includes( value.format('YYYY-MM-DD') ) ? (
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleNavigate}> Update Attendance </Button>
                ) : (
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleNavigate}> Mark Attendance </Button>
              )}
            </ListItem>

          </List>

        </Grid>

        <Grid item xs={12} md={6} className={classes.card}>
          {/* <Paper className={`${classes.paper} ${classes.datepicker}`}> 
              */}
              <Card sx={{maxWidth:"450px"}} >
             <CardContent className={classes.content}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} 

                shouldDisableDate={shouldDisableDate}
                slots={{ day: CustomPickersDay }}

              />
            </LocalizationProvider>
          {/* </Paper> */}
          </CardContent> 
          </Card>
        </Grid>
        
      </Grid>

    </Container>
  );
};

export default BatchAttendance;
