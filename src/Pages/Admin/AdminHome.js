import React, { useContext } from 'react';
import  {AuthContext}  from '../../Contexts/AuthContext';


const AdminHome = () => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    return(
        // <h1> {currentUser.email}</h1>
        <h1>home</h1>
    )
}
export default AdminHome;