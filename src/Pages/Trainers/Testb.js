import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { collection,  getDocs, getDoc, doc} from "firebase/firestore";
import { db } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Button, Card, List, ListItem, ListItemIcon, ListItemText,Paper, CardContent } from "@mui/material";
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

  paper: {
    padding: useTheme().spacing(2),
  },

}));



const Page = () => {

  const {id}=useParams();
  const navigate = useNavigate();
  const classes = useStyles();

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


    // useEffect(() => {
    //   const fetchData = async () => {
    //     const studentsRef = collection(db, "batches", id, "students");
    //     const studentsSnap = await getDocs(studentsRef);
    //     const count = studentsSnap.size;
    //     setStudCount(count);
    //     console.log("Number of students:", count);
    //   };
  
    //   fetchData();
    // }, []);
  
  
    const shouldDisableDate = (day) => {
      return !day.isBetween(minDate, dayjs(), null, '[]');
    };
  
    const handleNavigate = () => {
      navigate(`/batch/${id}/attendance/mark/${value.format('YYYY-MM-DD')}`)
    }


  return (
   <Container maxWidth="lg" className={classes.root}>

      <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Mark Attendance
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText style={{width:"40px"}}  primary="Date"  />
              <ListItemText style={{textAlign:"left"}}  primary={value} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText style={{width:"40px"}}  primary="Batch :"  />
              <ListItemText style={{textAlign:"left"}}  primary={batchName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText style={{width:"40px"}} primary="Students :" />
              <ListItemText  style={{textAlign:"left"}}  primary={stdCount} />
            </ListItem>
          </List>
             {markedDates.includes( value.format('YYYY-MM-DD') ) ? (
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleNavigate}> Update Attendance </Button>
                ) : (
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={handleNavigate}> Mark Attendance </Button>
              )}
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <Paper className={`${classes.paper} ${classes.datepicker}`}> 
              */}
              {/* <Card>
             <CardContent > */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} 

                shouldDisableDate={shouldDisableDate}
                slots={{ day: CustomPickersDay }}

              />
            </LocalizationProvider>
          {/* </Paper> */}
          {/* </CardContent> 
          </Card> */}
        </Grid>
        
      </Grid>

    </Container>
  );
};

export default Page;
