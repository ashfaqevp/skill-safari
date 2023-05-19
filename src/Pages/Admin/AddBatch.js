import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { addDoc, collection, serverTimestamp, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import { Box, Chip, InputAdornment } from "@mui/material";
import { AddCard, DeleteOutlined,  } from "@mui/icons-material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBatch = (props) => {

  const navigate = useNavigate();


    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [course, setCourse] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [subjects, setSubjects] = useState([]);

    const [sub, setSub] = useState('');

    const handleTagInput = (event) => {
        setSub(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && sub.trim() !== '') {
          event.preventDefault();
        //  sub=capitalizeString(sub);
          setSubjects([...subjects, sub.trim()]);
          setSub('');
        }
    };

  
    const handleDeleteSub = (subIndex) => {
      const updatedSub = subjects.filter((_, index) => index !== subIndex);
      setSubjects(updatedSub);
    };


    function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(name && code && course && startDate && endDate && subjects.length > 1 ){
        
      const docRef = doc(db, "batches",code);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {

        toast.error('Batch with same code already existed', {
          position: toast.POSITION.TOP_CENTER,
        });

      } else {
        await setDoc(docRef, {
          name: capitalizeString(name),
          code: code.toUpperCase(),
          course: capitalizeString(course),
          startingDate : startDate.format('YYYY-MM-DD'),
          endingDate : endDate.format('YYYY-MM-DD'),
          subjects: subjects,
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
      <hr />
      <br/>

      <Grid container spacing={2}>

        <Grid item xs={12} md={12}>
            <TextField
                value={name}
                fullWidth
                label="Batch Name"
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


        <Grid item xs={12} md={6}>
            <TextField
                value={code}
                fullWidth
                label="Batch Code"
                onChange={(e) => {setCode(e.target.value)}}
                variant="outlined"
                required
                inputProps={{
                    style: {
                      textTransform: "uppercase"
                    }
                }}
            />
        </Grid>


        <Grid item xs={12} md={6}>
            <TextField
                value={course}
                fullWidth
                label="Course"
                onChange={(e) => {setCourse(e.target.value)}}
                variant="outlined"
                required
                inputProps={{
                    style: {
                      textTransform: "capitalize"
                    }
                }}
            /> 
        </Grid>





        <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth >
                <DatePicker 
                    fullWidth
                    label="Start Date"
                    value={startDate}
                    onChange={(date)=>setStartDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>


        <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth >
                <DatePicker 
                    fullWidth
                    label="End Dates"
                    value={endDate}
                    onChange={(date)=>setEndDate(date)}
                    renderInput={(params) => <TextField {...params}  />}
                />
            </LocalizationProvider> 
        </Grid>


        <Grid item xs={12} md={12}>
            <TextField
                label="Subjects"
                variant="outlined"
                fullWidth
                value={sub}
                onChange={handleTagInput}
                onKeyDown={handleKeyDown}
                endIcon={<KeyboardReturnIcon/>}
                InputProps={{
                  style: {
                    textTransform: "capitalize"
                  },

                  endAdornment: (
                    <InputAdornment position="end">
                      <KeyboardReturnIcon />
                    </InputAdornment>
                  ),

                 }}
            >
            </TextField > 
        </Grid>

        <Grid item xs={12} md={12}>
        <Box   sx={{ border: "1px solid lightGray", borderColor: "lightGray", padding: "16px", borderRadius:"4px", minHeight:"58px"}}>

            {subjects.map((sub, index) => (
                <Chip
                key={index}
                label={sub}
                onDelete={() => handleDeleteSub(index)}
                sx={{ mr: 1, my: 1 }}
                deleteIcon={<DeleteOutlined />}
                />
            ))}
       
        </Box>

        </Grid>

        <Grid container justifyContent="flex-end">
            <Grid item>
              <Button endIcon={<AddCard/>} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>Add Batch</Button>
            </Grid>
          </Grid>
      </Grid>

      <ToastContainer position={toast.POSITION.TOP_CENTER} />

    </div>
  );
};

export default AddBatch;
