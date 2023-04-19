import React, { useState, useEffect } from "react";
import {useNavigate  } from 'react-router-dom';

import {auth, db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";

import { TextField, InputAdornment, Button, Paper, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import loginImage from '../Images/loginImage.png';
import logo from '../Images/logofull.png';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  typography: {
     fontFamily: "'Montserrat', sans-serif",
  },
});

const useStyles = makeStyles(() => ({
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    [useTheme().breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '60%',
    padding: useTheme().spacing(2),
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
    [useTheme().breakpoints.down('sm')]: {
      width: '70%',
    },
    [useTheme().breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
    },
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    paddingRight: useTheme().spacing(3),
    [useTheme().breakpoints.down('xs')]: {
      width: '100%',
      height: 'auto',
      paddingRight: 0,
    },
  },
  imageBox: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0px 8px 8px 0px',
    overflow: 'hidden',
    [useTheme().breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logo: {
    width: '60%',
    marginBottom: useTheme().spacing(2),
    [useTheme().breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));

const LoginOtp = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  });
  if (user) {
    navigate('/');
  }

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, "");
    setPhoneNumber(cleanedValue);
  };

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptchaContainer', {
      'size': 'incisible',
      'callback': (response) => {
      }
    }, auth);
  }
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phoneNumber)
    
    const phone = "+91"+phoneNumber;

    const docRef = doc(db, "trainers", phone);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // return docSnapshot.id === phoneNumber;
      console.log("Verifying phone number:", phone);
      generateReCaptcha();

      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        navigate('/verify');

      }).catch((error) => {
        console.log(error);
        toast.error('This phone number is not valid', {
          position: toast.POSITION.TOP_CENTER,
        });
      });

    }

    else{
      toast.error('This phone number is not registered. Please contact the admin.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
};

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.paperContainer}>
        <Paper elevation={3} className={classes.paper} sx={{ borderRadius: '8px' }}>
          <Box className={classes.textBox} >
            <img src={logo} alt="company logo" className={classes.logo} />
            <Typography variant="h6" align="center" gutterBottom>
              Welcome back!
            </Typography>
            <Typography variant="body2" align="center" gutterBottom>
              Enter your phone number to log in
            </Typography>
            <br />
            <TextField
              label="Phone Number"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={phoneNumber.length != 10}
              endIcon={<ArrowForward />}
              onClick={handleSubmit}
            >
              Continue
            </Button>
            {/* <br/> */}
            <div id="recaptchaContainer"></div>
          </Box>
          <Box className={classes.imageBox}>
            <img src={loginImage} alt="login" className={classes.image} />
          </Box>
        </Paper>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </Box>
    </ThemeProvider>
  );
}
export default LoginOtp;
