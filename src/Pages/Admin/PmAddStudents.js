import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { onSnapshot } from 'firebase/firestore';

import { Box,FormControl,Checkbox,FormControlLabel,InputLabel,Select,MenuItem,Button,Grid,Card,CardContent,Typography,} from '@mui/material';
import {  Table, TableHead, TableRow, TableCell, TableBody, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



const PmAddStudents = (props) => {
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [usedColors, setUsedColors] = useState([]);


  const getRandomColor = () => {
    // #9AA0A6 gray
    const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#34A853", "#EA4335", "#FBBC05", "#4286f4", "#9AA0A6", "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
    const availableColors = colors.filter((color) => !usedColors.includes(color));
    if (availableColors.length === 0) {
      usedColors.splice(0, usedColors.length);
      return colors[0];
    } else {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const randomColor = availableColors[randomIndex];
      usedColors.push(randomColor);
      return randomColor;
    }
  };

  useEffect(() => {
    const fetchBatches = async () => {
      const batchesRef = collection(db, 'batches');
      const batchesSnapshot = await getDocs(batchesRef);
      const batchList = batchesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setBatches(batchList);
    };

    fetchBatches();
  }, []);



  const handleBatchChange = async (event) => {
    const batchId = event.target.value;
    setSelectedBatch(batchId);

    const studentsRef = collection(db, 'batches', batchId, 'students');
    const studentsSnapshot = await getDocs(studentsRef);
    const studentList = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      batchId,
      batchName: batches.find((batch) => batch.id === batchId)?.name || '',
    }));
    setStudents(studentList);
  };


  useEffect(() => {
    const trainerRef = doc(db, 'pms', props.trainer);
    const unsubscribe = onSnapshot(trainerRef, (doc) => {
      const data = doc.data();
      if (data && data.students) {
        setSelectedStudents(data.students);
      }
    });
  
    return () => unsubscribe();
  }, []);



  
  const handleStudentChange = (event, studentId) => {
    const checked = event.target.checked;
    
  
    if (checked) {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        {
          studentId,
          studentName: students.find((student) => student.id === studentId).name,
          batchId: selectedBatch,
          batchName: batches.find((batch) => batch.id === selectedBatch).name,
        },
      ]);
    } else {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter(
          (selectedStudent) =>
            selectedStudent.studentId !== studentId ||
            selectedStudent.batchId !== selectedBatch
        )
      );
    }
  
    console.log(selectedStudents);
   
  };
  






  const handleSubmit = async () => {
    // const trainer = "trainer" ; 
    const trainerRef = doc(db, 'pms', props.trainer);
  
    try {
      await updateDoc(trainerRef, { students: selectedStudents });
      console.log('Student added successful!');
       props.handleAddStudent();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  
  
  
 

  return (
    <Box sx={{ padding: '20px', border: '1px solid #ccc' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="batch-label">Batch</InputLabel>
            <Select
              labelId="batch-label"
              id="batch"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              {batches.map((batch) => (
                <MenuItem key={batch.id} value={batch.id}>
                  {batch.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>


        <FormControl fullWidth>
  <InputLabel id="student-label" shrink>
    Students
  </InputLabel>
  <Select
    labelId="student-label"
    id="student"
    multiple
    value={selectedStudents}
    onChange={handleStudentChange}
    renderValue={(selected) =>
      selected
        .map((selectedStudent) => {
          const student = students.find(
            (student) =>
              student.id === selectedStudent.studentId &&
              selectedStudent.batchId === selectedBatch
          );
          return student ? student.name : '';
        })
        .join(', ')
    }
  >

      
        {students.map((student) => {
          const isSelected = selectedStudents.some(
            (selectedStudent) =>
              selectedStudent.studentId === student.id &&
              selectedStudent.batchId === selectedBatch
          );

          return (
            <FormControlLabel
              key={student.id}
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => handleStudentChange(event, student.id)}
                />
              }
              label={student.name}
            />
          );
        })}
      </Select>
    </FormControl>


        </Grid>
      </Grid>


      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={handleSubmit} startIcon={<AddIcon />}>
          Add
        </Button>
      </Box> 


<Box sx={{ marginTop: '20px' }}>
  <Card>
    <CardContent>
      {/* <Typography variant="h5" component="div">
        Students
      </Typography> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Batch Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedStudents.map((student) => (
            <TableRow key={student.studentId}>
               <TableCell sx={{display:"flex"}}>
                  <Avatar sx={{ bgcolor: getRandomColor(), marginRight:"5px" }}>
                      {student.studentName && student.studentName.length > 0
                      ? student.studentName.charAt(0)
                      : ''}
                  </Avatar>
                  <Typography variant="body1" sx={{margin:"5px"}}>  {student.studentName || ''}  </Typography>
               </TableCell>
               <TableCell>{student.batchName || ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</Box> 

</Box>

       


  );
};

export default PmAddStudents;
