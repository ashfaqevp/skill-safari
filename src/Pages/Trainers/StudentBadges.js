import React,{useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';


import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card, CardActionArea, DialogActions, CardMedia, CardContent, Typography, Divider, TextField, InputAdornment, Fab, useMediaQuery, Button, IconButton} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
import { Close, DockOutlined,} from "@mui/icons-material";

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddBadge from "./AddBadges";
import EditProject from "./EditProject";


import StudentCertificate from "./StudentCertificate"


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

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const [projects, setProjects] = useState([]);



  
  const [anchorEl, setAnchorEl] = useState(null);
  const [projectId, setprojectId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {

    getProjects();

  }, []);

  const getProjects = async () => {
    const projectsRef = collection(db, `batches/${id}/students/${std}/badges`);
    const querySnapshot = await getDocs(projectsRef);
    const projectsData = [];
    for (const doc of querySnapshot.docs) {
      const project = doc.data();
      project.id = doc.id;
      // get image download URL from Storage
      const imageUrl = await getDownloadURL(ref(storage, project.imageUrl));
      project.imageUrl = imageUrl;
      projectsData.push(project);
    }
    setProjects(projectsData);
    setIsLoading(false);
  };


  
  function handleSubmit() {

    toast.success('New Certificate successfully created', {
      position: toast.POSITION.TOP_CENTER,
    });

    getProjects();
    setOpen(false);
  }



  
  function handleSubmit2() {

    toast.success(' Project successfully Edited', {
      position: toast.POSITION.TOP_CENTER,
    });

    getProjects();
    setOpenEdit(false);
    setAnchorEl(null);
  }




  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleEdit = (projectI) => {
    setprojectId(projectI);
    setOpenEdit(true);
  };


  

  const handleOptionMenuClose = () => {
    setAnchorEl(null);
    setprojectId(null);
  };



  
  const handleDeleteClick = (admin) => {
    setprojectId(admin);
    setConfirmOpen(true);
    
  };


  const handleDeleteConfirm = async () => {
    try {
   
        const studentRef = doc(db, `batches/${id}/students/${std}/badges/${projectId}`);

        await deleteDoc(studentRef);
        setConfirmOpen(false);
        setprojectId(null);
        handleOptionMenuClose();
        getProjects();
        toast.success('Project deleted successfully', {
          position: toast.POSITION.TOP_CENTER,
        });

      } catch (error) {
        console.error('Error deleting student:', error);
      }

    }




  return (

    <div><StudentCertificate/>

    <div className={classes.root}>



      {isLoading ? (
              <CircularProgress />
            ) : (

              <div>

      <Box className={classes.batchBox}>

        <Typography variant="h6"><b>Badges ({projects.length})</b></Typography>

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
                Add Badge
            </Button>
         ) : (
          <Fab color="primary" size="small" className={classes.fabButtonStyle}>
            <AddIcon onClick={() => setOpen(true)} className={classes.iconStyle} />
          </Fab>
        )}


      </Box>
      <Divider style={{ marginBottom: '30px' }} />




      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} lg={3.5} key={project.id}>
           <Card>
           <CardActionArea onClick={handleMenuOpen} sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
              <CardMedia component="img" image={project.imageUrl} alt={project.name}  height="150" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
               
                <Typography variant="body2" color="textSecondary" component="p" noWrap>
                  {project.description}
                </Typography>
             
              </CardContent>
              </CardActionArea> 

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }}
                  transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }}
                >

                  {/* <MenuItem onClick={() => handleEdit(project.id)}>Edit</MenuItem> */}
                  <MenuItem onClick={() => handleDeleteClick(project.id)}>Delete</MenuItem>
                  
                </Menu>  

                
          </Card>
          </Grid>
        ))}
      </Grid>

</div>
            )}

            
  <Dialog open={open} maxWidth="md" onClose={() => setOpen(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Add Badge
    </Typography>
    <IconButton onClick={() => setOpen(false)}>
      <Close />
    </IconButton>
  </DialogTitle>


    <DialogContent>
    <AddBadge handleSubmit={handleSubmit} id={id} std={std} />
    </DialogContent>
  </Dialog>



  <Dialog open={openEdit} maxWidth="md" onClose={() => setOpenEdit(false)}>

<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Typography variant="h6" sx={{ flexGrow: 1 }}>
    Edit Badge
  </Typography>
  <IconButton onClick={() => setOpenEdit(false)}>
    <Close />
  </IconButton>
</DialogTitle>

  <Divider style={{ marginBottom: '3px' }} />

  <DialogContent>
  <EditProject handleSubmit={handleSubmit2} id={id} std={std} project={projectId}/>
  </DialogContent>
</Dialog>


<Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
      <DialogTitle>Delete Badge</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this badge?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
        <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
      </DialogActions>
</Dialog>

  <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>

    </div>
    </div>
  );
}

export default StudentProjects;



