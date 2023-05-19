import React,{useEffect} from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useMediaQuery, BottomNavigation, BottomNavigationAction } from "@mui/material";

// import PsychologyAlt from '@mui/icons-material/Dashboard';
// import AssignmentInd from '@mui/icons-material/People';
// import AdminPanelSettings from '@mui/icons-material/EventNote';



import { PsychologyAlt, AssignmentInd, AdminPanelSettings } from '@mui/icons-material';


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


function Users() {

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/admin/users/trainers")
  },[]);

  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <div style={{padding:0, margin:0}}>

    <div className={classes.root} style={{padding:0, margin:0}} >

      <Box className={classes.sidebar}>
        <List>

          <ListItem button component={NavLink} to={"/admin/users/trainers"} 
          className={classes.listItem}
          activeClassName={classes.activeLink}
          sx={{ color: location.pathname  === "/admin/users/trainers"  || location.pathname  === "/admin/users/"   ? 'primary.main' : 'text.secondary' }} >
            <ListItemIcon>
              <PsychologyAlt sx={{ color: location.pathname === "/admin/users/trainers"  || location.pathname  === "/admin/users/" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Trainers" />
          </ListItem>

          <ListItem button component={NavLink} to={"/admin/users/pms"} 
           className={classes.listItem}
          activeClassName={classes.activeLink}
          sx={{ color: location.pathname  === "/admin/users/pms"  ? 'primary.main' : 'text.secondary' }}>
            <ListItemIcon>
              <AssignmentInd sx={{ color: location.pathname === "/admin/users/pms"? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="PMs" />
          </ListItem>

          <ListItem button component={NavLink} to={"/admin/users/admins" } 
           className={classes.listItem}
            sx={{ color: location.pathname  === "/admin/users/admins"   ? 'primary.main' : 'text.secondary' }}>
            <ListItemIcon>
              <AdminPanelSettings sx={{ color: location.pathname === "/admin/users/admins"  ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Admins" sx={{fontWeight: 900}} />
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

        <BottomNavigationAction label="Trainer" icon={<PsychologyAlt />} showLabel={true} 
        component={NavLink}
        to={"/admin/users/trainers"}
        sx={{ color: location.pathname  === "/admin/users/trainers" || location.pathname  === "/admin/users/"  ? 'primary.main' : 'text.secondary' }}
        activeClassName={classes.active} />


        <BottomNavigationAction label="PMs" icon={<AssignmentInd />} showLabel={true} 
        component={NavLink}
        to={"/admin/users/pms"}
        sx={{ color: location.pathname  === "/admin/users/pms" ? 'primary.main' : 'text.secondary' }}
        activeClassName={classes.active}/>


        <BottomNavigationAction label="Admins" icon={<AdminPanelSettings />} showLabel={true}
        component={NavLink}
        to={"/admin/users/admins"}
        sx={{ color: location.pathname === "/admin/users/admins" ? 'primary.main' : 'text.secondary'  }} />

      </BottomNavigation>


    ):console.log("smallScreen")}


     </div>
  );
}

export default Users;

