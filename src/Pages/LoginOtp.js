import React, { useState } from "react";
import {auth, db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {useNavigate  } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: { 
      main: "#f50057",
    },
  },
});

function LoginOtp() {

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptchaContainer', {
      'size': 'incisible',
      'callback': (response) => {
      }
    }, auth);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "trainers", phoneNumber);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // return docSnapshot.id === phoneNumber;
      console.log("Verifying phone number:", phoneNumber);
      generateReCaptcha();

      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        navigate('/verify');
      }).catch((error) => {
        console.log(error)
        alert("Phone Number are not valid !")
      });

    }

    else{
      alert("This Number not registerd")
    } 
};




  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: "0px 3px 6px #00000029",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Welcome
          </Typography>
          <form
            onSubmit={handleSubmit}
            sx={{ width: "100%", mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Mobile Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Verify
            </Button>
          </form>
            <div id="recaptchaContainer">
            </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default LoginOtp;
