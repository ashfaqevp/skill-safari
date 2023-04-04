import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid, Chip  } from '@mui/material';
import { collection, query, getDocs } from 'firebase/firestore';
import RoundIcon from '../../Components/RoundIcon'

import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
}));

function AllTrainers() {
  const classes = useStyles();
  const [trainersData, setTrainersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'trainers'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrainersData(data);
    };
    fetchData();
  }, []);

  return (

    <div className={classes.root,"container"}>

    <Link to="/admin/add-trainers/" className="button-link">
      Add New Trainerers
    </Link>

    <Grid container spacing={3}>
    {trainersData.map((trainers, index) => (
        <Grid item xs={12} sm={4} md={2} key={index}>
          <Card>
            <CardContent>
            <RoundIcon text={trainers.name} size={"60px"} />
            <Typography variant="h5">{trainers.name}</Typography>
              <Typography color="textSecondary">
              {trainers.email}
              </Typography>
              <Typography color="textSecondary">
              {trainers.phone}
              </Typography>
              {trainers.batches.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>



  );
}

export default AllTrainers;