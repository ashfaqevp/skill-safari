import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { auth, db} from '../firebase';
import { signOut,onAuthStateChanged  } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Badge, Avatar, Typography, useMediaQuery  } from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import logo from '../Images/logolight.png';
import logoSmall from '../Images/logo.png';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    fontFamily: "'Montserrat', sans-serif",
  },
  menuButton: {
    marginRight: useTheme().spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  navLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)', // decrease opacity
    margin: '0 1rem',
    fontWeight: 'bold',
    fontSize: '0.85rem', // decrease font size
    fontFamily: "'Montserrat', sans-serif",
    [useTheme().breakpoints.down('sm')]: {
      margin: '0 .5rem',
      fontSize: '0.75rem', 
    },
    '&:hover': {
      opacity: 1,
    },
    '&.active': {
      opacity: 1,
      color: 'rgba(255, 255, 255, 1)',
      borderBottom: '3px solid white', // add bottom line
      borderRadius: '3px 3px 0 0',
      paddingBottom: '0.2rem', // add some space between bottom line and text
    },
  },

  active: {
    opacity: 1,
    color: 'white',
    borderBottom: '3px solid white', // add bottom line
   // borderRadius: '3px 3px 0 0',
    paddingBottom: '0.2rem', // add some space between bottom line and text
    [useTheme().breakpoints.down('sm')]: {
      borderBottom: '2px solid white',
    },
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
  avatar: {
    height: useTheme().spacing(2.5), // decrease avatar size
    width: useTheme().spacing(2.5),
    backgroundColor: '#3f51b5',
    margin:"10px ",
    [useTheme().breakpoints.down('sm')]: {
      marginLeft: '5px',
      marginRight: '16px',
    },
  },
  name: {
    marginLeft: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    [useTheme().breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  expandIcon: {
    marginLeft: '0.5rem',
    [useTheme().breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menu: {
    maxWidth: 250, // increase width of menu
    minWidth: 250, // increase width of menu
  },


}));

const Navbar = () => {

  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const [user, setUser] = useState({});
  const [userPhone, setUserPhone] = useState("")
  const [userLogo, setUserLogo] = useState("O")

   useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserPhone(user.phoneNumber);
      console.log(user);
    });

  },[]);



  useEffect(() => {

    async function fetchData() {
    const docRef = doc(db, 'trainers', userPhone);
    const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUser(docSnap.data())
        setUserLogo(docSnap.data().name[0])
      } else {
        console.log('No such document!');
      }
    }

    fetchData();
  }, [userPhone]);




  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out.');
    })
    .catch((error) => {
      console.log(error);
    });
    setAnchorEl(null);
  }



  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link style={{marginRight:"15px"}} to="/">
          <img src={isSmallScreen ? logoSmall : logo} alt="Company Logo" height="63" />
          </Link>
          <NavLink to="/" className={classes.navLink} activeClassName={classes.active}>
            Batches
          </NavLink>
          <NavLink to="/timetable" className={classes.navLink} activeClassName={classes.active}>
            Timetable
          </NavLink>
          <NavLink to="/chat" className={classes.navLink} activeClassName={classes.active}>
            Chat
          </NavLink>
          <div className={classes.title} />
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

           <div className={classes.avatarContainer} onClick={handleAvatarClick}>
            <Avatar className={classes.avatar}>{userLogo}</Avatar>
            <Typography variant="subtitle1" className={classes.name}>
              {user.name}
            </Typography>

            {!isSmallScreen && (
            <ExpandMoreIcon className={classes.expandIcon} />)}
            
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            classes={{ paper: classes.menu }} 
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;