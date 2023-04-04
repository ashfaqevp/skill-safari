import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid, Chip  } from '@mui/material';
import { collection, query, getDocs , getDoc, doc, orderBy} from 'firebase/firestore';
import { onAuthStateChanged  } from 'firebase/auth';
import { db, auth} from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
}));

function AllBatches() {

  const classes = useStyles();
  

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
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(data[1].code)

      const filteredData = data.filter((item) => (
        userBatches.includes(item.code)
      ));
      
      console.log(filteredData);
      setBatches(filteredData);

    };
    fetchData();
  }, [userBatches]);




  return (

    <div className={ "container"}>

  

    <Grid container spacing={3}>
    {batches.map((batch, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>

          <Link to={`/batch/${batch.code}`}>
            <Card>
              <CardContent>
              <Typography variant="h5">{batch.name}</Typography>
                <Typography color="textSecondary">
                {batch.course}
                </Typography>
                {/* <Typography color="textSecondary">
                {batch.subjects}
                </Typography> */}
                {batch.subjects.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  </div>



  );
}

export default AllBatches;