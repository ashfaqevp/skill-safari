import React from 'react';
import { NavLink  } from 'react-router-dom';
import { Button } from '@mui/material';
import { auth } from '../firebase';
import {  signOut } from 'firebase/auth';

const Navbar = () => {

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


        <NavLink
          to="/admin/trainers"
          style={{
            textDecoration: 'none',
            color: '#000',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Trainers
        </NavLink>
      </div>

      <div>
        <Button
          onClick={handleLogout} >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
