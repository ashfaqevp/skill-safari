import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import { collection, query, getDocs ,deleteDoc, doc } from 'firebase/firestore';
import { db, } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card,  Typography, Divider, TextField,  InputAdornment, Avatar, useMediaQuery, Button, Fab, IconButton, CardActionArea, DialogActions} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from "@mui/icons-material/Add";
import { Close,} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddPm from "./AddPm";
import EditPm from './EditPm'
import PmAddStudents from "./PmAddStudents"



const useStyles = makeStyles(() => ({
  
  root: {
    flexGrow: 1,
    padding: '50px 80px',
    backgroundColor: '#F5F5F5',
    fontFamily: 'Montserrat',   
    [useTheme().breakpoints.down('sm')]: {
      padding: '24px',
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




const AllPms = () => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openAddStudent, setOpenaddStudent] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [trainers, setTrainers] = useState([]);
  const [tempTrainers, setTempTrainers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [trainerId, setTrainerId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);


 

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, 'pms'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTrainers(data);
    setTempTrainers(data);

    setIsLoading(false);
  };



  function handleSubmit() {

    toast.success('New Program Manager successfully added', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpen(false);
  }


  function handleSubmit2() {

    toast.success(' Program Manager successfully Edited', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpenEdit(false);
    setAnchorEl(null);
  }


  function handleAddStudent() {
    toast.success('Students added into Program Mangers successfully', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpenaddStudent(false);
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



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  const handleMenuAddStudent = (trainer) => {
    setTrainerId(trainer);
    setOpenaddStudent(true);
  };

  const handleEdit = (trainer) => {
    setTrainerId(trainer);
    setOpenEdit(true);
  };



  const handleOptionMenuClose = () => {
    setAnchorEl(null);
    setTrainerId(null);
  };



  
  const handleDeleteClick = (trainer) => {
    setTrainerId(trainer);
    setConfirmOpen(true);
    
  };



  const handleDeleteConfirm = async () => {
    try {
   
        const studentRef = doc(db,  'pms', trainerId);
        await deleteDoc(studentRef);
        setConfirmOpen(false);
        setTrainerId(null);
        handleOptionMenuClose();
        fetchData();
        toast.success('Program Manager deleted successfully', {
          position: toast.POSITION.TOP_CENTER,
        });

      } catch (error) {
        console.error('Error deleting student:', error);
      }
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

        <Typography variant="h6"><b>Program Managers ({tempTrainers.length})</b></Typography>

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
                ADD NEW PM
            </Button>
         ) : (
          <Fab color="primary" size="small" className={classes.fabButtonStyle}>
            <AddIcon onClick={() => setOpen(true)} className={classes.iconStyle} />
          </Fab>
        )}

      </Box>

    
      <Divider style={{ marginBottom: '30px' }} />




    <Grid container spacing={isSmallScreen ? 2 : 1}>
      {trainers.map((trainer, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>

      <Card  key={trainer.phone} className={classes.card}>
          <CardActionArea onClick={handleMenuOpen} sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
          <div className={classes.content} >

                <Avatar src={trainer.imageUrl}
                 sx={{ bgcolor: getAvatarColor(index), width: 60, height: 60, fontSize:34, alignItems:'center', textAlign:'center'}} >
                {trainer.name && trainer.name.length > 0
                      ? trainer.name.charAt(0)
                      : ''}
                </Avatar>

            <p className={classes.header} ><b>{trainer.name}</b></p>
            <p className={classes.text} >{trainer.phone}</p>
            <p className={classes.text} >{trainer.email}</p>

           
            
          </div> 
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
            <MenuItem onClick={() => handleMenuAddStudent(trainer.id)}>Assign Students</MenuItem>
            <MenuItem onClick={() => handleEdit(trainer.id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeleteClick(trainer.id)}>Delete</MenuItem>
            
         </Menu>

      </Card>


    </Grid>
  ))}
</Grid>


  <Dialog open={open} onClose={() => setOpen(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Add PM
    </Typography>
    <IconButton onClick={() => setOpen(false)}>
      <Close />
    </IconButton>
  </DialogTitle>
    <DialogContent>
    <AddPm handleSubmit={handleSubmit} />
    </DialogContent>
  </Dialog>




  <Dialog open={openEdit} maxWidth="md" onClose={() => setOpenEdit(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Edit PM
    </Typography>
    <IconButton onClick={() => setOpenEdit(false)}>
      <Close />
    </IconButton>
  </DialogTitle>

    <Divider style={{ marginBottom: '3px' }} />

    <DialogContent>
    <EditPm handleSubmit={handleSubmit2} id={trainerId} />
    </DialogContent>
  </Dialog>




  <Dialog open={openAddStudent} onClose={() => setOpenaddStudent(false)}>

    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Assign Students
    </Typography>
    <IconButton onClick={() => setOpenaddStudent(false)}>
        <Close />
    </IconButton>
    </DialogTitle>

    <DialogContent>
        <PmAddStudents handleAddStudent={handleAddStudent} trainer={trainerId} />
    </DialogContent>

    </Dialog>


    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Program-Manager</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this PM?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>


  <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>

</div>
            )}
    </div>
  );
}

export default AllPms;



