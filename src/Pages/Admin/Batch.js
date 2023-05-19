import React,{useState, useEffect} from 'react';
import {  useLocation, useParams, useNavigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useMediaQuery, BottomNavigation, BottomNavigationAction } from "@mui/material";

import OverviewIcon from '@mui/icons-material/Dashboard';
import StudentsIcon from '@mui/icons-material/People';
import AttendanceIcon from '@mui/icons-material/EventNote';
import CertificatesIcon from '@mui/icons-material/CardMembership';

// import Test from './Test';
// import Testb from './Testb';


const drawerWidth = 255;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderRight: `1px solid ${useTheme().palette.divider}`,
    width: "260px",
    padding: useTheme().spacing(2),

    [useTheme().breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  bottom: {

    borderRadius:'12px 12px 0px 0px',
    borderTop: `1px solid ${useTheme().palette.divider}`,
  },

  active: {
    color: useTheme().palette.primary.main,
  },


  listItem: {
    marginBottom: useTheme().spacing(3),
  },

  activeLink: {
    color: 'red', 
  },


  content: {
    flexGrow: 1,
    boxSizing: 'border-box',
    backgroundColor: '#F5F5F5',
    padding: useTheme().spacing(3),
    width:'100%',
    [useTheme().breakpoints.down('sm')]: {
      width:"100%",
    },
  },
  
}));


function Batch() {

  const classes = useStyles();
  const location = useLocation();
  const {id}=useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/admin/batch/" + id + "/overview")
  },[]);






  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <div style={{padding:0, margin:0}}>

    <div className={classes.root} style={{padding:0, margin:0}} >


      <Box className={classes.sidebar}>
        <List>

          <ListItem button component={NavLink} to={"/admin/batch/" + id + "/overview"} 
          className={classes.listItem}
          activeClassName={classes.activeLink}
          sx={{ color: location.pathname  === "/admin/batch/" + id + "/overview" || location.pathname  === "/admin/batch/" + id   ? 'primary.main' : 'text.secondary' }} >
            <ListItemIcon>
              <OverviewIcon sx={{ color: location.pathname === "/admin/batch/" + id + "/overview" || location.pathname  === "/admin/batch/" + id ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>

          <ListItem button component={NavLink} to={"/admin/batch/" + id + "/students"} 
           className={classes.listItem}
          activeClassName={classes.activeLink}
          sx={{ color: location.pathname  === "/admin/batch/" + id + "/students" ? 'primary.main' : 'text.secondary' }}>
            <ListItemIcon>
              <StudentsIcon sx={{ color: location.pathname === "/admin/batch/" + id + "/students" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>

          <ListItem button component={NavLink} to={"/admin/batch/" + id + "/attendance"} 
           className={classes.listItem}
            sx={{ color: location.pathname  === "/admin/batch/" + id + "/attendance"  ? 'primary.main' : 'text.secondary' }}>
            <ListItemIcon>
              <AttendanceIcon sx={{ color: location.pathname === "/admin/batch/" + id + "/attendance" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Attendance" sx={{fontWeight: 900}} />
          </ListItem>


          <ListItem button component={NavLink} to={"/admin/batch/" + id + "/certificate"} 
           className={classes.listItem}
           sx={{ color: location.pathname === "/admin/batch/" + id + "/certificate" ? 'primary.main' : 'text.secondary' , fontWeight: location.pathname === '/test' ? 'bold' : 'normal' }}>
            <ListItemIcon>
              <CertificatesIcon sx={{ color: location.pathname === "/admin/batch/" + id + "/certificate" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Certificates" />
          </ListItem>


        </List>
      </Box>


      <Box className={classes.content}>
        <Outlet/>
        {/* <Testb/> */}
      </Box>
    </div>

    {isSmallScreen ? (
      <BottomNavigation className={classes.bottom} sx={{ position: { xs: "fixed", sm:"fixed", md: "static" }, bottom: 0, width: "100%" }}>
      
      <BottomNavigationAction label="Overview" icon={<OverviewIcon />} showLabel={true} 
      component={NavLink}
      to={"/admin/batch/" + id + "/overview"}
      sx={{ color: location.pathname  === "/admin/batch/" + id + "/overview" || location.pathname  === "/admin/batch/" + id  ? 'primary.main' : 'text.secondary' }}
      activeClassName={classes.active} />

      <BottomNavigationAction label="Students" icon={<StudentsIcon />} showLabel={true} 
      component={NavLink}
      to={"/admin/batch/" + id + "/students"}
      sx={{ color: location.pathname  === "/admin/batch/" + id + "/students" ? 'primary.main' : 'text.secondary' }}
      activeClassName={classes.active}/>

      <BottomNavigationAction label="Attendance" icon={<AttendanceIcon />} showLabel={true}
      component={NavLink}
      to={"/admin/batch/" + id + "/attendance"}
      sx={{ color: location.pathname === "/admin/batch/" + id + "/attendance" ? 'primary.main' : 'text.secondary'  }} />

      <BottomNavigationAction label="Certificates" icon={<CertificatesIcon />} showLabel={true}
      component={NavLink}
      to={"/admin/batch/" + id + "/certificate"}
      sx={{ color: location.pathname === "/admin/batch/" + id + "/certificate" ? 'primary.main' : 'text.secondary'  }} />
      

  </BottomNavigation>

  
 

    ):console.log("smallScreen")}


     </div>
  );
}

export default Batch;

