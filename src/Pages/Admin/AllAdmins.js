import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import { collection, query, getDocs , deleteDoc, doc } from 'firebase/firestore';
import { db, } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card,  Typography, Divider, CardActionArea, TextField, InputAdornment, Avatar, useMediaQuery, Button, Fab, IconButton, DialogActions} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from "@mui/icons-material/Add";
import { Close,} from "@mui/icons-material";

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdimn";



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




const AllTrainers = () => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [admins, setAdmins] = useState([]);
  const [tempAdmins, setTempAdmins] = useState([]);



  const [anchorEl, setAnchorEl] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);




  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, 'admins'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAdmins(data);
    setTempAdmins(data);

    setIsLoading(false);
  };



  function handleSubmit() {

    toast.success('New admin successfully added', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpen(false);
  }



  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = setTempAdmins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setAdmins(filtered);
  };




  function handleSubmit2() {

    toast.success(' Admin successfully Edited', {
      position: toast.POSITION.TOP_CENTER,
    });

    fetchData();
    setOpenEdit(false);
    setAnchorEl(null);
  }




  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleEdit = (admin) => {
    setAdminId(admin);
    setOpenEdit(true);
  };


  

  const handleOptionMenuClose = () => {
    setAnchorEl(null);
    setAdminId(null);
  };



  
  const handleDeleteClick = (admin) => {
    setAdminId(admin);
    setConfirmOpen(true);
    
  };



  const handleDeleteConfirm = async () => {
    try {
   
        const studentRef = doc(db,  'admins', adminId);
        await deleteDoc(studentRef);
        setConfirmOpen(false);
        setAdminId(null);
        handleOptionMenuClose();
        fetchData();
        toast.success('Admins deleted successfully', {
          position: toast.POSITION.TOP_CENTER,
        });

      } catch (error) {
        console.error('Error deleting student:', error);
      }

    }






  const getAvatarColor = (index) => {
    const colors = [ "#EA4335", "#FBBC05", "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
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

        <Typography variant="h6"><b>Admins ({tempAdmins.length})</b></Typography>

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
                ADD NEW ADMIN
            </Button>
         ) : (
          <Fab color="primary" size="small" className={classes.fabButtonStyle}>
            <AddIcon onClick={() => setOpen(true)} className={classes.iconStyle} />
          </Fab>
        )}

      </Box>

    
      <Divider style={{ marginBottom: '30px' }} />




      <Grid container spacing={isSmallScreen ? 2 : 1}>
      {admins.map((admin, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>

      <Card  key={admin.phone} className={classes.card}>
      <CardActionArea onClick={handleMenuOpen} sx={{ '&:hover': { backgroundColor: 'inherit' } }}>

          <div className={classes.content} >

                <Avatar src={admin.imageUrl}
                 sx={{ bgcolor: getAvatarColor(index), width: 60, height: 60, fontSize:34, alignItems:'center', textAlign:'center'}} >
                  {admin.name.charAt(0)}
                </Avatar>

            <p className={classes.header} ><b>{admin.name}</b></p>
            <p className={classes.text} >{admin.phone}</p>
            <p className={classes.text} >{admin.email}</p>
            
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

            <MenuItem onClick={() => handleEdit(admin.id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeleteClick(admin.id)}>Delete</MenuItem>
            
          </Menu>  

      </Card>


    </Grid>
  ))}
</Grid>


  <Dialog open={open} onClose={() => setOpen(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Add Admin
    </Typography>
    <IconButton onClick={() => setOpen(false)}>
      <Close />
    </IconButton>
  </DialogTitle>
    <DialogContent>
    <AddAdmin handleSubmit={handleSubmit} />
    </DialogContent>
  </Dialog>



  
  <Dialog open={openEdit} maxWidth="md" onClose={() => setOpenEdit(false)}>

  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Edit Admin
    </Typography>
    <IconButton onClick={() => setOpenEdit(false)}>
      <Close />
    </IconButton>
  </DialogTitle>

    <Divider style={{ marginBottom: '3px' }} />

    <DialogContent>
    <EditAdmin handleSubmit={handleSubmit2} id={adminId} />
    </DialogContent>
  </Dialog>


  <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this admin?</p>
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

export default AllTrainers;



