import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import { collection, query, getDocs , } from 'firebase/firestore';
import { db, } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card,  Typography, Divider, TextField, InputAdornment, Avatar, useMediaQuery, Button, Fab, IconButton} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from "@mui/icons-material/Add";
import { Close,} from "@mui/icons-material";

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddTrainer from "./AddTrainer";



const useStyles = makeStyles(() => ({
  
  root: {
    flexGrow: 1,
    padding: '75px 120px',
    backgroundColor: '#F5F5F5',
    fontFamily: 'Montserrat',   
    [useTheme().breakpoints.down('sm')]: {
      padding: '32px',
    },
  },

  batchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },

  filterBox: {
    display: 'flex',
    alignItems: 'center',
    [useTheme().breakpoints.down('sm')]: {
      padding : '10px',
    },
  },

  filterInput: {
    marginRight: '16px',
  },

  heading: {
    fontWeight: 'bold',
    fontSize: '1rem', // decrease font size
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: '12px',
    textAlign: 'center',
  },

  text: {
    fontSize: '12px',
    color: '#888',
    fontWeight: 600,
    textAlign: 'center',
  },


  content: {
    padding: useTheme().spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
  },



  card: {
    height: '220px',
    width: '185px',
    marginRight: '8px',
    marginTop: '8px',
    display: "flex",
    flexDirection:"column",
    fontFamily: "'Montserrat', sans-serif",  
    textDecoration: 'none',
    color: 'inherit',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    [useTheme().breakpoints.down('sm')]: {
      width: '100%',
    },
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },


}));




const AllTrainers = () => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [trainers, setTrainers] = useState([]);
  const [tempTrainers, setTempTrainers] = useState([]);




  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, 'trainers'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTrainers(data);
    setTempTrainers(data);

    setIsLoading(false);
  };



  function handleSubmit() {

    toast.success('New trainer successfully added', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpen(false);
  }



  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = tempTrainers.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setTrainers(filtered);
  };





  const getAvatarColor = (index) => {
    const colors = [ "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
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

              <div>

      <Box className={classes.batchBox}>

        <Typography variant="h6"><b>Trainers ({tempTrainers.length})</b></Typography>

        <Box className={classes.filterBox}>
            <TextField
            id="input-with-icon-textfield"
            size="small"
            onChange={handleFilter}
            className={classes.filterInput} 
            sx={{width:'150px'}}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                 <SearchIcon />
                </InputAdornment>
            ),
            }}
            variant="standard"
            />
        </Box>

        {! isSmallScreen ? (
            <Button onClick={() => setOpen(true)} variant="contained" startIcon={<AddIcon />} className={classes.buttonStyle}>
                ADD NEW TRAINER
            </Button>
         ) : (
          <Fab color="primary" size="small" className={classes.fabButtonStyle}>
            <AddIcon onClick={() => setOpen(true)} className={classes.iconStyle} />
          </Fab>
        )}

      </Box>

    
      <Divider style={{ marginBottom: '30px' }} />




    <Grid container spacing={1}>
      {trainers.map((trainer, index) => (
        <Grid item xs={6} sm={6} md={2} key={index}>

      <Card component={Link} to={`/trainer/${trainer.phoneNumber}`} key={trainer.phone} className={classes.card}>

          <div className={classes.content} >

                <Avatar sx={{ bgcolor: getAvatarColor(index), width: 60, height: 60, fontSize:34, alignItems:'center', textAlign:'center'}} >
                  {trainer.name.charAt(0)}
                </Avatar>

            <p className={classes.header} ><b>{trainer.name}</b></p>
            <p className={classes.text} >{trainer.phone}</p>
            <p className={classes.text} >{trainer.email}</p>
            
          </div>  

      </Card>


    </Grid>
  ))}
</Grid>


  <Dialog open={open} onClose={() => setOpen(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Add Trainer
    </Typography>
    <IconButton onClick={() => setOpen(false)}>
      <Close />
    </IconButton>
  </DialogTitle>


    <DialogContent>
    <AddTrainer handleSubmit={handleSubmit} />
    </DialogContent>
  </Dialog>


  <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>

</div>
            )}
    </div>
  );
}

export default AllTrainers;



