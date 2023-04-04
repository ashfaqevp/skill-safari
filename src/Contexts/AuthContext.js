import React, { useState, useEffect , createContext} from 'react';

import {auth} from '../firebase'

import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   setCurrentUser(user);
    // });
    // return unsubscribe;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            
            setCurrentUser(user);
        
        } else {
            // User is signed out
            // ...
        }
    });

  }, []);



  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



// import React, { useState } from "react";
// import { createContext } from "react";

// export const AuthContext = createContext({});

// function ContextProvider(props) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [linkedIn, setLinkedIn] = useState("");
//   const [github, setGitHub] = useState("");
//   const [portfolio, setPortfolio] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [education, setEducation] = useState([]);
//   const [interests, setInterests] = useState([]);

//   const contextValue = { name, setName, email, setEmail, phone, setPhone ,address, setAddress, linkedIn, setLinkedIn, github, setGitHub,
//     portfolio, setPortfolio, skills, setSkills, projects, setProjects,  education, setEducation, interests, setInterests};

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

// export default ContextProvider;
