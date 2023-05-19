import { useState, useEffect } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';

import PmNavbar from  '../../Components/PmNavbar'

import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';


import { Box } from '@mui/material';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
  },


  content: {
    flexGrow: 1,
    zIndex: 1,
    boxSizing: 'border-box',
    backgroundColor: '#F5F5F5',
    width:'100%',
    marginTop:"70px",
    [useTheme().breakpoints.down('sm')]: {
      width:"100%",
    },
  }, 
}));


const PmHome = () => {

  const classes = useStyles();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user)
      if (!user) {
      navigate('/login');
    }   
    });

    return () => unsubscribe();
  },[]);


  useEffect(() => {
    async function fetchData() {

      const docRef3 = doc(collection(db, "pms"), user);
      const docSnap3 = await getDoc(docRef3);
      if (docSnap3.exists()) {
        console.log("success ")
      } else {
        navigate('/login'); 
      }
    }
    fetchData();
  }, [user]);



  useEffect(()=>{
    navigate("/pm/students")
  },[])



  return (
    <Box className={classes.root} >
      
    {/* Header */}
    <Box sx={{ flexGrow: 0, position: 'fixed', zIndex: 2, width:'100%',  }}>
        <PmNavbar />
      </Box>

    {/* Main content */}      
      <Box className={classes.content} >
          <Outlet/>
      </Box>

    </Box>

    

  );
};
export default PmHome;