import React, { useState, useRef, useEffect, } from 'react';
import { useParams} from 'react-router-dom';

import { getDoc, collection, getDocs, query,  updateDoc, doc, onSnapshot} from "firebase/firestore";
import { db} from './firebase';


import { Grid, Box, Card, CardContent, Typography, Button, Avatar, LinearProgress, Divider } from '@mui/material';
import { LocationOn, GitHub, BadgeSharp,   ArrowLeft, ArrowRight, Close } from '@mui/icons-material';
import { CardHeader, CardMedia, IconButton,  } from '@mui/material';
import { Favorite, FavoriteBorder, RemoveRedEyeOutlined, ChevronLeft, ChevronRight, Star } from '@mui/icons-material';
import { School as SchoolIcon, Extension as ExtensionIcon, Favorite as FavoriteIcon, Visibility as VisibilityIcon, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import badgea from './Images/badgea.png';
import badgeb from './Images/badgeb.png';
import badgec from './Images/badgec.png';
import badged from './Images/badged.png';
import logo from './Images/logolight.png';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import StudentDialogProject from './Components/StudentDialogProject';



const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});



const Page = () => {

  const { batch, std } = useParams();

  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [badges, setBadges] = useState([]);
  
  const [skills, setSkills] = useState([]);
  const [details, setDetails] = useState({});
  const [batchMate, setBatchMate] = useState([]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, 'batches',batch, 'students', std); // Replace 'yourCollectionName' with the actual name of your collection
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {

          const docSnap = await getDoc(docRef);

            // setStudent(docSnap.data());
            // console.log(docSnap.data());
            // setIsLoading(false);

          const detailsData = docSnapshot.data();

          setDetails(detailsData);

          const projectsRef = collection(docRef, 'projects');
          const projectsSnapshot = await getDocs(projectsRef);
         // const projectsData = projectsSnapshot.docs.map((doc) => doc.data());
          const projectsData = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProjects(projectsData);


          const courseRef = collection(docRef, 'certificates');
          const courseSnapshot = await getDocs(courseRef);
          const courseData = courseSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setCourses(courseData);

          const badgeRef = collection(docRef, 'badges');
          const badgeSnapshot = await getDocs(badgeRef);
          const badgeData = badgeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setBadges(badgeData);


          const skillsRef = collection(docRef, 'skills');
          const skillsSnapshot = await getDocs(skillsRef);
          //const skillsData = skillsSnapshot.docs.map((doc) => doc.data());
          const skillsData = skillsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          
          setSkills(skillsData);

          // Perform further operations with the fetched data
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.log('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, []);


      useEffect(() => {
        const fetchData = async () => {
          const q = query(collection(db, "batches", batch, "students" ));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          console.log(data)
          setBatchMate(data);
        };
       fetchData();
    
    }, []);

















  const [likedProjects, setLikedProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);




  const handlePrevious = () => {
    setActiveIndex((prevIndex) => prevIndex === 0 ? projects.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };


  


  const [view, setView] = useState(false);
  // const [view, setView] = useState(false);
  
  const handleViewClick = (event, projectId) => {
    event.stopPropagation();
    if(view === true){

    }


  }



  const handleLikeClick = async (event, projectId) => {
    event.stopPropagation(); // Prevent event bubbling
    if (likedProjects.includes(projectId)) {
      setLikedProjects(likedProjects.filter((id) => id !== projectId));
    } else {
      setLikedProjects([...likedProjects, projectId]);
    }
  };




    const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  
    const handleCoursePrevious = () => {
      setActiveCourseIndex((prevIndex) => (prevIndex - 1 + courses.length) % courses.length);
    };
  
    const handleCourseNext = () => {
      setActiveCourseIndex((prevIndex) => (prevIndex + 1) % courses.length);
    };



  
    const visibleCourses = courses.slice(activeCourseIndex, activeCourseIndex + 3).map((course) => (
      <Grid key={course.id} item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardMedia component="img" height="140" image={course.imageUrl} alt={course.title} />
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




    const [slideIndex, setSlideIndex] = useState(0);

    const handleSlideLeft = () => {
      setSlideIndex((prevIndex) => prevIndex - 1);
    };
  
    const handleSlideRight = () => {
      setSlideIndex((prevIndex) => prevIndex + 1);
    };



    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleCardClick = (project) => {
      setSelectedProject(project);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
  



  return (

    <ThemeProvider theme={theme}>

    <div style={{ padding: '20px' , backgroundColor:"#f4f4f4" }}>

    <Card sx={{ background: 'linear-gradient(to right, #49a0f0, #3366ff)', color: 'white', marginBottom: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={3}>
            {/* Company Logo */}
            <img src={logo} alt="Company Logo" style={{  height: '100px' }} />
          </Grid>
          <Grid item xs={6}>
            {/* Profile Image, Name, Phone, Email */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* <img src={`https://api.multiavatar.com/mohammad.svg`}alt="Profile" style={{ borderRadius: '50%', width: '120px', height: '120px' }} /> */}
              <Avatar
                alt={details.name}
                src={details.imageUrl}
                sx={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  fontSize:30,
                  // bgcolor: '#f0f0f0',
                  overflow: 'hidden',
                }}
              >
                {details.name ? details.name.charAt(0).toUpperCase() : ''}
              </Avatar>
              <div style={{ marginLeft: '10px' }}>
                <Typography variant="h5" sx={{fontWeight:'bold'}}>{details.name}</Typography>
                <Typography variant="body1">Phone: {details.phone}</Typography>
                <Typography variant="body1">Email: {details.email}</Typography>
              </div>
            </div>
          </Grid>

          <Grid item xs={3} style={{ textAlign: 'right', alignItems:'right'  }}>
            {/* Location and GitHub */}

              <div style={{ marginBottom: '10px' }}>
                {/* <Typography variant="body1"> */}
                <a href="#"  rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'right' }}>
                  <LocationOn style={{ marginRight: '5px' }}  /> {details.address}
                </a>  
                {/* </Typography> */}
              </div>

              <div style={{ marginBottom: '10px' }}>
                <a 
                href={details.github} 
                target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'right' }}>
                  <GitHub style={{ marginRight: '5px' }} /> GitHub
                </a>
              </div>

              <div>
                <a href={details.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'right' }}>
                  <LinkedIn style={{ marginRight: '5px' }} /> LinkedIn
                </a>
              </div>



          </Grid>
        </Grid>
      </CardContent>
    </Card>


      <Grid container spacing={3}>
        <Grid item xs={3}>



          {/* About Me */}
          <Card sx={{ backgroundColor: '#E3F2FD'}} >
            <CardContent>
              <Typography variant="h5" style={{fontWeight: 'bold', marginBottom: '10px' }}>About Me</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>{details.about}</Typography>

            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', mb: 3 }}> 
              <div style={{display: 'flex'}}>
              <SchoolIcon sx={{ mr: 1 }} /> 
              <Typography variant="body1">Courses</Typography>
              </div>
              <Typography variant="body1">{courses.length}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', mb: 3 }}>
             
              <div style={{display: 'flex'}}>
              <ExtensionIcon sx={{ mr: 1 }} /> 
              <Typography variant="body1">Projects</Typography>
              </div>

              <Typography variant="body1">{projects.length}</Typography>
            </Box>

            {/* <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', mb: 3 }}>
              
              <div style={{display: 'flex'}}>
              <FavoriteIcon sx={{ mr: 1 }} /> 
              <Typography variant="body1">Appreciations</Typography>
              </div>
              
              <Typography variant="body1">23</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent:'space-between',  alignItems: 'center', mb: 3 }}>
              <div style={{display: 'flex'}}>
                <VisibilityIcon sx={{ mr: 1 }} /> 
                <Typography variant="body1">Project Views</Typography>
              </div>
              <Typography variant="body1">132</Typography>
            </Box> */}


            </CardContent>
          </Card>



          {/* Hobbies */}
          <Card sx={{ backgroundColor: '#E3F2FD'}} style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5" style={{fontWeight: 'bold', marginBottom: '10px' }}>Hobbies</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>{details.hobbies}</Typography>
            </CardContent>
          </Card>
   


          <Card sx={{ backgroundColor: '#E3F2FD'}} style={{ marginTop: '20px' }}>
            <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Badges</Typography>
            <Grid container spacing={2}>
              {badges.map((badge, index) => (
                <Grid item key={index} xs={12} sm={4}>
                  <img title={badge.title} src={badge.imageUrl} alt={`Image ${badge.title}`} style={{ width: '100%', height: 'auto' }} />
                  
                </Grid>
              ))}
            </Grid>
            </CardContent>
          </Card>



            {/* Batch Mate section */}
      <Card sx={{ backgroundColor: '#E3F2FD'}} style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" style={{fontWeight: 'bold', marginBottom: '10px' }}>Batch Mate</Typography>
          <div style={{ padding: '20px' }}>
            <Grid container spacing={2}>
              {batchMate.slice(slideIndex, slideIndex + 2).map((batchmate, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                          alt={batchmate.name}
                          src={batchmate.imageUrl}
                          sx={{ width: 80, height: 80, mb: 1 }}
                        />
                        
                        <Typography variant="h9" align="center" gutterBottom>
                          {(batchmate.name).substring(0, 10)}
                        </Typography>
                        <Button variant="outlined" fullWidth>
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={2}>
              {slideIndex > 0 && (
                 <IconButton onClick={handleSlideLeft}>
                  <ChevronLeft />
                </IconButton>
              )}
              {slideIndex + 3 < batchMate.length && (
                <IconButton onClick={handleSlideRight}>
                  <ChevronRight />
                </IconButton>
              
              )}
            </Box>
          </div>
        </CardContent>
      </Card>



            {/* Social Links */}
        <Card sx={{ backgroundColor: '#E3F2FD'}} style={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h5" style={{fontWeight: 'bold', marginBottom: '10px' }}>Social Links</Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

                  {details.facebook && ( <a href={details.facebook }><Facebook sx={{ fontSize: 40, margin: '5px',  color:"text.secondary" }} /></a>)}
                  {details.twitter && ( <a href={details.twitter}><Twitter sx={{ fontSize: 40, margin: '5px', color: "text.secondary" }} /></a>)}
                  {details.instagram && (<a href={details.instagram}><Instagram sx={{ fontSize: 40, margin: '5px', color: "text.secondary" }} /></a>)}
                  {details.linkedin && ( <a href= {details.linkedin}><LinkedIn sx={{ fontSize: 40, margin: '5px', color: "text.secondary" }} /></a>)}
                  {details.github && ( <a href={details.github}><GitHub sx={{ fontSize: 40, margin: '5px', color: "text.secondary" }} /></a>)}
                </div>
              </CardContent>
            </Card>
        </Grid>



        <Grid item xs={9}>
          {/* Skills */}
          <Card >
            <CardContent>
            <Box sx={{ width: '100%', p: 4 }}>
              <Typography variant="h5" sx={{fontWeight: 'bold', mb: 3 }}>Skills</Typography>
              {skills.map((skill) => (
                <Grid container key={skill.id} alignItems="center" sx={{ marginBottom: '10px' }}>
                  
                <Grid item xs={4} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Grid item xs={8} md={8}>
                      <Box
                        component="div"
                        sx={{
                          backgroundColor: '#E3F2FD',
                          padding: '5px 10px',
                          borderRadius: '10px',
                          marginRight: '10px',
                        }}
                      >


                        <Typography variant="body1">{skill.skill}</Typography>

                      </Box>
                      </Grid>



                    <Grid item xs={4} md={4}>
                    <Typography variant="body1" color="text.secondary">{skill.level}/10</Typography>
                    </Grid>
                    
                    </Box>

                    </Grid>
                 
                  <Grid item xs={6} md={4.5}>
                    <LinearProgress
                      variant="determinate"
                      value={(skill.level / 10) * 100}
                      sx={{ height: '8px', borderRadius: '10px' }}
                    />
                  </Grid>
                </Grid>
              ))}
              </Box>
            </CardContent>
          </Card>





        <Card style={{ marginTop: '20px' }}>
            <CardContent>
            <Box sx={{ width: '100%', p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Projects
              </Typography>
              <Grid container spacing={3}>
              
              {projects.slice(activeIndex, activeIndex + 3).map((project) => (
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
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            Github
                          </a> | 
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live URL
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>



                    {/* <Grid container sx={{ alignItems: 'center', mt: 2 }}>

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
                    </Grid>  */}



                  </CardContent>
                </Card>
                </Grid>
                      ))}
              </Grid>

              <Box sx={{ display:"flex", justifyContent:"flex-end", mt: 2 }}>
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
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Courses
            </Typography>
            <Grid container spacing={3}>
              {visibleCourses}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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

      <Dialog open={open} onClose={handleClose}>
         {selectedProject && (
            <>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedProject.title}
              <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>

            <Divider style={{ marginBottom: '3px' }} />

                <DialogContent>
                  <StudentDialogProject project={selectedProject}/>
              </DialogContent>
            </>
            )}
      </Dialog>

  <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>

              
    </div>

    </ThemeProvider>
  );
};

export default Page;
