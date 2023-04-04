import { useState, useEffect } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import Navbar from  '../../Components/Navbar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  if (!user) {
    navigate('/login');
  }

  return (
    <div className='adminContent'>
        <div className="ahLeft">
          <Navbar/>
        </div>

            <div className='ahBot'> <Outlet/> </div>
    </div>

    

  );
};
export default Home;