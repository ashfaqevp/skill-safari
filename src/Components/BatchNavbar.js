import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
// import { breakpoints } from '@mui/material/styles';
// import { OverviewIcon, StudentsIcon, AttendanceIcon } from './icons';
import OverviewIcon from '@mui/icons-material/Dashboard';
import StudentsIcon from '@mui/icons-material/People';
import AttendanceIcon from '@mui/icons-material/EventNote';


const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const BatchNavbar = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    
    <div>
      <div className={classes.toolbar} />
      {/* <h1>{</h1> */}
      <List>
        <ListItem button component={NavLink} to={"/batch/" + props.id + "/overview"} exact activeClassName="Mui-selected">
          <ListItemIcon>
            <OverviewIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button component={NavLink} to={"/batch/" + props.id + "/students"} activeClassName="Mui-selected">
          <ListItemIcon>
            <StudentsIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={NavLink} to={"/batch/" + props.id + "/attendance"} activeClassName="Mui-selected">
          <ListItemIcon>
            <AttendanceIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
      </List>
    </div>
  );

  return (
    
    <nav className={classes.drawer} aria-label="side-navigation">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        {drawerContent}
      </Drawer>
    </nav>
   
  );
};

export default BatchNavbar;
