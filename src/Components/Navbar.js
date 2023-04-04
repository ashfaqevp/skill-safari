import React,{useEffect, useState} from 'react';
import { NavLink  } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { auth } from '../firebase';
import { signOut,onAuthStateChanged  } from 'firebase/auth';
import RoundIcon from './RoundIcon';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Navbar = () => {

  const [user, setUser] = useState({});
  const [userPhone, setUserPhone] = useState("")
  const [userLogo, setUserLogo] = useState("O")

   useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserPhone(user.phoneNumber);
      console.log(user);
    });

  },[]);



  useEffect(() => {

    async function fetchData() {
    const docRef = doc(db, 'trainers', userPhone);
    const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUser(docSnap.data())
        setUserLogo(docSnap.data().name)
      } else {
        console.log('No such document!');
      }
    }

    fetchData();
   
  }, [userPhone]);




  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out.');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  
  return (
    <nav
      style={{
        height: '100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
        padding: '0 20px',
        // marginBottom : "20px",
      }}
    >
      <div style={{ display: 'flex' }}>

        <NavLink
          to="/admin/batches"
          style={{
            marginRight: '20px',
            textDecoration: 'none',
            color: '#000',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Batches
        </NavLink>


        {/* <NavLink
          to="/admin/trainers"
          style={{
            textDecoration: 'none',
            color: '#000',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Trainers
        </NavLink> */}

      </div>

      <div style={{display:"flex"}}>
        <RoundIcon text={userLogo} size={"40px"} />
        <Typography variant="h6">{user.name}</Typography>
        <Button
          onClick={handleLogout} >
          Logout
        </Button>
        
      </div>
    </nav>
  );
};

export default Navbar;
