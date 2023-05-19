import React,{useEffect} from 'react';
import {  useLocation, useParams, useNavigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useMediaQuery, BottomNavigation, BottomNavigationAction } from "@mui/material";

// import AccountCircleOutlinedIcon from '@mui/icons-material/Dashboard';
// import CodeOutlinedIcon from '@mui/icons-material/People';
// import FolderOpenOutlinedIcon from '@mui/icons-material/EventNote';
// import EmojiEventsOutlinedIcon from '@mui/icons-material/CardMembership';


import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';




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


function Student() {

  const classes = useStyles();
  const location = useLocation();
  const {id}=useParams();
  const {std}=useParams();

  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/tr/batch/" + id + "/student/"+std+"/details")
  },[]);

  // const match = useRouteMatch('/:page/:id?');
  // const currentPage = match ? match.params.page : '';


  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <div style={{padding:0, margin:0}}>

    <div className={classes.root} style={{padding:0, margin:0}} >


      <Box className={classes.sidebar}>
        <List>

          <ListItem button component={NavLink} to={"/tr/batch/" + id + "/student/"+std+"/details"} 
          className={classes.listItem}
          activeClassName={classes.activeLink}
          sx={{ color: location.pathname  === "/tr/batch/" + id + "/student/"+std+"/details" || location.pathname  === "/tr/batch/" + id + "/student"+std  ? 'primary.main' : 'text.secondary' }} >
            <ListItemIcon>
              <AccountCircleOutlinedIcon sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/details" || location.pathname  === "/tr/batch/" + id + "/student"+std  ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </ListItem>


          <ListItem button component={NavLink} to={"/tr/batch/" + id + "/student/"+std+"/skills"} 
           className={classes.listItem}
          activeClassName={classes.activeLink}
          sx={{ color: location.pathname  === "/tr/batch/" + id + "/student/"+std+"/skills" ? 'primary.main' : 'text.secondary' }}>
            <ListItemIcon>
              <CodeOutlinedIcon sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/skills" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Skills" />
          </ListItem>



          <ListItem button component={NavLink} to={"/tr/batch/" + id + "/student/"+std+"/projects"} 
           className={classes.listItem}
            sx={{ color: location.pathname  === "/tr/batch/" + id + "/student/"+std+"/projects"  ? 'primary.main' : 'text.secondary' }}>
            <ListItemIcon>
              <FolderOpenOutlinedIcon sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/projects" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Projects" sx={{fontWeight: 900}} />
          </ListItem>


          <ListItem button component={NavLink} to={"/tr/batch/" + id + "/student/"+std+"/courses"} 
           className={classes.listItem}
           sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/courses" ? 'primary.main' : 'text.secondary' , fontWeight: location.pathname === '/test' ? 'bold' : 'normal' }}>
            <ListItemIcon>
              <EmojiEventsOutlinedIcon sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/courses" ? 'blue' : 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Badges" />
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
      
        <BottomNavigationAction label="Details" icon={<AccountCircleOutlinedIcon />} showLabel={true} 
        component={NavLink}
        to={"/tr/batch/" + id + "/student/"+std+"/details"}
        sx={{ color: location.pathname  === "/tr/batch/" + id + "/student/"+std+"/details" || location.pathname  === "/tr/batch/" + id + "/student/"  ? 'primary.main' : 'text.secondary' }}
        activeClassName={classes.active} />


        <BottomNavigationAction label="Skills" icon={<CodeOutlinedIcon />} showLabel={true} 
        component={NavLink}
        to={"/tr/batch/" + id + "/student/"+std+"/skills"}
        sx={{ color: location.pathname  ===  "/tr/batch/" + id + "/student/"+std+"/skills"  ? 'primary.main' : 'text.secondary' }}
        activeClassName={classes.active}/>


        <BottomNavigationAction label="Projects" icon={<FolderOpenOutlinedIcon />} showLabel={true}
        component={NavLink}
        to={"/tr/batch/" + id + "/student/"+std+"/projects"}
        sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/projects" ? 'primary.main' : 'text.secondary'  }} />


        <BottomNavigationAction label="Courses" icon={<EmojiEventsOutlinedIcon />} showLabel={true}
        component={NavLink}
        to={"/tr/batch/" + id + "/student/"+std+"/courses"}
        sx={{ color: location.pathname === "/tr/batch/" + id + "/student/"+std+"/courses" ? 'primary.main' : 'text.secondary'  }} />
        

     </BottomNavigation>

  
 

    ):console.log("smallScreen")}


     </div>
  );
}

export default Student;

