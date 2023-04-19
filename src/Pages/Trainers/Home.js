import { useState, useEffect } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import Navbar from  '../../Components/Navbar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Testb from './Testb'

import { Box, Container, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

const Home = () => {

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



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' , width:'100%'}}>
      
    {/* Header */}
      <Box sx={{ flexGrow: 0, position: 'relative', zIndex: 2, width:'100%' }}>
        <Navbar />
      </Box>

    {/* Main content */}      
      <Box sx={{ flexGrow: 1, height:"100%",

       // display: 'flex', position: 'relative',

        zIndex: 1, width:'100%' }}>
          <Outlet/>
      </Box>

    </Box>

    

  );
};
export default Home;