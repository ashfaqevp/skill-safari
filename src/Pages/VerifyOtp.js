import React,{useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';

import { TextField,  Button, Paper, Typography, Grid, Box, useMediaQuery  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Check } from "@mui/icons-material";

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
    paddingLeft: useTheme().spacing(3),

    [useTheme().breakpoints.down('sm')]: {
      width: '70%',
      height: 'auto',
      paddingRight: 0,
      paddingLeft:0,
      // fontSize:'12sp'
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


  otp: {
    fontSize: 18 ,
    [useTheme().breakpoints.down('sm')]: {
      fontSize: 10,
      padding:0,
    },
    [useTheme().breakpoints.down('xs')]: {
      fontSize: 8,
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

  otpContainer: {
    display: 'flex',
    flexDirection: 'row',
  },


}));

const VerifyOtp = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isDisabled, setIsDisabled]=useState(true);
  const [seconds, setSeconds] = useState(90);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, []);


  useEffect(() => {
    if (seconds === 0) {
      navigate('/login');
    }
  }, [seconds]);


  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));




const handleOtpChange = (event, index) => {
  const value = event.target.value;
  if (value.length <= 1) {
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
    if (index < 5 && value.length === 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  }
  const otpValue = otp.join("");
  setIsDisabled(otpValue.length < 5);
  console.log(isDisabled);
};




  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otpValue).then((result) => {
      const user = result.user;
      console.log(user);
      navigate('/');

    }).catch((error) => {
      toast.error('Wrong verification code', {
        position: toast.POSITION.TOP_CENTER,
      });

    }); 
    console.log("Verifying OTP:", otp);
  };




  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.paperContainer}>
        <Paper elevation={3} className={classes.paper} sx={{ borderRadius: '8px' }}>

           <Box className={classes.imageBox}>
            <img src={loginImage} alt="login" className={classes.image} />
          </Box>

          <Box className={classes.textBox}>
            <img src={logo} alt="company logo" className={classes.logo} />

            <Typography variant="h6" align="center" gutterBottom>
              {`${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`}
            </Typography>

            <Typography variant="body2" align="center" gutterBottom>
            Enter Verification Code
            </Typography>
            <br />

            <Grid container spacing={2} justifyContent="center" className={classes.otpContainer}>
              {Array.from({ length: 6 }, (_, index) => (
                <Grid key={index} item xs={2}>
                  <TextField 
                    className={classes.otp}
                    variant="outlined"
                    margin="normal"
                    size="medium"
                    inputProps={{
                      maxLength: 1,
                      // style: { textAlign: "center", }
                      style: { textAlign: "center", fontSize: isSmallScreen &&  "9px" , padding:  "5px" }
                    }}
                    value={otp[index]}
                    onChange={(event) => handleOtpChange(event, index)}
                    id={`otp-${index}`}
                  />
                </Grid>
              ))}
            </Grid>

            <br />

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth 
              endIcon={<Check />}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Verify
            </Button>

          </Box>
         
        </Paper>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </Box>
    </ThemeProvider>
  );
}
export default VerifyOtp;