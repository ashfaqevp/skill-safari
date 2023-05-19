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
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [tools, setTools] = useState([]);
  const [features, setFeatures] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  
 

  const handleToolChange = (e, index) => {
    const updatedTools = [...tools];
    updatedTools[index] = e.target.value;
    setTools(updatedTools);
  };

  const handleAddTool = () => {
    setTools([...tools, '']);
  };

  const handleRemoveTool = (index) => {
    const updatedTools = [...tools];
    updatedTools.splice(index, 1);
    setTools(updatedTools);
  };



  const handleFeatureChange = (e, index) => {
    const updatedTools = [...features];
    updatedTools[index] = e.target.value;
    setFeatures(updatedTools);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index) => {
    const updatedTools = [...features];
    updatedTools.splice(index, 1);
    setFeatures(updatedTools);
  };

  

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
  
    if(title && category && description && github && live && image ){

    const storageRef = ref(storage, `projects/${image.name}`);
    await uploadBytes(storageRef, image);
  
    // get image download URL from Storage
    const imageUrl = await getDownloadURL(storageRef);
  
    try {

      const vl = videoLink.startsWith('http://') || videoLink.startsWith('https://') ? videoLink : 'http://' + videoLink;
      const gh = github.startsWith('http://') || github.startsWith('https://') ? github : 'http://' + github;
      const l = live.startsWith('http://') || live.startsWith('https://') ? live : 'http://' + live;


      const projectsRef = collection(db, `batches/${props.id}/students/${props.std}/projects`);
      const newProject = {
        title: title,
        category: category,
        description: description,
        videoLink: vl,
        githubLink: gh,
        liveUrl: l,
        toolsUsed: tools,
        features: features,
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

        <Grid item xs={12} sm={6}>
          <TextField label="Project Category" onChange={(e) => setCategory(e.target.value)}  fullWidth className={classes.inputField} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Video Link" onChange={(e) => setVideoLink(e.target.value)}  fullWidth className={classes.inputField} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Github Link" onChange={(e) => setGithub(e.target.value)}  fullWidth className={classes.inputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Live URL" onChange={(e) => setLive(e.target.value)}  fullWidth className={classes.inputField} />
        </Grid>




        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px solid lightGray", borderColor: "lightGray", padding: "16px", borderRadius:"4px", minHeight:"58px"}}>
          <Typography variant="h7" sx={{textAlign:"left"}}>Tools Used</Typography>
          {tools.map((tool, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
              <TextField label="Tool" value={tool} onChange={(e) => handleToolChange(e, index)} fullWidth />
              <Button className={classes.removeButton} onClick={() => handleRemoveTool(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button className={classes.plusButton}
          onClick={handleAddTool}>
          <AddIcon />
          </Button>
          </Box>
          </Grid>


          <Grid item xs={12} sm={6}>
          <Box   sx={{ border: "1px solid lightGray", borderColor: "lightGray", padding: "16px", borderRadius:"4px", minHeight:"58px"}}>
          <Typography variant="h7" sx={{textAlign:"left"}}>Features</Typography>
          {features.map((tool, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
              <TextField label="Feature" value={tool} onChange={(e) => handleFeatureChange(e, index)} fullWidth />
              <Button className={classes.removeButton} onClick={() => handleRemoveFeature(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button className={classes.plusButton}
          onClick={handleAddFeature}>
          <AddIcon />
          </Button>
          </Box>
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
              <Button endIcon={<AddCard/>} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>Add Project</Button>
            </Grid>
          </Grid>


          </Grid>



      
          </Box>
  );
};

export default AddProjects;
