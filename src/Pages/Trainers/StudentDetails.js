import React,{useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'


import { where, collection, getDocs, query, doc, getDoc,setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';


import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Paper, CardActionArea, CardMedia, CardContent, Typography, Divider, TextField, InputAdornment, Fab, useMediaQuery, Button, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
import { Close,Facebook, Twitter, Instagram, LinkedIn, GitHub, Telegram } from '@mui/icons-material';

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddDetails from "./AddDetails";


const useStyles = makeStyles(() => ({
  
  root: {
    flexGrow: 1,
    // padding: '75px 120px',
    padding: '25px 40px',
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
    marginBottom: '12px'
  },

  text: {
    fontSize: '12px',
    color: '#888',
    fontWeight: 600,
  },



  card: {
    display: "flex",
    flexDirection:"column",
    justifyContent: 'space-between',
    fontFamily: "'Montserrat', sans-serif",  
    textDecoration: 'none',
    color: 'inherit',
    [useTheme().breakpoints.down('sm')]: {
      width: '100%',
    },
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },

}));




const StudentProjects = () => {

  const { id, std } = useParams();

  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    image: "https://via.placeholder.com/150",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "123 Main St, Anytown, USA",
    hobbies: ["Reading", "Hiking", "Traveling"],
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
    telegram: "https://telegram.org/",
  };


  const { name, email, phone, about, hobbies, address, linkedin, github, facebook, twitter, instagram, telegram, image } = profile;

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({});





  const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetchData();

  }, []);



  const fetchData = async () => {
    
    const docRef = doc(db, "batches/"+id+"/students" ,std);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setStudent(docSnap.data());
      console.log(docSnap.data());
      setIsLoading(false);
    }
    else{
      console.log("no dattatatataatata");
      setIsLoading(false);
      
    }

  };

  // const getProjects = async () => {
  //   const projectsRef = collection(db, "projects");
  //   const querySnapshot = await getDocs(projectsRef);
  //   const projectsData = [];
  //   for (const doc of querySnapshot.docs) {
  //     const project = doc.data();
  //     // get image download URL from Storage
  //     // const imageUrl = await getDownloadURL(ref(storage, project.imageUrl));
  //     // project.imageUrl = imageUrl;
  //     projectsData.push(project);
  //   }
  //   setProjects(projectsData);
  //   setIsLoading(false);
  // };


  
  function handleSubmit() {

    toast.success('New batch successfully created', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpen(false);
  }




  return (
    <div className={classes.root}>

      {isLoading ? (
              <CircularProgress />
            ) : (

              <div>

      {/* <Box className={classes.batchBox}>

        <Typography variant="h6"><b>Details </b></Typography>

        <Box className={classes.filterBox}>
        <TextField
        id="input-with-icon-textfield"
        size="small"
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
                Edit Details
            </Button>
         ) : (
          <Fab color="primary" size="small" className={classes.fabButtonStyle}>
            <AddIcon onClick={() => setOpen(true)} className={classes.iconStyle} />
          </Fab>
        )}


      </Box>
      <Divider style={{ marginBottom: '30px' }} /> */}


        {/* {! isSmallScreen ? (
            <Button onClick={() => setOpen(true)} variant="contained" startIcon={<AddIcon />} className={classes.buttonStyle}>
                Edit Details
            </Button>
         ) : (
          <Fab color="primary" size="small" className={classes.fabButtonStyle}>
            <AddIcon onClick={() => setOpen(true)} className={classes.iconStyle} />
          </Fab>
        )} */}




      <div width="700px">
      <Grid container spacing={2} justifyContent="center">

        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 6 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
              <img src={student.imageUrl ? student.imageUrl : "https://via.placeholder.com/120x120"} alt="Profile" style={{ width: "25%", height: "25%", objectFit: "cover", borderRadius: "50%" }} />
              </Box>


              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display:"flex", alignItems:"center", justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {student.name}
                    </Typography>

                    <IconButton color="primary" size="small" onClick={() => setOpen(true)}>
                    <EditIcon size ="small" className={classes.iconStyle} />
                    </IconButton>
                </Box>

                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>{student.email}</Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>{student.phone}</Typography>
              </Grid>


              {/* <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                  Email:
                </Typography>
                <Typography variant="subtitle1">{email}</Typography>
              </Grid>



              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Phone:
                </Typography>
                <Typography variant="subtitle1">{phone}</Typography>
              </Grid> */}

              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  About:
                </Typography>
                <Typography variant="subtitle1">{student.about}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Hobbies:
                </Typography>
                <Typography variant="subtitle1">{student.hobbies}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Address:
                </Typography>
                <Typography variant="subtitle1">{student.address}</Typography>
              </Grid>
            </Grid>

            <br/>


            <Grid container spacing={2}>
<Grid item xs={12}>
  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
    Social Links:
  </Typography>
</Grid>

{student.linkedin && (
  <Grid item xs={6} sm={2}>
    <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <LinkedIn />
      </IconButton>
    </a>
  </Grid>
)}

{student.github && (
  <Grid item xs={6} sm={2}>
    <a href={student.github} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <GitHub />
      </IconButton>
    </a>
  </Grid>
)}

{student.facebook && (
  <Grid item xs={6} sm={2}>
    <a href={student.facebook} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <Facebook />
      </IconButton>
    </a>
  </Grid>
)}

{student.twitter && (
  <Grid item xs={6} sm={2}>
    <a href={student.twitter} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <Twitter />
      </IconButton>
    </a>
  </Grid>
)}

{student.instagram && (
  <Grid item xs={6} sm={2}>
    <a href={student.instagram} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <Instagram />
      </IconButton>
    </a>
  </Grid>
)}

{student.telegram && (
  <Grid item xs={6} sm={2}>
    <a href={student.telegram} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <Telegram />
      </IconButton>
    </a>
  </Grid>
)}

          


            </Grid>
         



          </Paper>
        </Grid>

          </Grid>
        </div>



</div>
            )}

            
  <Dialog open={open} maxWidth="md" onClose={() => setOpen(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Edit Details
    </Typography>
   
    <IconButton onClick={() => setOpen(false)}>
      <Close />
    </IconButton>
  </DialogTitle>

     <Divider style={{ marginBottom: '3px' }} />

    <DialogContent>
    <AddDetails handleSubmit={handleSubmit} id={id} std={std} />
    </DialogContent>
  </Dialog>

  <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>

    </div>
  );
}

export default StudentProjects;



