import React from 'react';
import PropTypes from 'prop-types';
import { DialogContent, Box, Typography, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectDialogContent = (props) => {


    const { project } = props;

 const {
    imageUrl,
    title,
    category,
    description,
    features,
    toolsUsed,
    videoLink,
    githubLink,
    liveUrl,
  } = project;


//   title: title,
//   category: category,
//   description: description,
//   videoLink: videoLink,
//   githubLink: github,
//   liveUrl: live,
//   toolsUsed: tools,
//   features: features,
//   imageUrl: imageUrl,


  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <img src={imageUrl} alt={title} style={{ width: '100px', marginRight: '16px' }} />
        <div>
 
          <Typography variant="subtitle1" gutterBottom>
            Category: {category}
          </Typography>
          
      <div>

      {liveUrl && (
        <IconButton component="a" href={liveUrl} target="_blank" rel="noopener" aria-label="Live" color="primary">
          <LaunchIcon />
        </IconButton>
      )}

      {videoLink && (
        <IconButton component="a" href={videoLink} target="_blank" rel="noopener" aria-label="YouTube" color="primary">
          <YouTubeIcon />
        </IconButton>
      )}
      {githubLink && (
        <IconButton component="a" href={githubLink} target="_blank" rel="noopener" aria-label="GitHub" color="primary">
          <GitHubIcon />
        </IconButton>
      )}

    </div>
    
        </div>
      </Box>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Features:
      </Typography>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Typography variant="h6" gutterBottom>
        Tools Used:
      </Typography>
      <ul>
        {toolsUsed.map((tool, index) => (
          <li key={index}>{tool}</li>
        ))}
      </ul>

    </>
  );
};

// ProjectDialogContent.propTypes = {
//   image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   features: PropTypes.arrayOf(PropTypes.string).isRequired,
//   tools: PropTypes.arrayOf(PropTypes.string).isRequired,
//   youtubeUrl: PropTypes.string,
//   githubUrl: PropTypes.string,
//   liveUrl: PropTypes.string,
// };

export default ProjectDialogContent;
