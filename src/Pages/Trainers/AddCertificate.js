import React, { useState } from 'react';

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';

import { TextField, Button, Box, Typography, Grid,  IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add as AddIcon, PhotoCamera, AddCard } from '@mui/icons-material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '2rem auto',
    padding: '2rem',
    maxWidth: '800px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  inputField: {
    marginBottom: '1rem',
  },
  plusButton: {
    marginLeft: '0.5rem',
  },
  removeButton: {
    marginLeft: '0.5rem',
    color: 'red',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  uploadInput: {
    display: 'none',
  },
  imagePreview: {
    width: '200px',
    height: 'auto',
    marginTop: '1rem',
  },
}));

const AddProjects = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  
  const [description, setDescription] = useState("");
 
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  
 





  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(e.target.files[0]);


    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(title && description &&  image ){

    const storageRef = ref(storage, `certificates/${image.name}`);
    await uploadBytes(storageRef, image);
  
    // get image download URL from Storage
    const imageUrl = await getDownloadURL(storageRef);
  
    try {
      const projectsRef = collection(db, `batches/${props.id}/students/${props.std}/certificates`);
      const newProject = {
        title: title,

        description: description,

        imageUrl: imageUrl,
      };

      await addDoc(projectsRef, newProject);

      console.log("Project added successfully!");
      props.handleSubmit();

      

    } catch (error) {
      console.error("Error adding project: ", error);
    }

    }
    else{
        toast.error('Please fill in all fields', {
          position: toast.POSITION.TOP_CENTER,
        });
    }
  
  };
  


  return (
    <Box className={classes.container}>
      {/* <Typography variant="h4">Add Project</Typography> */}
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12}>
          <TextField label="Project Name"  onChange={(e) => setTitle(e.target.value)}  fullWidth className={classes.inputField} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Project Description" onChange={(e) => setDescription(e.target.value)}  fullWidth multiline rows={4} className={classes.inputField} />
        </Grid>









          <Grid item xs={12}>
          <Typography variant="h7" sx={{textAlign:"left"}}>Project Image</Typography>
          <Box className={classes.imageBox}>

          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleImageUpload}
          />

          <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
          </IconButton>
          </label>
          <div className={classes.preview}>
          {imagePreview ? (
          <img src={imagePreview} alt="project" className={classes.imagePreview} />
          ) : (
          <Typography variant="body1">No image selected</Typography>
          )}
          </div>
          </Box>
          </Grid>
          

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button endIcon={<AddCard/>} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}> Add Certificate </Button>
            </Grid>
          </Grid>


          </Grid>



      
          </Box>
  );
};

export default AddProjects;
