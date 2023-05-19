import React, { useState , useEffect} from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { collection, serverTimestamp, doc, setDoc, getDoc, query, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../firebase';

import { Box,  InputAdornment, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { PersonAdd, } from "@mui/icons-material";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddTrainer = (props) => {

    const [allBatches, setAllBatches] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
        const q = query(collection(db, 'batches'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllBatches(data);
        console.log(data);
        };
        fetchItems();
    }, []);


    const handlePhoneChange = (event) => {
        const value = event.target.value;
        const cleanedValue = value.replace(/\D/g, "");
        setPhone(cleanedValue);
    };


    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      if (event.target.checked) {
        setBatches([...batches, value]);
      } else {
        setBatches(batches.filter((item) => item !== value));
      }
    };


    function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(name && phone && email ){
        
      const docRef = doc(db, "trainers", '+91'+phone,);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {

        toast.error('Trainer with same phone number already existed', {
          position: toast.POSITION.TOP_CENTER,
        });

      } else {
        await setDoc(docRef, {
          name: capitalizeString(name),
          email: email,
          phone: '+91'+phone,
          batches: batches,
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
                label="Trainer Name"
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

    


        <Grid item xs={12} md={12}>
        <Box   sx={{ border: "1px solid lightGray", borderColor: "lightGray", padding: "16px", borderRadius:"4px", minHeight:"58px"}}>

        <FormGroup variant="outlined" label="Batches">
            <p>Batches</p>
            <Grid container spacing={2}>
                {allBatches.map((item) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={batches.includes(item.code)}
                        onChange={handleCheckboxChange}
                        value={item.code}
                        />
                    }
                    label={item.code}
                    />
                </Grid>
                ))}
            </Grid>
        </FormGroup>
       
        </Box>
        </Grid>


        <Grid container justifyContent="flex-end">
            <Grid item>
              <Button endIcon={<PersonAdd/>} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>Add Trainer</Button>
            </Grid>
        </Grid>

      </Grid>

      <ToastContainer position={toast.POSITION.TOP_CENTER} />

    </div>
  );
};

export default AddTrainer;
