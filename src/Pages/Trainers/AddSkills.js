import { useState, useEffect } from "react";

import { doc, updateDoc, arrayUnion,  getDoc, setDoc } from "firebase/firestore";
import { collection, addDoc, getDocs} from 'firebase/firestore';

import { db } from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";



const useStyles = makeStyles(() => ({
  
  root: {
    flexGrow: 1,
    padding: '50px 80px',
    backgroundColor: '#F5F5F5',
    fontFamily: 'Montserrat',   
    [useTheme().breakpoints.down('sm')]: {
      padding: '24px',
    },
  },


  fab: {
    backgroundColor: useTheme().palette.primary.main,
    color: '#fff',
  },


}));


const AddSkills = (props) => {


  const classes = useStyles();
  
  const [myArray, setMyArray] = useState([]);

  const [fields, setFields] = useState([{skill:"", level:""}]);
  const [skills, setSkills] = useState([{ skill: '', level: '' }]);

 

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newSkills = [...skills];
    if (name === "skill") {
      newSkills[index].skill = value;
    } else if (name === "level") {
      // if (value >= 1 && value <= 10) {
      //   newSkills[index].level = value;
      // } else if (value < 1) {
      //   newSkills[index].level = 1;
      // } else if (value > 10) {
      //   newSkills[index].level = 10;
      // }
      if (!isNaN(value) && value >= 0 && value <= 10) {
        newSkills[index].level = value;
      }
    }
    setSkills(newSkills);
  };


  const handleAddFields = () => {
    setSkills([...skills, { skill: "", level: "" }]);
  };



  const handleRemoveField = (index) => {
    const newFields = [...skills];
    newFields.splice(index, 1);
    setSkills(newFields);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let skillsValid = true;

    // Check if any of the skills or levels are empty
    skills.forEach((skill) => {
      if (!skill.skill || !skill.level) {
        skillsValid = false;
      }
    });



    if (skillsValid) {
      // Add skills to Firebase
      try {
     
      const skillsRef = collection(db, `batches/${props.id}/students/${props.std}/skills`);
      skills.forEach(async (skill) => {
        await addDoc(skillsRef, {
          skill: skill.skill,
          level: skill.level,
        });
      });


      console.log("Skills added successfully!");
      setSkills([{ skill: "", level: "" }]);
      props.handleSubmitSkills();
    } catch (error) {
      console.error("Error adding skills: ", error);
    }

    } else {
      alert('Please fill in all skill fields');
    }
  };
  
  






  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <hr />
      <br/>
      {skills.map((skill, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="Skill"
            name="skill"
            value={skill.skill}
            onChange={(e) => handleInputChange(e, index)}
            sx={{ mr: 1 }}
          />

          <TextField
            label="Level"
            name="level"
            value={skill.level}
            inputProps={{ min: '0', max: '10' }}
            onChange={(e) => handleInputChange(e, index)}
            sx={{ mr: 1 }}
          />
          <IconButton onClick={() => handleRemoveField(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>


    <Fab color="#ffffff" size="small" className={classes.fab}>
         <AddIcon  color="primary" onClick={handleAddFields} className={classes.iconStyle} />
    </Fab>



    </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>

  );
}

export default AddSkills;
