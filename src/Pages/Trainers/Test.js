import React, { useState } from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import { LocationOn, GitHub } from '@mui/icons-material';
import { CardHeader, CardMedia, IconButton,  } from '@mui/material';
import { Favorite, FavoriteBorder, RemoveRedEyeOutlined, ChevronLeft, ChevronRight, Star } from '@mui/icons-material';

const Page = () => {

  const skillsData = [
    { id: 1, name: 'HTML', level: 7 },
    { id: 2, name: 'CSS', level: 8 },
    { id: 3, name: 'JavaScript', level: 9 },
    { id: 4, name: 'React', level: 8 },
    { id: 5, name: 'Node.js', level: 7 },
    { id: 6, name: 'MongoDB', level: 6 },
  ];











  const projectData = [
    {
      id: 1,
      image: 'project1.jpg',
      subTopic: 'Web Development',
      title: 'E-commerce Website',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor eros eu est feugiat, id pulvinar est blandit. Integer ut eros vitae est dapibus mattis non vitae metus.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      likes: 15
    },
    {
      id: 2,
      image: 'project2.jpg',
      subTopic: 'Web Development',
      title: 'Portfolio Website',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor eros eu est feugiat, id pulvinar est blandit. Integer ut eros vitae est dapibus mattis non vitae metus.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      likes: 20
    },
    {
      id: 3,
      image: 'project3.jpg',
      subTopic: 'Mobile App Development',
      title: 'Todo App',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor eros eu est feugiat, id pulvinar est blandit. Integer ut eros vitae est dapibus mattis non vitae metus.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      likes: 10
    },

    {
      id: 4,
      image: 'project2.jpg',
      subTopic: 'Web Development',
      title: 'Portfolio Website',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor eros eu est feugiat, id pulvinar est blandit. Integer ut eros vitae est dapibus mattis non vitae metus.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      likes: 20
    },
    {
      id: 5,
      image: 'project3.jpg',
      subTopic: 'Mobile App Development',
      title: 'Todo App',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor eros eu est feugiat, id pulvinar est blandit. Integer ut eros vitae est dapibus mattis non vitae metus.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      likes: 10
    },
  
  ];

  const [likedProjects, setLikedProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLikeClick = (projectId) => {
    if (likedProjects.includes(projectId)) {
      setLikedProjects(likedProjects.filter((id) => id !== projectId));
    } else {
      setLikedProjects([...likedProjects, projectId]);
    }
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => prevIndex === 0 ? projectData.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projectData.length);
  };





    const courseData = [

        {
          id: 1,
          title: 'Web Development Fundamentals',
          description: 'Learn the basics of web development and build your first website.',
          image: 'https://example.com/course1.jpg',
        },
        {
          id: 2,
          title: 'JavaScript for Beginners',
          description: 'Master the fundamentals of JavaScript programming language.',
          image: 'https://example.com/course2.jpg',
        },
        {
          id: 3,
          title: 'React.js Crash Course',
          description: 'Get up and running with React.js and build modern web applications.',
          image: 'https://example.com/course3.jpg',
        },
        {
          id: 4,
          title: 'Python Programming: From Beginner to Advanced',
          description: 'Learn Python programming from scratch and become a Python expert.',
          image: 'https://example.com/course4.jpg',
        },
        {
          id: 5,
          title: 'Data Science and Machine Learning',
          description: 'Explore the world of data science and machine learning algorithms.',
          image: 'https://example.com/course5.jpg',
        },
    
    ];
  
    const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  
    const handleCoursePrevious = () => {
      setActiveCourseIndex((prevIndex) => (prevIndex - 1 + courseData.length) % courseData.length);
    };
  
    const handleCourseNext = () => {
      setActiveCourseIndex((prevIndex) => (prevIndex + 1) % courseData.length);
    };



  
    const visibleCourses = courseData.slice(activeCourseIndex, activeCourseIndex + 3).map((course) => (
      <Grid key={course.id} item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardMedia component="img" height="140" image={course.image} alt={course.title} />
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {course.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {course.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  



  return (
    <div style={{ padding: '20px' }}>

      <Card sx={{ backgroundColor: 'darkblue', color: 'white', marginBottom: '20px' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              {/* Profile Image */}
              <img src="profile-image.jpg" alt="Profile" style={{ borderRadius: '50%', width: '100px' , height:'100px' }} />
            </Grid>
            <Grid item xs={6}>
              {/* Name, Phone, Email */}
              <div>
                <Typography variant="h5">John Doe</Typography>
                <Typography variant="body1">Phone: 123-456-7890</Typography>
                <Typography variant="body1">Email: johndoe@example.com</Typography>
              </div>
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right' }}>
              {/* Location and GitHub */}
              <div>
                <Typography variant="body1">
                  <LocationOn /> City, Country
                </Typography>
                <a href="https://github.com/johndoe">
                  <GitHub />
                </a>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          {/* About Me */}
          <Card>
            <CardContent>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>About Me</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CardContent>
          </Card>

          {/* Hobbies */}
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>Hobbies</Typography>
              <ul style={{ paddingInlineStart: '20px' }}>
                <li>Hobby 1</li>
                <li>Hobby 2</li>
                <li>Hobby 3</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={9}>
          {/* Skills */}
          <Card>
            <CardContent>
            <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Skills
      </Typography>
      <Grid container spacing={3}>
        {skillsData.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {skill.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {skill.level} out of 10
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
            <Box sx={{ width: '100%', p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Projects
              </Typography>
              <Grid container spacing={3}>
              {projectData.map((project, index) => (
                <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia component="img" height="140" image={project.image} alt={project.title} />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      {project.subTopic}
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
                          Live URL:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            {project.liveUrl}
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ alignItems: 'center', mt: 1 }}>
                      <Grid item>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Github Link:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            {project.githubUrl}
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
                        <IconButton>
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
                      ))}

              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton onClick={handlePrevious}>
                  <ChevronLeft />
                </IconButton>
                <IconButton onClick={handleNext}>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Box>
            </CardContent>
          </Card>



  <Card style={{ marginTop: '20px' }}>
            <CardContent>
            <Box sx={{ width: '70%', p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Projects
              </Typography>
              <Grid container spacing={3}>
              
              {projectData.slice(activeIndex, activeIndex + 3).map((project) => (
                <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia component="img" height="140" image={project.image} alt={project.title} />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ mb: 1, textTransform: 'uppercase' }}>
                      {project.subTopic}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                      <Grid item>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Live URL:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            {project.liveUrl}
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ alignItems: 'center', mt: 1 }}>
                      <Grid item>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Github Link:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            {project.githubUrl}
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ alignItems: 'center', mt: 2 }}>
                      <Grid item sx={{ flexGrow: 1 }}>
                        <IconButton onClick={handlePrevious}>
                          <ChevronLeft />
                        </IconButton>
                        <IconButton onClick={handleNext}>
                          <ChevronRight />
                        </IconButton>
                        <IconButton onClick={() => handleLikeClick(project.id)}>
                          {likedProjects.includes(project.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography variant="body2" sx={{ display: 'inline-block' }}>
                          {project.likes} Likes
                        </Typography>
                        <IconButton>
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
                      ))}

              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton onClick={handlePrevious}>
                  <ChevronLeft />
                </IconButton>
                <IconButton onClick={handleNext}>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Box>
            </CardContent>
          </Card>



              {/* Courses */}
              <Card style={{ marginTop: '20px' }}>
            <CardContent>
            <Box sx={{ width: '100%', p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              Courses
            </Typography>
            <Grid container spacing={3}>
              {visibleCourses}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <IconButton onClick={handleCoursePrevious}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleCourseNext}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
            </CardContent>
          </Card>





        </Grid>
      </Grid>
    </div>
  );
};

export default Page;
