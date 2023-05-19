import React, { useState, useEffect } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Grid, Box, Card, IconButton,   CardContent, CardMedia, Typography, Button, Avatar, LinearProgress, Divider } from '@mui/material';
import { db } from '../firebase';


import { Favorite, FavoriteBorder, RemoveRedEyeOutlined, ChevronLeft, ChevronRight, Star } from '@mui/icons-material';
import { School as SchoolIcon, Extension as ExtensionIcon, Favorite as FavoriteIcon, Visibility as VisibilityIcon, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const [likesCount, setLikesCount] = useState(project.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if the user has already liked the project using the stored user ID
    const userId = getStoredUserId();
    setIsLiked(project.likes.includes(userId));
  }, []);

  const handleLike = async () => {
    const userId = getStoredUserId();

    // If the user hasn't liked the project yet, update the Firestore document
    if (!isLiked) {
      const projectRef = doc(db, 'projects', project.projectId);
      await updateDoc(projectRef, {
        likes: [...project.likes, userId],
      });

      setLikesCount(likesCount + 1);
      setIsLiked(true);
    }
  };

  const getStoredUserId = () => {
    // Check if the user ID is stored in cookies or local storage
    // If not, generate a unique ID and store it
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = generateUserId();
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  const generateUserId = () => {
    // Generate a unique ID for the user
    // This can be a simple UUID generator or any unique identifier logic
    return 'user123';
  };



  

  const [view, setView] = useState(false);
  // const [view, setView] = useState(false);
  
  const handleViewClick = (event) => {
    event.stopPropagation();
    if(view === true){

    }
  }


  const handleLikeClick = async (event) => {
    event.stopPropagation(); // Prevent event bubbling

  };



  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [likedProjects, setLikedProjects] = useState([]);




  const handleCardClick = (project) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <div>
    //   <h3>{project.title}</h3>
    //   <p>Category: {project.category}</p>
    //   <p>Likes: {likesCount}</p>
    //   <button onClick={handleLike} disabled={isLiked}>
    //     {isLiked ? 'Liked' : 'Like'}
    //   </button>
    // </div>


    <Grid item xs={12} sm={6} md={4}>
    <Card onClick={() => handleCardClick(project)} sx={{ height: '100%' , cursor: 'pointer'}}>
      <CardMedia component="img" height="140" image={project.imageUrl} alt={project.title} />
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1, textTransform: 'uppercase' }}>
          {project.category}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {project.title}
        </Typography>

        {/* <Typography variant="body1" sx={{ mb: 2 }}>
          {project.description}
        </Typography> */}

        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              <a href={'/'+project.githubLink} target="_blank" rel="noopener noreferrer">
                Github
              </a> | 
              <a href={'/'+project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live URL
              </a>
            </Typography>
          </Grid>
        </Grid>



        <Grid container sx={{ alignItems: 'center', mt: 2 }}>
          <Grid item sx={{ flexGrow: 1 }}>
            <IconButton onClick={() => handleLikeClick(project.id)}>
              {likedProjects.includes(project.id) ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" sx={{ display: 'inline-block' }}>
              {project.likes} Likes
            </Typography>
            <IconButton onClick={(event) => handleViewClick(project.id, event)}>
          
              <RemoveRedEyeOutlined />
            </IconButton>
            <Typography variant="body2" sx={{ display: 'inline-block' }}>
              {project.views} Views
            </Typography>
          </Grid>
        </Grid>



      </CardContent>
    </Card>
    </Grid>
  );
};

export default ProjectCard;
