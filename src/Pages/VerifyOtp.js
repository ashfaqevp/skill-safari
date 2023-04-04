import React, { useState } from "react";
import {useNavigate  } from 'react-router-dom';
import {Avatar,Box,Button,Container,Grid,TextField,Typography} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      navigate('/');
    }).catch((error) => {
      alert("Wrong verification code")
      // User couldn't sign in (bad verification code?)
      // ...
    });

    console.log("Verifying OTP:", otp);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mt: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify OTP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="otp"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
          </Box>
        </Box>
        {/* <Box
          component="img"
          src="https://source.unsplash.com/random/600x800"
          alt="Random Unsplash"
          sx={{ width: "100%", height: "auto", mt: 5 }}
        /> */}
      </Container>
    </ThemeProvider>
  );
}

export default VerifyOTP;

