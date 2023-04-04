import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext'

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={currentUser ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;





