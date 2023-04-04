import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid, Chip  } from '@mui/material';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
}));

function AllBatches() {
  const classes = useStyles();
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'batches'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBatchData(data);
    };
    fetchData();
  }, []);

  return (

    <div className={classes.root, "container"}>

    <Link to="/admin/add-batches/" className="button-link">
      Add New Batches
    </Link>

    <Grid container spacing={3}>
    {batchData.map((batch, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
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
        </Grid>
      ))}
    </Grid>
  </div>



  );
}

export default AllBatches;