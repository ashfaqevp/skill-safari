import React,{useState} from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import { TextField, Button, Grid, Container, Typography, Box} from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

 const AddBatches = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [course, setCourse] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const handleTagInput = (event) => {
        setTagInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && tagInput.trim() !== '') {
          event.preventDefault();
          setTags([...tags, tagInput.trim()]);
          setTagInput('');
        }
    };



    const handleSubmit = async (event) => {


        event.preventDefault();

        console.log(typeof(startDate));
        console.log(startDate.format('YYYY-MM-DD'));

        const docRef = doc(db, "batches",code);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          alert("Batch already exists!");
        } else {
          await setDoc(docRef, {
            name: name,
            code:code,
            course: course,
            startingDate : startDate.format('YYYY-MM-DD'),
            endingDate : endDate.format('YYYY-MM-DD'),
            subjects: tags,
            timestamp: serverTimestamp(),
          });

          

        }


      };
      


    return(
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
         <Container maxWidth="md">

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4">ADD BATCHES</Typography>
          </Box>

            <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={12}>
                <TextField
                    value={name}
                    fullWidth
                    label="Batch Name"
                    onChange={(e) => {setName(e.target.value)}}
                    
                    variant="outlined"
                    required
                />
                </Grid>

                <Grid item xs={12} sm={4}>
                <TextField
                    value={code}
                    fullWidth
                    label="Batch Code"
                    onChange={(e) => {setCode(e.target.value)}}
                    variant="outlined"
                    required
                />
                </Grid>

                <Grid item xs={12} sm={4}>
                <TextField
                    value={course}
                    fullWidth
                    label="Course"
                    onChange={(e) => {setCourse(e.target.value)}}
                    variant="outlined"
                    required
                /> 
                </Grid>     

                <Grid item xs={12} sm={6}>
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


                <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth >
                    <DatePicker 
                        fullWidth
                        label="End Dates"
                        value={endDate}
                        onChange={(date)=>setEndDate(date)}
                        renderInput={(params) => <TextField {...params}  />}
                    />
                </LocalizationProvider> 
                </Grid >


                <Grid item xs={6} >
                <TextField
                    label="Subjects"
                    variant="outlined"
                    fullWidth
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={handleKeyDown}
                >
                </TextField > 
                </Grid>

                <div style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}>
                    {tags.map((tag, index) => (
                    <span key={index} style={{backgroundColor:"lightblue", margin:"5px" }}>{tag}</span>
                    ))}
                </div> 

                


                <Grid item xs={12} >
                <Button
                    fullWidth 
                    variant="contained"
                     color="primary"
                    type="submit">
                    SAVE 
                </Button>
                </Grid>
                </Grid>

            </form>

            

            </Container>
    </Box>
    )
}

export default AddBatches;







