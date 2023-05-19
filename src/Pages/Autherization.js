import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged , signOut} from 'firebase/auth';
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

import { Card, Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const useStyles = makeStyles(() => ({
  
  root: {
    flexGrow: 1,
    padding: '75px 120px',
    backgroundColor: '#F5F5F5',
    fontFamily: 'Montserrat', 
    minHeight:"100vh" ,
    [useTheme().breakpoints.down('sm')]: {
      padding: '32px',
    },
  },

}));



const Autherization = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate('/login');
      }   
      setUser(user.phoneNumber);

    });

    return () => unsubscribe();
  },[]);


  useEffect(() => {
    async function fetchData() {

      const docRef = doc(collection(db, "admins"), user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsLoading(false);
        navigate("/admin");
      } else {
        const docRef2 = doc(collection(db, "trainers"), user);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap2.exists()) {
          setIsLoading(false);
          navigate("/tr");
        } else {
            const docRef3 = doc(collection(db, "pms"), user);
            const docSnap3 = await getDoc(docRef3);
            if (docSnap3.exists()) {
              navigate("/pm");
            } else {
               setIsLoading(false);
               
            }
        }
      }
    }
    fetchData();
  }, [user]);



  const handleGoBack = () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out.');
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
    });   
  };

  return (

    <div className={classes.root}>

    {isLoading ? (

          <div style={{ display: "flex", justifyContent: "center",alignItems: "center", height: "60vh",}}>
             <CircularProgress />
          </div>  

          ) : (

            <div style={{ display: "flex", justifyContent: "center",alignItems: "center", height: "90vh",}} >
              <Card style={{ width: 400, margin: 'auto', marginTop: 100, padding: 16 }}>
                <p>Your phone number is not registered yet.</p>
                <p>Please contact admin.</p>
                <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
                  Go back to login
                </Button>
              </Card>
           </div>
    )}

    </div>

  );
};

export default Autherization;
