import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import { collection, query, getDocs , getDoc, doc, orderBy} from 'firebase/firestore';
import { onAuthStateChanged  } from 'firebase/auth';
import { db, auth} from '../../firebase';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Card, Chip, Typography, Divider, TextField, InputAdornment, Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles(() => ({
  
  root: {
    flexGrow: 1,
    padding: '75px 120px',
    backgroundColor: '#F5F5F5',
    fontFamily: 'Montserrat',   
    [useTheme().breakpoints.down('sm')]: {
      padding: '32px',
    },
  },

  batchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },

  filterBox: {
    display: 'flex',
    alignItems: 'center',
    [useTheme().breakpoints.down('sm')]: {
      padding : '10px',
    },
  },

  filterInput: {
    marginRight: '16px',
  },

  heading: {
    fontWeight: 'bold',
    fontSize: '1rem', // decrease font size
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: '12px'
  },

  text: {
    fontSize: '12px',
    color: '#888',
    fontWeight: 600,
  },


  content: {
    paddingLeft:'24px',
    paddingRight:'24px',
  },


  avatarContainer: {
    padding:'12px',
    paddingLeft:'24px',
    paddingRight:'24px',
    display: 'flex',
    flexDirection:'row',
    alignItems: 'left',
  },



  card: {
    width: '250px',
    height: '175px',
    marginRight: '8px',
    marginTop: '8px',
    display: "flex",
    flexDirection:"column",
    justifyContent: 'space-between',
    fontFamily: "'Montserrat', sans-serif",  
    textDecoration: 'none',
    color: 'inherit',
    [useTheme().breakpoints.down('sm')]: {
      width: '100%',
    },
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },

}));




const AllBatches = () => {
  const classes = useStyles();

  const [usedColors, setUsedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userBatches, setUserBatches] = useState({});
  const [userPhone, setUserPhone] = useState("")
  const [batches, setBatches] = useState([]);


  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserPhone(user.phoneNumber);
      console.log(user);
    });
  },[])


  useEffect(() => {
    async function fetchData() {
    setIsLoading(true);
    const docRef = doc(db, 'trainers', userPhone);
    const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().batches);
        setUserBatches(docSnap.data().batches)
      } else {
        console.log('No such document!');
      }
    }
    fetchData();  
  }, [userPhone]);




  
  useEffect(() => {

    const fetchData = async () => {
      const q = query(collection(db, 'batches'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const batchesData = [];
      
      for (const doc of querySnapshot.docs) {
        const batchData = { id: doc.id, name: doc.data().name,course: doc.data().course, code:doc.data().code,  subjects: doc.data().subjects, students: [] };
        
        const studentsQuery = query(collection(db, "batches", batchData.id, "students" ));
        const studentsSnapshot = await getDocs(studentsQuery);
        studentsSnapshot.forEach((studentDoc) => {
          batchData.students.push({
            id: studentDoc.id,
            name: studentDoc.data().name,
          });
        });
        
        batchesData.push(batchData);
      }
    

      const filteredData = batchesData.filter((item) => (
        userBatches.includes(item.code)
      ));
      
      console.log(filteredData);


      setBatches(filteredData);
      setIsLoading(false);

    };
    fetchData();
  }, [userBatches]);


  const getAvatarColor = (index) => {
    const colors = [ "#34A853", "#EA4335", "#FBBC05", "#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4286f4",  "#7FDBFF", "#2ECC40", "#FF4136", "#FFDC00"];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };


  return (
    <div className={classes.root}>

      {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center",alignItems: "center", height: "60vh",}}>
             <CircularProgress />
          </div>
            ) : (

              <div>

      <Box className={classes.batchBox}>

        <Typography variant="h6"><b>Batches ({batches.length})</b></Typography>

        <Box className={classes.filterBox}>
        <TextField
        id="input-with-icon-textfield"
        size="small"
        className={classes.filterInput} 
        sx={{width:'150px'}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

        </Box>

      </Box>
      <Divider style={{ marginBottom: '30px' }} />




    <Grid container spacing={4}>
      {batches.map((batch, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>




      <Card component={Link} to={`/tr/batch/${batch.code}`} key={batch.code} className={classes.card}>

          <div className={classes.content} >
            <p className={classes.header} ><b>{batch.name}</b></p>

            <p className={classes.text} >{batch.course}</p>

            {batch.subjects.slice(0, 3).map((tag) => (
                  <Chip key={tag} label={tag} size="small" style={{marginRight:'5px'}}  sx={{fontSize:10}}/>
            ))}

          </div>





          {batch.students.length > 0? (
          <div className={classes.avatarContainer}>

            <div style={{ position: 'relative' , background:'#fafafa', }} >
              {batch.students.slice(0, 3).map((student, index) => (
                <Avatar src={student.imageUrl}
                  sx={{ bgcolor: getAvatarColor(index), width: 35, height: 35, fontSize:18,
                  position: 'absolute',
                   left: `${index * 30}px`,
                   zIndex: `${batch.students.length - index }`,
                }}
                  key={student.name}
                  className={classes.avatar}
                >
                  {student.name.charAt(0)}
                </Avatar>
              ))}
            </div>
            
             <p className={classes.text} style={{marginLeft: "100px"}}>
              {batch.students.length} students
            </p>

            </div>

      ):(<div className={classes.avatarContainer}><p className={classes.text} >No Students</p></div>)}

 
      </Card>
    </Grid>
  ))}
</Grid>

</div>
            )}
    </div>
  );
}

export default AllBatches;



