import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { serverTimestamp, doc, setDoc, getDoc,  } from "firebase/firestore";
import { db } from '../../firebase';

import { InputAdornment,  } from "@mui/material";
import { PersonAdd, } from "@mui/icons-material";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddAdmin = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const handlePhoneChange = (event) => {
        const value = event.target.value;
        const cleanedValue = value.replace(/\D/g, "");
        setPhone(cleanedValue);
    };


    function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(name && phone && email ){
        
      const docRef = doc(db, "admins", '+91'+phone);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {

        toast.error('Admin with same phone number already existed', {
          position: toast.POSITION.TOP_CENTER,
        });

      } else {
        await setDoc(docRef, {
          name: capitalizeString(name),
          email: email,
          phone: '+91'+phone,
          timestamp: serverTimestamp(),
        });

        props.handleSubmit();
      }

    }
    
    else{
      toast.error('Please fill in all fields', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

  };




  return (
    <div>
      <br/>

      <Grid container spacing={2}>

        <Grid item xs={12} md={12}>
            <TextField
                value={name}
                fullWidth
                label="Admin Name"
                onChange={(e) => {setName(e.target.value)}}
                variant="outlined"
                required
                inputProps={{
                    style: {
                      textTransform: "capitalize"
                    }
                }}
            />
        </Grid>


        <Grid item xs={12} md={12}>
            <TextField
                value={phone}
                fullWidth
                label="Phone Number"
                onChange={handlePhoneChange}
                variant="outlined"
                required

                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                }}

            />
        </Grid>


        <Grid item xs={12} md={12}>
            <TextField
                value={email}
                fullWidth
                label="Email Address"
                type="email"
                onChange={(e) => {setEmail(e.target.value)}}
                variant="outlined"
                required
            /> 
        </Grid>


        <Grid container justifyContent="flex-end">
            <Grid item>
              <Button endIcon={<PersonAdd/>} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>Add Admin</Button>
            </Grid>
        </Grid>

      </Grid>

      <ToastContainer position={toast.POSITION.TOP_CENTER} />

    </div>
  );
};

export default AddAdmin;
