import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { where, collection,onSnapshot, getDocs, query, orderBy, getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { Container, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Button,  useMediaQuery, Card, CardHeader, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { MoreVert,  Add } from "@mui/icons-material";

import AddSkills from './AddSkills';


const useStyles = makeStyles(() => ({

  root: {
    paddingTop: useTheme().spacing(4),
    paddingBottom: useTheme().spacing(4),
    [useTheme().breakpoints.down('sm')]: {

      paddingBottom: useTheme().spacing(8),
    },
  },

  card: {
    width: '100%',
    [useTheme().breakpoints.down('sm')]: {
      width: '100%',
      marginBottom:24,
    },
  },


  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    paddingBottom: 16,
    // borderBottom: `1px solid ${useTheme().palette.divider}`,
    marginBottom:0,
  },


  content: {
    paddingTop: 0,
    marginTop:0,
    marginBottom:0,
    paddingBottom:0
  },


    tableContainer: {
      [useTheme().breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },

    tableHead: {
      backgroundColor: '#F5F5F5',
    },

    tableCell: {
      padding: useTheme().spacing(1),
    },

    buttonContainer: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
    },


    courseNotCompleted: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777',
        marginTop: '30px',
        fontSize: '1.2rem',
      },
      smilingFace: {
        fontSize: '3rem',
        marginBottom: '0.5rem',
      },

      buttonIcon: {
        marginRight: "0.5rem",
      },

      'MuiButton-sendEmail': {
        backgroundColor: "#999999",
        color: "#ffffff",
      }, 


  }));

const StudentSkills = () => {

  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const { id, std } = useParams();


  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [chumma, setChumma] = useState(false)


  const [skills, setSkills] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);




  const skillsRef = collection(db, `batches/${id}/students/${std}/skills`);

  useEffect(() => {
    const unsubscribe = onSnapshot(skillsRef, (snapshot) => {
      const skillsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkills(skillsData);
    });

    return () => {
      unsubscribe();
    };
  }, [skillsRef,chumma]);




  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSkillToDelete(null);
  };

  const handleDeleteSkill =  async () => {
    const updatedSkills = skills.filter(skill => skill.id !== skillToDelete.id);
    setSkills(updatedSkills);

    if (skillToDelete.id) {
      const skillDocRef = doc(skillsRef, skillToDelete.id);
      await deleteDoc(skillDocRef);
    }


    handleCloseConfirmation();
  };


  function handleSubmitSkills() {
    alert("Skill Successfully Added!" );
    setOpen(false);
    setChumma(!chumma)
    
  }
  
  


  return (
   
    <Container maxWidth="lg" className={classes.root}>

        {isLoading ? (
          
          <div >

            <Card className={classes.card}>

            <CardHeader sx={{marginBottom:0, paddingBottom:0}}
              title={
                <div className={classes.header} >
                <Typography variant="h5" component="h3">
                  Skills
                </Typography>
                <Button onClick={() => setOpen(true)} variant="contained" color="primary" sx={{ ml: 2 }} startIcon={<Add />}>
                  Add Skills
                </Button>
              </div>
              }
          />

            <CardContent className={classes.content}>
           

            <TableContainer >
              <Table >
                <TableBody>
                        {skills.map((skill) => (
                        <TableRow key={skill.id}>
                            <TableCell>{skill.skill}</TableCell>
                            <TableCell>
                            {Array.from({ length: 10 }, (_, i) => (
                                <span key={i} style={{ color: i < skill.level ? '#f44336' : '#ccc' }}>&#9733;</span>
                            ))}
                            </TableCell>
                            <TableCell>{skill.level}</TableCell>
                            <TableCell>
                            <IconButton onClick={() => {
                                setSkillToDelete(skill);
                                setShowConfirmation(true);
                            }}>
                                <CloseIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
              </Table>
            </TableContainer>

          </CardContent>
      </Card>


      <Dialog open={showConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Delete Skill</DialogTitle>
        <DialogContent>Are you sure you want to delete this skill?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">Cancel</Button>
          <Button onClick={handleDeleteSkill} color="primary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={open} onClose={() => setOpen(false)}>

          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Add Skills
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>


            <DialogContent>
            <AddSkills handleSubmitSkills={handleSubmitSkills} id={id} std={std}/>
            </DialogContent>
       </Dialog>

          </div>

          ):( 
           <div style={{ display: "flex", justifyContent: "center",alignItems: "center", height: "60vh",}}>
            <CircularProgress />
            </div> 
          )}

        </Container>
      );
};

export default StudentSkills;