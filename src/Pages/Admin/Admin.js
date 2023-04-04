import { useState, useEffect } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import AdminNavbar from  '../../Components/AdminNavbar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const AdminHome = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // });

  // if (!user) {
  //   navigate('/admin-login');
  // }

  return (
    <div className='adminContent'>
        <div className="ahLeft">
          <AdminNavbar/>
        </div>

            <div className='ahBot'> <Outlet/> </div>
    </div>

    

  );
};
export default AdminHome;