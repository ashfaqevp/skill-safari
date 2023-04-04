import React,{useState , useEffect , useRef} from 'react';
import {useParams, Outlet, Link} from 'react-router-dom';
import BatchNavbar from '../../Components/BatchNavbar'
import BatchOverview from './BatchOverview'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Batch = () => {

    const {id}=useParams();

    return(
      
        <>
          <ThemeProvider theme={theme}>
            < BatchNavbar style={{margin : "200px"}} id={id}/>
           
          

          <div className='ahBot'> <Outlet/> </div>
          </ThemeProvider>
        </>
      
    )

}
export default Batch;